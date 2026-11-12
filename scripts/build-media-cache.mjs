import { fileURLToPath } from 'node:url';
import { createMediaFetch } from './media-cache.mjs';

const { fetch, stats } = createMediaFetch({ cacheDir: fileURLToPath(new URL('../.cache/media/', import.meta.url)) });
globalThis.fetch = fetch;
process.on('exit', () => console.info(`[media] ${stats.downloads} downloads, ${stats.hits} cache hits, ${stats.retries} retries`));
