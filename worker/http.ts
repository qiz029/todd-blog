/** Shared JSON / Link / auth helpers. */

export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export type ErrorCode = 'unauthorized' | 'not_found' | 'conflict' | 'invalid' | 'upstream';

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}

export function originOf(request: Request): string {
	return new URL(request.url).origin;
}

export function abs(request: Request, path: string): string {
	return new URL(path, request.url).href;
}

export function normalizePath(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
	return pathname;
}

export function json(body: unknown, status = 200, extraHeaders?: HeadersInit): Response {
	const headers = new Headers(extraHeaders);
	if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json; charset=utf-8');
	return new Response(JSON.stringify(body, null, 2), { status, headers });
}

export function errorJson(
	request: Request,
	status: number,
	code: ErrorCode,
	message: string,
	extra?: Record<string, unknown>,
): Response {
	return json(
		{
			error: code,
			message,
			...extra,
			_links: {
				self: { href: request.url },
				api: { href: abs(request, '/api') },
				openapi: { href: abs(request, '/api/openapi.json'), rel: 'service-desc' },
			},
		},
		status,
	);
}

export function isAuthorized(request: Request, env: Env): boolean {
	const expected = env.CMS_TOKEN;
	if (!expected) return false;
	const header = request.headers.get('Authorization') ?? '';
	const token = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
	if (!token) return false;
	return timingSafeEqual(token, expected);
}

function timingSafeEqual(a: string, b: string): boolean {
	const encoder = new TextEncoder();
	const aa = encoder.encode(a);
	const bb = encoder.encode(b);
	if (aa.byteLength !== bb.byteLength) return false;
	let out = 0;
	for (let i = 0; i < aa.byteLength; i++) out |= aa[i] ^ bb[i];
	return out === 0;
}

export function linkHeader(links: Array<{ href: string; rel: string }>): string {
	return links.map((l) => `<${l.href}>; rel="${l.rel}"`).join(', ');
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'en' ? 'zh' : 'en';
}

export function htmlPath(locale: string, slug: string): string {
	return `/${locale}/blog/${slug}/`;
}

export function postApiPath(locale: string, slug: string): string {
	return `/api/posts/${locale}/${slug}`;
}

export function postLinks(request: Request, locale: Locale, slug: string) {
	return {
		self: { href: abs(request, postApiPath(locale, slug)) },
		collection: { href: abs(request, '/api/posts') },
		html: { href: abs(request, htmlPath(locale, slug)) },
		sibling: { href: abs(request, postApiPath(otherLocale(locale), slug)) },
		media: { href: abs(request, '/api/media') },
	};
}
