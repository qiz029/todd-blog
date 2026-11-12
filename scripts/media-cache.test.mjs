import { mkdtemp, readdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMediaFetch } from './media-cache.mjs';

const url = 'https://toddzheng.net/media/test-image.png';
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
const image = (control = 'public, max-age=3600, immutable') => new Response(png, { headers: { 'content-type': 'image/png', 'cache-control': control } });
let directory;
const quiet = { warn: () => {}, sleep: async () => {} };
beforeEach(async () => { directory = await mkdtemp(join(tmpdir(), 'todd-media-test-')); });
afterEach(async () => { await rm(directory, { recursive: true, force: true }); });
const cache = (options) => createMediaFetch({ cacheDir: directory, ...quiet, ...options });

describe('build media transport', () => {
  it('shares a download, survives probe cancellation, and reuses disk cache in an offline build', async () => {
    const remote = vi.fn(async () => image());
    const first = cache({ fetchImpl: remote });
    const [probe, full] = await Promise.all([first.fetch(url), first.fetch(url)]);
    const reader = probe.body.getReader();
    await reader.read();
    await reader.cancel();
    expect(Buffer.from(await full.arrayBuffer())).toEqual(png);
    expect(remote).toHaveBeenCalledTimes(1);
    const offline = vi.fn(async () => { throw new Error('offline'); });
    const second = cache({ fetchImpl: offline });
    const cached = await second.fetch(url);
    expect(cached.url).toBe(url);
    expect(Buffer.from(await cached.arrayBuffer())).toEqual(png);
    expect(offline).not.toHaveBeenCalled();
    expect(second.stats.hits).toBe(1);
  });

  it('retries transient network and 503 failures', async () => {
    const remote = vi.fn().mockRejectedValueOnce(new Error('connection reset'))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockImplementation(async () => image());
    const client = cache({ fetchImpl: remote });
    expect((await client.fetch(url)).status).toBe(200);
    expect(client.stats.retries).toBe(2);
  });

  it('bounds stalled requests and reports the failed image URL', async () => {
    const remote = vi.fn((_input, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }));
    const client = cache({ fetchImpl: remote, attempts: 2, timeoutMs: 10 });
    await expect(client.fetch(url)).rejects.toThrow(`Could not download media ${url}`);
    expect(remote).toHaveBeenCalledTimes(2);
    expect(await readdir(directory)).toEqual([]);
  });

  it('does not retry 404 or cache non-image error responses', async () => {
    const remote = vi.fn(async () => new Response('missing', { status: 404 }));
    await expect(cache({ fetchImpl: remote }).fetch(url)).rejects.toThrow('HTTP 404');
    expect(remote).toHaveBeenCalledTimes(1);
    const html = vi.fn(async () => new Response('<html>Error</html>', { headers: { 'content-type': 'text/html' } }));
    await expect(cache({ fetchImpl: html }).fetch(url)).rejects.toThrow('Expected an image');
    expect(await readdir(directory)).toEqual([]);
  });

  it('rejects corrupted image bodies without poisoning the cache', async () => {
    const remote = vi.fn(async () => new Response('broken', { headers: { 'content-type': 'image/png' } }));
    await expect(cache({ fetchImpl: remote, attempts: 1 }).fetch(url)).rejects.toThrow('Could not download media');
    expect(await readdir(directory)).toEqual([]);
  });

  it('refreshes expired entries and repairs malformed cache files', async () => {
    await cache({ fetchImpl: async () => image('max-age=1'), now: () => 1000 }).fetch(url);
    const remote = vi.fn(async () => image());
    await cache({ fetchImpl: remote, now: () => 3000 }).fetch(url);
    expect(remote).toHaveBeenCalledTimes(1);
    const [file] = await readdir(directory);
    await writeFile(join(directory, file), 'partial file');
    await cache({ fetchImpl: remote, now: () => 3000 }).fetch(url);
    expect(remote).toHaveBeenCalledTimes(2);
  });

  it('honors no-store and conditional responses, and leaves other traffic untouched', async () => {
    const remote = vi.fn(async () => image('no-store'));
    const client = cache({ fetchImpl: remote });
    await client.fetch(url); await client.fetch(url);
    expect(remote).toHaveBeenCalledTimes(2);
    expect(await readdir(directory)).toEqual([]);
    const conditional = cache({ fetchImpl: async () => new Response(null, { status: 304 }) });
    const response = await conditional.fetch(url, { headers: { 'If-None-Match': 'previous' } });
    expect(response.status).toBe(304);
    expect(response.body).toBeNull();
    for (const [target, init] of [
      ['https://api.github.com/repos/qiz029/todd-blog', undefined],
      [url, { method: 'POST' }], [url, { headers: { Authorization: 'test' } }],
    ]) {
      await client.fetch(target, init);
      expect(remote).toHaveBeenLastCalledWith(target, init);
    }
  });

  it('honors caller cancellation without retrying', async () => {
    const controller = new AbortController(); controller.abort();
    const remote = vi.fn();
    await expect(cache({ fetchImpl: remote }).fetch(url, { signal: controller.signal })).rejects.toThrow();
    expect(remote).not.toHaveBeenCalled();
  });
});
