import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { handleRequest } from './index';
import { parseMarkdown, parseSeriesMarkdown, serializeMarkdown, serializeSeriesMarkdown, slugify, isValidDate } from './markdown';
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
	it('accepts precise timestamps and legacy dates, rejecting ambiguous or impossible times', () => {
		for (const value of ['2026-09-07', '2026-09-07T23:15:42.123Z', '2026-09-07T16:15:42-07:00']) {
			expect(isValidDate(value)).toBe(true);
		}
		for (const value of ['2026-02-30', '2026-02-30T12:00:00Z', '2026-09-07T12:00:00', '2026-09-07T24:00:00Z']) {
			expect(isValidDate(value)).toBe(false);
		}
	});

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

	it('round-trips series membership and drops seriesOrder without a series', () => {
		const md = serializeMarkdown({
			title: 'Part two',
			description: 'd',
			pubDate: '2026-05-11',
			tags: [],
			draft: false,
			series: 'ai-era',
			seriesOrder: 2,
			body: '',
		});
		expect(md).toContain('series: ai-era');
		expect(md).toContain('seriesOrder: 2');
		const parsed = parseMarkdown(md);
		expect(parsed.series).toBe('ai-era');
		expect(parsed.seriesOrder).toBe(2);

		const orphan = serializeMarkdown({ title: 't', description: 'd', pubDate: '2026-05-11', tags: [], draft: false, seriesOrder: 3, body: '' });
		expect(orphan).not.toContain('seriesOrder');
		expect(parseMarkdown(orphan).series).toBeUndefined();
	});

	it('round-trips series metadata files', () => {
		const md = serializeSeriesMarkdown({
			title: 'AI 时代的工程师',
			description: 'One line',
			status: 'completed',
			draft: true,
			upNext: 'Next: "agents"',
			body: 'Intro paragraph.\n',
		});
		expect(md).toContain('status: completed');
		expect(md).toContain('draft: true');
		expect(md).toContain('upNext: "Next: \\"agents\\""');
		const parsed = parseSeriesMarkdown(md);
		expect(parsed).toMatchObject({ title: 'AI 时代的工程师', status: 'completed', draft: true, upNext: 'Next: "agents"' });
		expect(parsed.body.trim()).toBe('Intro paragraph.');
		expect(parseSeriesMarkdown('---\ntitle: x\n---\n').status).toBe('ongoing');
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
		files.set('src/content/series/en/live-series.md', {
			content: serializeSeriesMarkdown({ title: 'Live Series', description: 'd', status: 'ongoing', draft: false, body: 'Intro' }),
			sha: 'sha-series-live',
		});
		files.set('src/content/series/en/hidden-series.md', {
			content: serializeSeriesMarkdown({ title: 'Hidden Series', description: 'd', status: 'ongoing', draft: true, body: '' }),
			sha: 'sha-series-hidden',
		});
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
		expect(link).toContain('/api/series');
		expect(link).toContain('/api/media');
		const body = (await res.json()) as { _links: Record<string, { href: string; rel?: string }> };
		expect(body._links.self.href).toBe('https://toddzheng.net/api');
		expect(body._links.openapi.href).toBe('https://toddzheng.net/api/openapi.json');
		expect(body._links.openapi.rel).toBe('service-desc');
		expect(body._links.posts.href).toMatch(/\/api\/posts$/);
		expect(body._links.series.href).toMatch(/\/api\/series$/);
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
		expect(spec.paths['/api/series'].get.operationId).toBe('listSeries');
		expect(spec.paths['/api/series'].post.operationId).toBe('createSeries');
		expect(spec.paths['/api/series/{locale}/{slug}'].get.operationId).toBe('getSeries');
		expect(spec.paths['/api/series/{locale}/{slug}'].patch.operationId).toBe('updateSeries');
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
		expect(parseMarkdown(stored!.content).pubDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
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

	it('PATCH preserves the exact publication timestamp through storage and response', async () => {
		const pubDate = '2026-09-07T16:15:42.123-07:00';
		const res = await handleRequest(req('/api/posts/en/published', auth({
			method: 'PATCH', headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pubDate }),
		})), env);
		expect(res.status).toBe(200);
		expect(await res.json()).toMatchObject({ pubDate });
		expect(parseMarkdown(files.get('src/content/blog/en/published.md')!.content).pubDate).toBe(pubDate);
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
	// ── Series ──

	it('anonymous series list and get hide drafts; auth reveals them', async () => {
		const anon = await handleRequest(req('/api/series?locale=en'), env);
		expect(anon.status).toBe(200);
		const list = (await anon.json()) as { series: Array<{ slug: string; intro?: string }> };
		expect(list.series.map((s) => s.slug)).toEqual(['live-series']);
		expect(list.series[0]).not.toHaveProperty('intro');

		const hidden = await handleRequest(req('/api/series/en/hidden-series'), env);
		expect(hidden.status).toBe(401);

		const authed = await handleRequest(req('/api/series?locale=en&draft=true', auth()), env);
		const drafts = (await authed.json()) as { series: Array<{ slug: string }> };
		expect(drafts.series.map((s) => s.slug)).toEqual(['hidden-series']);

		const one = await handleRequest(req('/api/series/en/live-series'), env);
		const body = (await one.json()) as { intro: string; htmlUrl: string; _links: { sibling: { href: string }; posts: { href: string } } };
		expect(body.intro.trim()).toBe('Intro');
		expect(body.htmlUrl).toBe('/en/series/live-series/');
		expect(body._links.sibling.href).toBe('https://toddzheng.net/api/series/zh/live-series');
		expect(body._links.posts.href).toContain('/api/posts?locale=en&series=live-series');
	});

	it('creates a draft series file via GitHub and refuses duplicates', async () => {
		const create = () =>
			handleRequest(
				req(
					'/api/series',
					auth({
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							locale: 'zh',
							title: 'AI 时代的工程师',
							slug: 'ai-era',
							description: '一句话',
							intro: '这个专栏……',
							upNext: '下一篇',
						}),
					}),
				),
				env,
			);
		const res = await create();
		expect(res.status).toBe(201);
		const body = (await res.json()) as { draft: boolean; status: string; slug: string; commitSha: string; _links: { self: { href: string } } };
		expect(body.draft).toBe(true);
		expect(body.status).toBe('ongoing');
		expect(body.slug).toBe('ai-era');
		expect(body.commitSha).toMatch(/^commit-/);
		expect(body._links.self.href).toBe('https://toddzheng.net/api/series/zh/ai-era');
		const stored = files.get('src/content/series/zh/ai-era.md')!;
		expect(stored.content).toContain('title: "AI 时代的工程师"');
		expect(stored.content).toContain('draft: true');
		expect(stored.content).toContain('upNext: "下一篇"');
		expect(stored.content.trim().endsWith('这个专栏……')).toBe(true);

		const dup = await create();
		expect(dup.status).toBe(409);

		const anon = await handleRequest(
			req('/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }),
			env,
		);
		expect(anon.status).toBe(401);
	});

	it('PATCH publishes a series, changes status, and clears upNext with null', async () => {
		const res = await handleRequest(
			req(
				'/api/series/en/hidden-series',
				auth({
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ draft: false, status: 'completed', upNext: null }),
				}),
			),
			env,
		);
		expect(res.status).toBe(200);
		const body = (await res.json()) as { draft: boolean; status: string; upNext: string | null };
		expect(body).toMatchObject({ draft: false, status: 'completed', upNext: null });
		const stored = files.get('src/content/series/en/hidden-series.md')!.content;
		expect(stored).toContain('status: completed');
		expect(stored).not.toContain('draft: true');

		const bad = await handleRequest(
			req('/api/series/en/live-series', auth({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'paused' }) })),
			env,
		);
		expect(bad.status).toBe(400);

		const missing = await handleRequest(
			req('/api/series/en/nope', auth({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'x' }) })),
			env,
		);
		expect(missing.status).toBe(404);
	});

	it('posts can only join a series that exists in their locale', async () => {
		const post = (series: string, locale = 'en') =>
			handleRequest(
				req(
					'/api/posts',
					auth({
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ locale, slug: 'part-one-' + series, title: 'Part one', description: 'd', body: 'b', series, seriesOrder: 1 }),
					}),
				),
				env,
			);

		const unknown = await post('no-such-series');
		expect(unknown.status).toBe(400);
		const err = (await unknown.json()) as { message: string; _links: { series: { href: string } } };
		expect(err.message).toContain('POST /api/series');
		expect(err._links.series.href).toMatch(/\/api\/series$/);

		// The series exists in en but not zh: locale-scoped.
		expect((await post('live-series', 'zh')).status).toBe(400);

		// A draft series is a valid target (posts show series UI once it is published).
		const ok = await post('hidden-series');
		expect(ok.status).toBe(201);
		expect(files.get('src/content/blog/en/part-one-hidden-series.md')!.content).toContain('series: hidden-series');

		// PATCH onto an unknown series is rejected too; null leaves the series.
		const bad = await handleRequest(
			req('/api/posts/en/published', auth({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ series: 'ghost' }) })),
			env,
		);
		expect(bad.status).toBe(400);
		const join = await handleRequest(
			req('/api/posts/en/published', auth({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ series: 'live-series', seriesOrder: 2 }) })),
			env,
		);
		expect(join.status).toBe(200);

		// ?series= filters the post list.
		const filtered = await handleRequest(req('/api/posts?locale=en&series=live-series'), env);
		const list = (await filtered.json()) as { posts: Array<{ slug: string; series: string; seriesOrder: number }> };
		expect(list.posts).toEqual([expect.objectContaining({ slug: 'published', series: 'live-series', seriesOrder: 2 })]);

		const leave = await handleRequest(
			req('/api/posts/en/published', auth({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ series: null }) })),
			env,
		);
		const left = (await leave.json()) as { series: string | null; seriesOrder: number | null };
		expect(left).toMatchObject({ series: null, seriesOrder: null });
	});
});
