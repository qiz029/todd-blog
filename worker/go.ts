/**
 * Tracked outbound links: /go/bilibili -> Bilibili space, /go/bilibili/<BV id> -> that video.
 * Each click is logged as JSON (Workers observability) with the page it came from, then 302'd.
 */
import { BILIBILI_URL } from '../src/consts';
import { bilibiliId } from './markdown';

export function handleGo(request: Request, pathname: string): Response | null {
	const match = pathname.match(/^\/go\/bilibili(?:\/([^/]+))?$/);
	if (!match) return null;
	const bv = match[1] ? bilibiliId(match[1]) : undefined;
	if (match[1] && !bv) return null;
	const target = bv ? `https://www.bilibili.com/video/${bv}/` : BILIBILI_URL;

	if (request.method === 'GET') {
		console.log(
			JSON.stringify({
				event: 'outbound_click',
				target: 'bilibili',
				bv: bv ?? null,
				from: sameOriginPath(request),
				country: (request as Request & { cf?: { country?: string } }).cf?.country ?? null,
			}),
		);
	}
	return new Response(null, {
		status: 302,
		headers: { Location: target, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
	});
}

/** The referring page on this site, or null for external or missing referrers. */
function sameOriginPath(request: Request): string | null {
	const referer = request.headers.get('Referer');
	if (!referer) return null;
	try {
		const ref = new URL(referer);
		return ref.origin === new URL(request.url).origin ? ref.pathname : null;
	} catch {
		return null;
	}
}
