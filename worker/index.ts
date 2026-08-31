import { dispatchHandler } from './handlers';
import { errorJson, isAuthorized, json, normalizePath } from './http';
import { matchRoute } from './spec';

export default {
	async fetch(request, env): Promise<Response> {
		return handleRequest(request, env);
	},
} satisfies ExportedHandler<Env>;

export async function handleRequest(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const pathname = normalizePath(url.pathname);
	const method = request.method.toUpperCase();

	if (method === 'OPTIONS' && (pathname === '/api' || pathname.startsWith('/api/') || pathname.startsWith('/media/'))) {
		return new Response(null, {
			status: 204,
			headers: {
				Allow: 'GET, POST, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'Authorization, Content-Type',
			},
		});
	}

	const hit = matchRoute(method, pathname);
	if (hit && 'allowed' in hit && hit.op === null) {
		return errorJson(request, 405, 'invalid', `Method ${method} not allowed`, {
			_hint: `Allowed: ${hit.allowed.join(', ')}`,
		});
	}
	if (hit && hit.op) {
		const authed = isAuthorized(request, env);
		if (hit.op.auth === 'bearer' && !authed) {
			return errorJson(request, 401, 'unauthorized', 'Authorization: Bearer CMS_TOKEN required');
		}
		try {
			return await dispatchHandler({ request, env, params: hit.params, op: hit.op, authed });
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Internal error';
			return errorJson(request, 500, 'upstream', message);
		}
	}

	if (pathname === '/api' || pathname.startsWith('/api/') || pathname.startsWith('/media/')) {
		return errorJson(request, 404, 'not_found', `No route for ${method} ${pathname}`);
	}

	if (env.ASSETS) return env.ASSETS.fetch(request);
	return json({ error: 'not_found', message: 'Not found' }, 404);
}
