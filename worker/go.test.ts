import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleRequest } from './index';

const env = {} as Env;

describe('/go/bilibili', () => {
	afterEach(() => vi.restoreAllMocks());

	it('redirects to the Bilibili space and logs the referring page', async () => {
		const log = vi.spyOn(console, 'log').mockImplementation(() => {});
		const res = await handleRequest(
			new Request('https://toddzheng.net/go/bilibili', { headers: { Referer: 'https://toddzheng.net/zh/blog/spectrum/' } }),
			env,
		);
		expect(res.status).toBe(302);
		expect(res.headers.get('Location')).toBe('https://space.bilibili.com/390147');
		expect(res.headers.get('Cache-Control')).toBe('no-store');
		expect(JSON.parse(log.mock.calls[0][0] as string)).toMatchObject({
			event: 'outbound_click',
			bv: null,
			from: '/zh/blog/spectrum/',
		});
	});

	it('redirects a BV id to the video and ignores external referrers', async () => {
		const log = vi.spyOn(console, 'log').mockImplementation(() => {});
		const res = await handleRequest(
			new Request('https://toddzheng.net/go/bilibili/BV119pj6SEhy/', { headers: { Referer: 'https://example.com/' } }),
			env,
		);
		expect(res.headers.get('Location')).toBe('https://www.bilibili.com/video/BV119pj6SEhy/');
		expect(JSON.parse(log.mock.calls[0][0] as string)).toMatchObject({ bv: 'BV119pj6SEhy', from: null });
	});

	it('falls through to static assets for unknown targets', async () => {
		const res = await handleRequest(new Request('https://toddzheng.net/go/bilibili/not-a-video'), env);
		expect(res.status).toBe(404);
	});
});
