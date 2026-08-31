import {
	abs,
	errorJson,
	htmlPath,
	isLocale,
	json,
	linkHeader,
	postLinks,
	type Locale,
} from './http';
import { GitHubError, getFile, listPosts, putFile } from './github';
import {
	isValidDate,
	isValidSlug,
	parseMarkdown,
	serializeMarkdown,
	slugify,
	todayUTC,
	type PostFields,
} from './markdown';
import { MediaError, getMedia, parseKey, putMedia, readUpload } from './media';
import { buildOpenApi, type Operation } from './spec';

export type Ctx = {
	request: Request;
	env: Env;
	params: Record<string, string>;
	op: Operation;
	authed: boolean;
};

export async function dispatchHandler(ctx: Ctx): Promise<Response> {
	switch (ctx.op.operationId) {
		case 'discover':
			return handleDiscover(ctx);
		case 'getOpenApi':
			return handleOpenApi(ctx);
		case 'listPosts':
			return handleListPosts(ctx);
		case 'createPost':
			return handleCreatePost(ctx);
		case 'getPost':
			return handleGetPost(ctx);
		case 'updatePost':
			return handleUpdatePost(ctx);
		case 'uploadMedia':
			return handleUploadMedia(ctx);
		case 'getMedia':
			return handleGetMedia(ctx);
		default:
			return errorJson(ctx.request, 500, 'invalid', `No handler for ${ctx.op.operationId}`);
	}
}

function handleDiscover(ctx: Ctx): Response {
	const links = [
		{ href: abs(ctx.request, '/api'), rel: 'self' },
		{ href: abs(ctx.request, '/api/openapi.json'), rel: 'service-desc' },
		{ href: abs(ctx.request, '/api/posts'), rel: 'posts' },
		{ href: abs(ctx.request, '/api/media'), rel: 'media' },
	];
	return json(
		{
			name: 'Todd Blog CMS',
			_links: {
				self: { href: links[0].href },
				openapi: { href: links[1].href, rel: 'service-desc' },
				posts: { href: links[2].href },
				media: { href: links[3].href },
			},
		},
		200,
		{ Link: linkHeader(links) },
	);
}

function handleOpenApi(ctx: Ctx): Response {
	return json(buildOpenApi(new URL(ctx.request.url).origin));
}

function postResource(
	ctx: Ctx,
	locale: Locale,
	slug: string,
	fields: PostFields,
	extra: { sha?: string; commitSha?: string } = {},
) {
	return {
		locale,
		slug,
		title: fields.title,
		description: fields.description,
		body: fields.body,
		tags: fields.tags,
		pubDate: fields.pubDate,
		updatedDate: fields.updatedDate ?? null,
		draft: fields.draft,
		heroImage: fields.heroImage ?? null,
		htmlUrl: htmlPath(locale, slug),
		...extra,
		_links: postLinks(ctx.request, locale, slug),
	};
}

async function handleListPosts(ctx: Ctx): Promise<Response> {
	const url = new URL(ctx.request.url);
	const localeParam = url.searchParams.get('locale');
	const draftParam = url.searchParams.get('draft');

	if (localeParam && !isLocale(localeParam)) {
		return errorJson(ctx.request, 400, 'invalid', 'locale must be en or zh');
	}
	if (draftParam !== null && draftParam !== 'true' && draftParam !== 'false') {
		return errorJson(ctx.request, 400, 'invalid', 'draft must be true or false');
	}
	if (draftParam === 'true' && !ctx.authed) {
		return errorJson(ctx.request, 401, 'unauthorized', 'Authorization: Bearer CMS_TOKEN required for drafts');
	}

	const locales: Locale[] = localeParam && isLocale(localeParam) ? [localeParam] : ['en', 'zh'];
	const wantDraft = draftParam === 'true' ? true : draftParam === 'false' ? false : null;

	const posts: unknown[] = [];
	try {
		for (const locale of locales) {
			const files = await listPosts(ctx.env, locale);
			const loaded = await Promise.all(
				files.map(async (f) => {
					const slug = f.name.replace(/\.md$/, '');
					const file = await getFile(ctx.env, locale, slug);
					if (!file) return null;
					const fields = parseMarkdown(file.content);
					return { locale, slug, fields, sha: file.sha };
				}),
			);
			for (const item of loaded) {
				if (!item) continue;
				if (item.fields.draft && !ctx.authed) continue;
				if (wantDraft === true && !item.fields.draft) continue;
				if (wantDraft === false && item.fields.draft) continue;
				const resource = postResource(ctx, item.locale, item.slug, item.fields, { sha: item.sha });
				const { body: _body, ...summary } = resource as typeof resource & { body: string };
				posts.push(summary);
			}
		}
	} catch (err) {
		return githubError(ctx.request, err);
	}

	return json({
		posts,
		_links: {
			self: { href: ctx.request.url },
			collection: { href: abs(ctx.request, '/api/posts') },
			api: { href: abs(ctx.request, '/api') },
			openapi: { href: abs(ctx.request, '/api/openapi.json'), rel: 'service-desc' },
		},
	});
}

async function handleGetPost(ctx: Ctx): Promise<Response> {
	const locale = ctx.params.locale;
	const slug = ctx.params.slug;
	if (!isLocale(locale)) return errorJson(ctx.request, 400, 'invalid', 'locale must be en or zh');
	if (!isValidSlug(slug)) return errorJson(ctx.request, 400, 'invalid', 'invalid slug');
	try {
		const file = await getFile(ctx.env, locale, slug);
		if (!file) return errorJson(ctx.request, 404, 'not_found', `Post ${locale}/${slug} not found`);
		const fields = parseMarkdown(file.content);
		if (fields.draft && !ctx.authed) {
			return errorJson(ctx.request, 401, 'unauthorized', 'Authorization: Bearer CMS_TOKEN required for drafts');
		}
		return json(postResource(ctx, locale, slug, fields, { sha: file.sha }));
	} catch (err) {
		return githubError(ctx.request, err);
	}
}

interface WriteBody {
	locale?: unknown;
	slug?: unknown;
	title?: unknown;
	description?: unknown;
	body?: unknown;
	tags?: unknown;
	pubDate?: unknown;
	updatedDate?: unknown;
	draft?: unknown;
	heroImageUrl?: unknown;
}

async function readJson(request: Request): Promise<WriteBody | Response> {
	const ct = request.headers.get('Content-Type') || '';
	if (ct && !ct.toLowerCase().includes('application/json')) {
		return errorJson(request, 400, 'invalid', 'Content-Type must be application/json');
	}
	try {
		const data = await request.json();
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			return errorJson(request, 400, 'invalid', 'JSON object required');
		}
		return data as WriteBody;
	} catch {
		return errorJson(request, 400, 'invalid', 'Invalid JSON');
	}
}

function parseTags(request: Request, value: unknown): string[] | Response {
	if (value === undefined) return [];
	if (!Array.isArray(value) || value.some((t) => typeof t !== 'string')) {
		return errorJson(request, 400, 'invalid', 'tags must be an array of strings');
	}
	return value.map((t) => t.trim()).filter(Boolean);
}

function parseOptionalDate(request: Request, value: unknown, name: string): string | undefined | Response {
	if (value === undefined || value === null || value === '') return undefined;
	if (typeof value !== 'string' || !isValidDate(value)) {
		return errorJson(request, 400, 'invalid', `${name} must be YYYY-MM-DD`);
	}
	return value;
}

function parseHero(request: Request, value: unknown): string | undefined | Response {
	if (value === undefined) return undefined;
	if (value === null || value === '') return undefined;
	if (typeof value !== 'string') {
		return errorJson(request, 400, 'invalid', 'heroImageUrl must be a string');
	}
	if (!(value.startsWith('/media/') || /^https?:\/\//.test(value))) {
		return errorJson(request, 400, 'invalid', 'heroImageUrl must be a /media/... path or an http(s) URL');
	}
	return value;
}

async function handleCreatePost(ctx: Ctx): Promise<Response> {
	const body = await readJson(ctx.request);
	if (body instanceof Response) return body;

	if (typeof body.locale !== 'string' || !isLocale(body.locale)) {
		return errorJson(ctx.request, 400, 'invalid', 'locale must be en or zh');
	}
	const locale = body.locale;
	if (typeof body.title !== 'string' || !body.title.trim()) {
		return errorJson(ctx.request, 400, 'invalid', 'title is required');
	}
	if (typeof body.description !== 'string' || !body.description.trim()) {
		return errorJson(ctx.request, 400, 'invalid', 'description is required');
	}
	if (typeof body.body !== 'string') {
		return errorJson(ctx.request, 400, 'invalid', 'body is required');
	}

	let slug = typeof body.slug === 'string' ? body.slug.trim() : '';
	if (!slug) slug = slugify(body.title);
	if (!isValidSlug(slug)) {
		return errorJson(
			ctx.request,
			400,
			'invalid',
			'slug is required (could not derive a valid slug from title; pass slug explicitly)',
		);
	}

	const tags = parseTags(ctx.request, body.tags);
	if (tags instanceof Response) return tags;

	const pubDate = body.pubDate === undefined ? todayUTC() : parseOptionalDate(ctx.request, body.pubDate, 'pubDate');
	if (pubDate instanceof Response) return pubDate;
	if (!pubDate) return errorJson(ctx.request, 400, 'invalid', 'pubDate must be YYYY-MM-DD');

	const updatedDate = parseOptionalDate(ctx.request, body.updatedDate, 'updatedDate');
	if (updatedDate instanceof Response) return updatedDate;

	const heroImage = parseHero(ctx.request, body.heroImageUrl);
	if (heroImage instanceof Response) return heroImage;

	const draft = body.draft === undefined ? true : body.draft === true;

	const fields: PostFields = {
		title: body.title.trim(),
		description: body.description.trim(),
		pubDate,
		updatedDate,
		heroImage,
		tags: tags as string[],
		draft,
		body: body.body,
	};

	try {
		const existing = await getFile(ctx.env, locale, slug);
		if (existing) {
			return errorJson(ctx.request, 409, 'conflict', `Post ${locale}/${slug} already exists`);
		}
		const markdown = serializeMarkdown(fields);
		const result = await putFile(ctx.env, locale, slug, markdown, `cms: add ${locale}/${slug}`);
		return json(postResource(ctx, locale, slug, fields, { sha: result.fileSha, commitSha: result.sha }), 201);
	} catch (err) {
		return githubError(ctx.request, err);
	}
}

async function handleUpdatePost(ctx: Ctx): Promise<Response> {
	const locale = ctx.params.locale;
	const slug = ctx.params.slug;
	if (!isLocale(locale)) return errorJson(ctx.request, 400, 'invalid', 'locale must be en or zh');
	if (!isValidSlug(slug)) return errorJson(ctx.request, 400, 'invalid', 'invalid slug');

	const body = await readJson(ctx.request);
	if (body instanceof Response) return body;

	const keys = ['title', 'description', 'body', 'tags', 'pubDate', 'updatedDate', 'draft', 'heroImageUrl'] as const;
	if (!keys.some((k) => k in body)) {
		return errorJson(ctx.request, 400, 'invalid', 'PATCH body must include at least one updatable field');
	}

	try {
		const existing = await getFile(ctx.env, locale, slug);
		if (!existing) return errorJson(ctx.request, 404, 'not_found', `Post ${locale}/${slug} not found`);
		const fields = parseMarkdown(existing.content);

		if (body.title !== undefined) {
			if (typeof body.title !== 'string' || !body.title.trim()) {
				return errorJson(ctx.request, 400, 'invalid', 'title must be a non-empty string');
			}
			fields.title = body.title.trim();
		}
		if (body.description !== undefined) {
			if (typeof body.description !== 'string' || !body.description.trim()) {
				return errorJson(ctx.request, 400, 'invalid', 'description must be a non-empty string');
			}
			fields.description = body.description.trim();
		}
		if (body.body !== undefined) {
			if (typeof body.body !== 'string') return errorJson(ctx.request, 400, 'invalid', 'body must be a string');
			fields.body = body.body;
		}
		if (body.tags !== undefined) {
			const tags = parseTags(ctx.request, body.tags);
			if (tags instanceof Response) return tags;
			fields.tags = tags as string[];
		}
		if (body.pubDate !== undefined) {
			const pubDate = parseOptionalDate(ctx.request, body.pubDate, 'pubDate');
			if (pubDate instanceof Response) return pubDate;
			if (!pubDate) return errorJson(ctx.request, 400, 'invalid', 'pubDate must be YYYY-MM-DD');
			fields.pubDate = pubDate;
		}
		if (body.updatedDate !== undefined) {
			const updatedDate = parseOptionalDate(ctx.request, body.updatedDate, 'updatedDate');
			if (updatedDate instanceof Response) return updatedDate;
			fields.updatedDate = updatedDate;
		}
		if (body.draft !== undefined) {
			if (typeof body.draft !== 'boolean') return errorJson(ctx.request, 400, 'invalid', 'draft must be a boolean');
			fields.draft = body.draft;
		}
		if (body.heroImageUrl !== undefined) {
			if (body.heroImageUrl === null || body.heroImageUrl === '') {
				fields.heroImage = undefined;
			} else {
				const heroImage = parseHero(ctx.request, body.heroImageUrl);
				if (heroImage instanceof Response) return heroImage;
				fields.heroImage = heroImage;
			}
		}

		fields.updatedDate = fields.updatedDate ?? todayUTC();
		const markdown = serializeMarkdown(fields);
		const unpublished = body.draft === true;
		const message = unpublished ? `cms: unpublish ${locale}/${slug}` : `cms: update ${locale}/${slug}`;
		const result = await putFile(ctx.env, locale, slug, markdown, message, existing.sha);
		return json(postResource(ctx, locale, slug, fields, { sha: result.fileSha, commitSha: result.sha }));
	} catch (err) {
		return githubError(ctx.request, err);
	}
}

async function handleUploadMedia(ctx: Ctx): Promise<Response> {
	try {
		const { bytes, filename, type } = await readUpload(ctx.request);
		const stored = await putMedia(ctx.env, bytes, filename, type);
		return json(
			{
				url: stored.url,
				key: stored.key,
				_links: {
					self: { href: abs(ctx.request, stored.url) },
					collection: { href: abs(ctx.request, '/api/media') },
					api: { href: abs(ctx.request, '/api') },
				},
			},
			201,
		);
	} catch (err) {
		if (err instanceof MediaError) {
			return errorJson(ctx.request, 400, err.code, err.message);
		}
		throw err;
	}
}

async function handleGetMedia(ctx: Ctx): Promise<Response> {
	const key = parseKey(new URL(ctx.request.url).pathname) ?? ctx.params.key;
	if (!key) return errorJson(ctx.request, 400, 'invalid', 'Invalid media key');
	const res = await getMedia(ctx.env, key);
	if (!res) return errorJson(ctx.request, 404, 'not_found', `Media ${key} not found`);
	return res;
}

function githubError(request: Request, err: unknown): Response {
	if (err instanceof GitHubError) {
		if (err.status === 401 || err.status === 403) {
			return errorJson(request, 401, 'unauthorized', 'GitHub rejected GITHUB_TOKEN');
		}
		if (err.status === 404) return errorJson(request, 404, 'not_found', err.message);
		if (err.status === 409) return errorJson(request, 409, 'conflict', err.message);
		return errorJson(request, 502, 'upstream', err.message);
	}
	const message = err instanceof Error ? err.message : 'Unknown error';
	return errorJson(request, 502, 'upstream', message);
}

