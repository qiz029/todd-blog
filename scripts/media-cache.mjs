import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import sharp from 'sharp';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

/** Build-only transport for public site media. Every consumer gets its own body stream. */
export function createMediaFetch({
  cacheDir,
  fetchImpl = globalThis.fetch,
  origin = 'https://toddzheng.net',
  attempts = 3,
  timeoutMs = 15000,
  sleep = delay,
  now = Date.now,
  warn = console.warn,
} = {}) {
  const memory = new Map();
  const pending = new Map();
  const stats = { downloads: 0, hits: 0, retries: 0 };

  function expiresAt(headers) {
    const control = headers.get('cache-control') ?? '';
    if (/no-store|no-cache|private/i.test(control)) return 0;
    const maxAge = Number(control.match(/(?:^|,)\s*max-age=(\d+)/i)?.[1] ?? 0);
    const age = Number(headers.get('age') ?? 0);
    return now() + Math.min(YEAR_MS, Math.max(0, maxAge - age) * 1000);
  }

  async function readCache(url) {
    const current = memory.get(url);
    if (current?.expiresAt > now()) return current;
    try {
      const record = JSON.parse(await readFile(join(cacheDir, `${hash(url)}.json`), 'utf8'));
      if (record.version !== 1 || record.url !== url || record.expiresAt <= now()) return null;
      const body = Buffer.from(record.body, 'base64');
      if (!body.length || hash(body) !== record.digest) return null;
      const entry = { ...record, body };
      memory.set(url, entry);
      return entry;
    } catch { return null; }
  }

  async function saveCache(entry) {
    if (entry.expiresAt <= now()) return;
    memory.set(entry.url, entry);
    const file = join(cacheDir, `${hash(entry.url)}.json`);
    const temporary = `${file}.${randomUUID()}.tmp`;
    try {
      await mkdir(cacheDir, { recursive: true });
      await writeFile(temporary, JSON.stringify({ ...entry, body: entry.body.toString('base64'), digest: hash(entry.body) }));
      await rename(temporary, file);
    } catch (error) {
      warn(`[media] Could not save cache for ${entry.url}: ${error.message}`);
    } finally {
      await unlink(temporary).catch(() => {});
    }
  }

  async function download(request, init, cacheable) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      let retryable = true;
      try {
        request.signal.throwIfAborted();
        const signal = AbortSignal.any([request.signal, AbortSignal.timeout(timeoutMs)]);
        const response = await fetchImpl(request, { ...init, signal });
        // Let Astro's redirect validation and conditional requests keep their normal semantics.
        if (response.status >= 300 && response.status < 400) {
          return { url: response.url || request.url, status: response.status, headers: [...response.headers], body: Buffer.from(await response.arrayBuffer()), expiresAt: 0 };
        }
        if (!response.ok) {
          retryable = response.status === 408 || response.status === 429 || response.status >= 500;
          await response.body?.cancel();
          throw new Error(`HTTP ${response.status}`);
        }
        if (!response.headers.get('content-type')?.startsWith('image/')) {
          retryable = false;
          await response.body?.cancel();
          throw new Error('Expected an image response');
        }
        const body = Buffer.from(await response.arrayBuffer());
        if (!body.length) throw new Error('Empty image response');
        const { width, height, format } = await sharp(body).metadata();
        if (!width || !height) throw new Error('Image has no dimensions');
        // Fetch has already decoded any content encoding. Store a complete, independent body,
        // not a tee/Response.clone(): Astro cancels its dimension probe after the first chunk.
        const headers = new Headers(response.headers);
        headers.delete('content-encoding');
        headers.delete('set-cookie');
        headers.set('content-length', String(body.length));
        const entry = {
          version: 1, url: request.url, status: response.status, dimensions: { width, height, format },
          headers: [...headers], body,
          expiresAt: cacheable && !response.headers.has('set-cookie') ? expiresAt(headers) : 0,
        };
        stats.downloads++;
        if (cacheable) await saveCache(entry);
        return entry;
      } catch (error) {
        request.signal.throwIfAborted();
        lastError = error;
        if (!retryable || attempt === attempts) break;
        stats.retries++;
        warn(`[media] Retry ${attempt}/${attempts - 1}: ${request.url} (${error.message})`);
        await sleep(500 * 2 ** (attempt - 1), undefined, { signal: request.signal });
      }
    }
    const error = new Error(`Could not download media ${request.url}: ${lastError?.message}`, { cause: lastError });
    warn(`[media] ${error.message}`);
    throw error;
  }

  function toResponse(entry) {
    const response = new Response(entry.status === 304 ? null : entry.body, { status: entry.status, headers: entry.headers });
    Object.defineProperty(response, 'url', { value: entry.url });
    return response;
  }

  const fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : input);
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();
    if (url.origin !== origin || !url.pathname.startsWith('/media/') || method !== 'GET') return fetchImpl(input, init);
    const request = new Request(input, init);
    // Never cache authenticated, ranged, or explicitly non-cacheable requests.
    if (['authorization', 'cookie', 'range'].some((header) => request.headers.has(header))) return fetchImpl(input, init);
    request.signal.throwIfAborted();
    const cacheable = !['no-store', 'no-cache', 'reload'].includes(request.cache)
      && !['if-none-match', 'if-modified-since'].some((header) => request.headers.has(header));
    if (!cacheable) return toResponse(await download(request, init, false));
    const cached = await readCache(url.href);
    if (cached) { stats.hits++; return toResponse(cached); }
    if (!pending.has(url.href)) {
      const work = download(request, init, true).finally(() => pending.delete(url.href));
      pending.set(url.href, work);
    }
    return toResponse(await pending.get(url.href));
  };
  return { fetch, stats };
}
