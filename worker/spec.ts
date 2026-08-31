/**
 * Route table — source of truth for both the router and OpenAPI 3.1.
 * Do not hand-maintain a parallel spec.
 */

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Operation {
	method: Method;
	path: string;
	operationId: string;
	summary: string;
	description?: string;
	tags: string[];
	/** none = public; bearer = always auth; drafts = auth when accessing drafts */
	auth: 'none' | 'bearer' | 'drafts';
	parameters?: unknown[];
	requestBody?: unknown;
	successStatus?: number;
}

export const operations: Operation[] = [
	{
		method: 'GET',
		path: '/api',
		operationId: 'discover',
		summary: 'API discovery document',
		description:
			'Entry point. Follow `_links` and the OpenAPI document (rel=service-desc). Never use a CLI.',
		tags: ['discovery'],
		auth: 'none',
	},
	{
		method: 'GET',
		path: '/api/openapi.json',
		operationId: 'getOpenApi',
		summary: 'OpenAPI 3.1 document',
		description: 'Generated from the same route table the Worker uses to dispatch requests.',
		tags: ['discovery'],
		auth: 'none',
	},
	{
		method: 'GET',
		path: '/api/posts',
		operationId: 'listPosts',
		summary: 'List posts',
		description:
			'Query `locale=en|zh` and `draft=true|false`. `draft=true` and unpublished posts require a bearer token.',
		tags: ['posts'],
		auth: 'drafts',
		parameters: [
			{
				name: 'locale',
				in: 'query',
				schema: { type: 'string', enum: ['en', 'zh'] },
				description: 'Filter by locale',
			},
			{
				name: 'draft',
				in: 'query',
				schema: { type: 'boolean' },
				description: 'If true, only drafts (auth required). If false, only published. Omitted: published for anonymous, all for authenticated.',
			},
		],
	},
	{
		method: 'POST',
		path: '/api/posts',
		operationId: 'createPost',
		summary: 'Create a post',
		description:
			'Writes markdown to git via GitHub Contents API. Defaults to draft=true. POST never overwrites an existing slug (409). Slug from body or derived from title.',
		tags: ['posts'],
		auth: 'bearer',
		successStatus: 201,
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/CreatePost' },
				},
			},
		},
	},
	{
		method: 'GET',
		path: '/api/posts/{locale}/{slug}',
		operationId: 'getPost',
		summary: 'Get one post',
		description: 'Drafts require a bearer token.',
		tags: ['posts'],
		auth: 'drafts',
		parameters: [
			{ name: 'locale', in: 'path', required: true, schema: { type: 'string', enum: ['en', 'zh'] } },
			{ name: 'slug', in: 'path', required: true, schema: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } },
		],
	},
	{
		method: 'PATCH',
		path: '/api/posts/{locale}/{slug}',
		operationId: 'updatePost',
		summary: 'Update a post',
		description: 'Partial update. Set draft=true to unpublish. Does not delete git history.',
		tags: ['posts'],
		auth: 'bearer',
		parameters: [
			{ name: 'locale', in: 'path', required: true, schema: { type: 'string', enum: ['en', 'zh'] } },
			{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
		],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: { $ref: '#/components/schemas/UpdatePost' },
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/api/media',
		operationId: 'uploadMedia',
		summary: 'Upload an image',
		description:
			'multipart/form-data (field file, image, or media) or a raw image body. jpeg/png/webp/gif, 5MB cap. Stored in R2; public at /media/{key}.',
		tags: ['media'],
		auth: 'bearer',
		successStatus: 201,
		requestBody: {
			required: true,
			content: {
				'multipart/form-data': {
					schema: {
						type: 'object',
						properties: { file: { type: 'string', format: 'binary' } },
					},
				},
				'image/jpeg': { schema: { type: 'string', format: 'binary' } },
				'image/png': { schema: { type: 'string', format: 'binary' } },
				'image/webp': { schema: { type: 'string', format: 'binary' } },
				'image/gif': { schema: { type: 'string', format: 'binary' } },
			},
		},
	},
	{
		method: 'GET',
		path: '/media/{key}',
		operationId: 'getMedia',
		summary: 'Get a public media object',
		tags: ['media'],
		auth: 'none',
		parameters: [
			{ name: 'key', in: 'path', required: true, schema: { type: 'string' } },
		],
	},
];

export function matchRoute(
	method: string,
	pathname: string,
): { op: Operation; params: Record<string, string> } | { op: null; allowed: string[] } | null {
	const allowed: string[] = [];
	let pathHit = false;
	for (const op of operations) {
		const params = matchPath(op.path, pathname);
		if (!params) continue;
		pathHit = true;
		allowed.push(op.method);
		if (op.method === method) return { op, params };
	}
	if (pathHit) return { op: null, allowed };
	return null;
}

export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
	const pParts = pattern.split('/').filter(Boolean);
	const uParts = pathname.split('/').filter(Boolean);
	if (pParts.length !== uParts.length) return null;
	const params: Record<string, string> = {};
	for (let i = 0; i < pParts.length; i++) {
		const p = pParts[i];
		if (p.startsWith('{') && p.endsWith('}')) {
			params[p.slice(1, -1)] = decodeURIComponent(uParts[i]);
		} else if (p !== uParts[i]) {
			return null;
		}
	}
	return params;
}

const schemas = {
	Error: {
		type: 'object',
		required: ['error', 'message', '_links'],
		properties: {
			error: { type: 'string', enum: ['unauthorized', 'not_found', 'conflict', 'invalid', 'upstream'] },
			message: { type: 'string' },
			_links: { type: 'object', additionalProperties: true },
		},
	},
	CreatePost: {
		type: 'object',
		required: ['locale', 'title', 'description', 'body'],
		properties: {
			locale: { type: 'string', enum: ['en', 'zh'] },
			slug: { type: 'string', description: 'Derived from title when omitted' },
			title: { type: 'string' },
			description: { type: 'string' },
			body: { type: 'string', description: 'Markdown body (no frontmatter)' },
			tags: { type: 'array', items: { type: 'string' } },
			pubDate: { type: 'string', format: 'date' },
			updatedDate: { type: 'string', format: 'date' },
			draft: { type: 'boolean', default: true },
			heroImageUrl: { type: 'string', description: 'Typically /media/{key}' },
		},
	},
	UpdatePost: {
		type: 'object',
		properties: {
			title: { type: 'string' },
			description: { type: 'string' },
			body: { type: 'string' },
			tags: { type: 'array', items: { type: 'string' } },
			pubDate: { type: 'string', format: 'date' },
			updatedDate: { type: 'string', format: 'date' },
			draft: { type: 'boolean', description: 'true unpublishes; false publishes' },
			heroImageUrl: { type: ['string', 'null'] },
		},
	},
	Post: {
		type: 'object',
		properties: {
			locale: { type: 'string' },
			slug: { type: 'string' },
			title: { type: 'string' },
			description: { type: 'string' },
			body: { type: 'string' },
			tags: { type: 'array', items: { type: 'string' } },
			pubDate: { type: 'string' },
			updatedDate: { type: 'string' },
			draft: { type: 'boolean' },
			heroImage: { type: 'string' },
			sha: { type: 'string' },
			commitSha: { type: 'string' },
			htmlUrl: { type: 'string' },
			_links: { type: 'object', additionalProperties: true },
		},
	},
	Media: {
		type: 'object',
		properties: {
			url: { type: 'string', example: '/media/hero-ab12cd34.png' },
			key: { type: 'string' },
			_links: { type: 'object', additionalProperties: true },
		},
	},
};

export function buildOpenApi(origin: string): unknown {
	const paths: Record<string, Record<string, unknown>> = {};
	for (const op of operations) {
		const item = (paths[op.path] ??= {});
		const security = op.auth === 'none' ? [] : [{ bearerAuth: [] }];
		item[op.method.toLowerCase()] = {
			operationId: op.operationId,
			summary: op.summary,
			description: op.description,
			tags: op.tags,
			security,
			parameters: op.parameters,
			requestBody: op.requestBody,
			responses: {
				[String(op.successStatus ?? 200)]: {
					description: 'OK',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/' + (op.operationId === 'uploadMedia' ? 'Media' : op.operationId === 'getMedia' ? 'Media' : 'Post') },
						},
					},
				},
				'400': { description: 'Invalid', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
				'401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
				'404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
				'409': { description: 'Conflict', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
			},
		};
	}
	return {
		openapi: '3.1.0',
		info: {
			title: 'Todd Blog CMS',
			version: '1.0.0',
			description:
				'Hypermedia CMS for toddzheng.net. Start at GET /api, then follow `_links` and this document. Git is the source of truth. No CLI.',
		},
		servers: [{ url: origin }],
		tags: [
			{ name: 'discovery' },
			{ name: 'posts' },
			{ name: 'media' },
		],
		paths,
		components: {
			securitySchemes: {
				bearerAuth: { type: 'http', scheme: 'bearer', description: 'CMS_TOKEN' },
			},
			schemas,
		},
	};
}
