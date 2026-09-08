import { expect, it } from 'vitest';
import type { CollectionEntry } from 'astro:content';
import { localePosts, postNav } from '../src/lib/blog';

function post(id: string, pubDate: string): CollectionEntry<'blog'> {
	return { id: `zh/${id}`, collection: 'blog', data: {
		title: id, description: '', pubDate: new Date(pubDate), tags: [], draft: false,
	} };
}

it('orders same-day posts by instant across timezones, including chronological neighbours', () => {
	const older = post('z-older', '2026-09-07T10:00:00Z');
	const newer = post('a-newer', '2026-09-07T04:00:00-07:00');
	const newest = post('m-newest', '2026-09-07T11:00:00.001Z');
	const sorted = localePosts([older, newest, newer], 'zh');
	expect(sorted.map(p => p.id)).toEqual(['zh/m-newest', 'zh/a-newer', 'zh/z-older']);
	expect(postNav(sorted, newer)).toMatchObject({ newer: newest, older });
});
