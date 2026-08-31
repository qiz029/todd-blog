import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { handleRequest } from './index';
import { parseMarkdown, serializeMarkdown, slugify } from './markdown';
import { utf8ToBase64, base64ToUtf8 } from './github';

const TOKEN = 'test-cms-token';
const PNG = Uint8Array.from(
	atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
	(c) => c.charCodeAt(0),
);

interface GhFile {
	content: string;
	sha: string;
}

function mockR2() {
	const store = new Map<string, { body: Uint8Array; contentType?: string }>();
	return {
		store,
		async put(key: string, value: Uint8Array | ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }) {
			const bytes = value instanceof Uint8Array ? value : new Uint8Array(value as ArrayBuffer);
			store.set(key, { body: bytes, contentType: options?.httpMetadata?.contentType });
			return { key, size: bytes.byteLength };
		},
		async get(key: string) {
			const v = store.get(key);
			if (!v) return null;
			return {
				body: v.body,
				httpMetadata: { contentType: v.contentType },
				arrayBuffer: async () => v.body.slice().buffer,
			};
		},
	};
}

function makeEnv(r2 = mockR2()): Env {
	return {
		CMS_TOKEN: TOKEN,
		GITHUB_TOKEN: 'gh-test',
		GITHUB_REPO: 'qiz029/todd-blog',
		GITHUB_BRANCH: 'main',
		MEDIA: r2 as unknown as R2Bucket,
		ASSETS: { fetch: async () => new Response('static', { status: 200 }) },
	};
}

function installGitHub(files: Map<string, GhFile>) {
	const orig = globalThis.fetch;
	let shaN = 1;
	globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const req = input instanceof Request ? input : new Request(String(input), init);
		const url = new URL(req.url);
		if (url.hostname !== 'api.github.com') return orig(input as never, init);
		const full = url.pathname.replace(/^\/repos\/[^/]+\/[^/]+\/contents\//, '');
		const path = decodeURIComponent(full);
		if (req.method === 'GET') {
			if (!path.includes('.md') && !path.split('/').pop()?.includes('.')) {
				const prefix = path.replace(/\/$/, '') + '/';
				const items = [...files.entries()]
					.filter(([p]) => p.startsWith(prefix) && p.slice(prefix.length).split('/').length === 1)
					.map(([p, f]) => ({
						type: 'file',
						name: p.slice(prefix.length),
						path: p,
						sha: f.sha,
					}));
				return Response.json(items);
			}
			const file = files.get(path);
			if (!file) return new Response('not found', { status: 404 });
			return Response.json({
				type: 'file',
				encoding: 'base64',
				content: utf8ToBase64(file.content),
				sha: file.sha,
				path,
				name: path.split('/').pop(),
			});
		}
		if (req.method === 'PUT') {
			const body = (await req.json()) as { content: string; sha?: string; message: string };
			const existing = files.get(path);
			if (existing && !body.sha) return Response.json({ message: 'sha required' }, { status: 422 });
			if (existing && body.sha && body.sha !== existing.sha) {
				return Response.json({ message: 'sha mismatch' }, { status: 409 });
			}
			const content = base64ToUtf8(body.content);
			const fileSha = 'file-' + shaN++;
			const commitSha = 'commit-' + shaN++;
			files.set(path, { content, sha: fileSha });
			return Response.json({ content: { sha: fileSha }, commit: { sha: commitSha } });
		}
		return new Response('nope', { status: 500 });
	};
	return () => {
		globalThis.fetch = orig;
	};
}

function auth(init: RequestInit = {}): RequestInit {
	const headers = new Headers(init.headers);
	headers.set('Authorization', `Bearer ${TOKEN}`);
	return { ...init, headers };
}

function req(path: string, init?: RequestInit) {
	return new Request('https://toddzheng.net' + path, init);
}

describe('markdown', () => {
	it('round-trips quoted titles and tags arrays', () => {
		const md = serializeMarkdown({
			title: "The AI Era Doesn't Need Code Monkeys",
			description: 'On abstraction.',
			pubDate: '2026-05-11',
			tags: ['ai', 'hiring'],
			draft: true,
			body: 'Hello.\n',
		});
		expect(md.startsWith('---\n')).toBe(true);
		expect(md).toContain('title: "The AI Era Doesn\'t Need Code Monkeys"');
		expect(md).toContain('tags: ["ai", "hiring"]');
		expect(md).toContain('draft: true');
		const parsed = parseMarkdown(md);
		expect(parsed.title).toBe("The AI Era Doesn't Need Code Monkeys");
		expect(parsed.tags).toEqual(['ai', 'hiring']);
		expect(parsed.draft).toBe(true);
		expect(parsed.body.trim()).toBe('Hello.');
	});

	it('slugifies titles', () => {
		expect(slugify('Hello World!')).toBe('hello-world');
	});
});

describe('CMS worker', () => {
	const files = new Map<string, GhFile>();
	let restore: () => void;
	let env: Env;

	beforeEach(() => {
		files.clear();
		const published = serializeMarkdown({
			title: 'Published',
			description: 'A live post',
			pubDate: '2026-05-11',
			tags: ['ai'],
			draft: false,
			body: 'Live body',
		});
		const draft = serializeMarkdown({
			title: 'Secret',
			description: 'hidden',
			pubDate: '2026-05-12',
			tags: [],
			draft: true,
			body: 'Draft body',
		});
		files.set('src/content/blog/en/published.md', { content: published, sha: 'sha-pub' });
		files.set('src/content/blog/en/secret.md', { content: draft, sha: 'sha-draft' });
		restore = installGitHub(files);
		env = makeEnv();
	});

	afterEach(() => restore());

	it('GET /api returns discovery _links and Link headers', async () => {
		const res = await handleRequest(req('/api'), env);
		expect(res.status).toBe(200);
		const link = res.headers.get('Link') ?? '';
		expect(link).toContain('rel="self"');
		expect(link).toContain('rel="service-desc"');
		expect(link).toContain('/api/openapi.json');
		expect(link).toContain('/api/posts');
		expect(link).toContain('/api/media');
		const body = (await res.json()) as { _links: Record<string, { href: string; rel?: string }> };
		expect(body._links.self.href).toBe('https://toddzheng.net/api');
		expect(body._links.openapi.href).toBe('https://toddzheng.net/api/openapi.json');
		expect(body._links.openapi.rel).toBe('service-desc');
		expect(body._links.posts.href).toMatch(/\/api\/posts$/);
		expect(body._links.media.href).toMatch(/\/api\/media$/);
	});

	it('GET /api/openapi.json is OpenAPI 3.1 generated from the router', async () => {
		const res = await handleRequest(req('/api/openapi.json'), env);
		expect(res.status).toBe(200);
		const spec = (await res.json()) as {
			openapi: string;
			paths: Record<string, Record<string, { operationId: string }>>;
		};
		expect(spec.openapi).toBe('3.1.0');
		expect(spec.paths['/api']).toBeTruthy();
		expect(spec.paths['/api/posts'].get.operationId).toBe('listPosts');
		expect(spec.paths['/api/posts'].post.operationId).toBe('createPost');
		expect(spec.paths['/api/posts/{locale}/{slug}'].patch.operationId).toBe('updatePost');
		expect(spec.paths['/api/media'].post.operationId).toBe('uploadMedia');
		expect(spec.paths['/media/{key}'].get.operationId).toBe('getMedia');
	});

	it('mutating routes return 401 without a bearer token', async () => {
		const create = await handleRequest(
			req('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					locale: 'en',
					title: 'Nope',
					description: 'x',
					body: 'y',
				}),
			}),
			env,
		);
		expect(create.status).toBe(401);
		const err = (await create.json()) as { error: string };
		expect(err.error).toBe('unauthorized');

		const patch = await handleRequest(
			req('/api/posts/en/published', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ draft: true }),
			}),
			env,
		);
		expect(patch.status).toBe(401);

		const media = await handleRequest(
			req('/api/media', { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: PNG }),
			env,
		);
		expect(media.status).toBe(401);
	});

	it('draft content requires auth', async () => {
		const anon = await handleRequest(req('/api/posts/en/secret'), env);
		expect(anon.status).toBe(401);
		const ok = await handleRequest(req('/api/posts/en/secret', auth()), env);
		expect(ok.status).toBe(200);
		const body = (await ok.json()) as { draft: boolean; title: string };
		expect(body.draft).toBe(true);
		expect(body.title).toBe('Secret');
	});

	it('creates a draft via GitHub Contents API and returns commit sha + html url', async () => {
		const res = await handleRequest(
			req(
				'/api/posts',
				auth({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						locale: 'en',
						slug: 'new-piece',
						title: 'New Piece',
						description: 'A draft',
						body: 'Hello CMS',
						tags: ['cms'],
					}),
				}),
			),
			env,
		);
		expect(res.status).toBe(201);
		const body = (await res.json()) as {
			draft: boolean;
			slug: string;
			commitSha: string;
			htmlUrl: string;
			_links: { self: { href: string }; sibling: { href: string } };
		};
		expect(body.draft).toBe(true);
		expect(body.slug).toBe('new-piece');
		expect(body.commitSha).toMatch(/^commit-/);
		expect(body.htmlUrl).toBe('/en/blog/new-piece/');
		expect(body._links.self.href).toBe('https://toddzheng.net/api/posts/en/new-piece');
		expect(body._links.sibling.href).toBe('https://toddzheng.net/api/posts/zh/new-piece');
		const stored = files.get('src/content/blog/en/new-piece.md');
		expect(stored).toBeTruthy();
		expect(stored!.content).toContain('draft: true');
		expect(stored!.content).toContain('title: "New Piece"');
		expect(stored!.content).toContain('tags: ["cms"]');
	});

	it('returns 409 when creating a duplicate slug', async () => {
		const res = await handleRequest(
			req(
				'/api/posts',
				auth({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						locale: 'en',
						slug: 'published',
						title: 'Dup',
						description: 'nope',
						body: 'nope',
					}),
				}),
			),
			env,
		);
		expect(res.status).toBe(409);
		const err = (await res.json()) as { error: string };
		expect(err.error).toBe('conflict');
	});

	it('PATCH updates markdown and can unpublish with draft=true', async () => {
		const res = await handleRequest(
			req(
				'/api/posts/en/published',
				auth({
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ draft: true, title: 'Unlisted' }),
				}),
			),
			env,
		);
		expect(res.status).toBe(200);
		const body = (await res.json()) as { draft: boolean; title: string; commitSha: string };
		expect(body.draft).toBe(true);
		expect(body.title).toBe('Unlisted');
		expect(body.commitSha).toMatch(/^commit-/);
		expect(files.get('src/content/blog/en/published.md')!.content).toContain('draft: true');
	});

	it('uploads an image to R2 and serves it at /media/{key}', async () => {
		const r2 = mockR2();
		env = makeEnv(r2);
		const form = new FormData();
		form.set('file', new File([PNG], 'hero.png', { type: 'image/png' }));
		const res = await handleRequest(req('/api/media', auth({ method: 'POST', body: form })), env);
		expect(res.status).toBe(201);
		const body = (await res.json()) as { url: string; key: string };
		expect(body.url).toMatch(/^\/media\/hero-[a-z0-9]+\.png$/);
		expect(r2.store.has(body.key)).toBe(true);

		const get = await handleRequest(req(body.url), env);
		expect(get.status).toBe(200);
		expect(get.headers.get('Content-Type')).toBe('image/png');
		const bytes = new Uint8Array(await get.arrayBuffer());
		expect(bytes.byteLength).toBe(PNG.byteLength);
	});

	it('anonymous list hides drafts', async () => {
		const res = await handleRequest(req('/api/posts?locale=en'), env);
		expect(res.status).toBe(200);
		const body = (await res.json()) as { posts: Array<{ slug: string }> };
		const slugs = body.posts.map((p) => p.slug);
		expect(slugs).toContain('published');
		expect(slugs).not.toContain('secret');
	});
});
