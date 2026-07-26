import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

/** Published posts for one locale, newest first. */
export function localePosts(posts: Post[], locale: string): Post[] {
	return posts
		.filter((p) => p.id.startsWith(locale + '/') && !p.data.draft)
		.sort((a, b) => {
			const dateDiff = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
			if (dateDiff !== 0) return dateDiff;
			return b.id.localeCompare(a.id);
		});
}

export function postUrl(post: Post, locale: string): string {
	return `/${locale}/blog/${post.id.replace(locale + '/', '')}/`;
}

/** Chronological neighbours plus up to three posts sharing the most tags. */
export function postNav(sorted: Post[], current: Post) {
	const i = sorted.findIndex((p) => p.id === current.id);
	const newer = i > 0 ? sorted[i - 1] : undefined;
	const older = i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : undefined;
	const related = sorted
		.filter((p) => p.id !== current.id)
		.map((p) => ({
			post: p,
			score: p.data.tags.filter((tag) => current.data.tags.includes(tag)).length,
		}))
		.filter((r) => r.score > 0)
		.sort(
			(a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf()
		)
		.slice(0, 3)
		.map((r) => r.post);
	return { newer, older, related };
}

/** Rough reading stats from raw Markdown: CJK chars count as one "word" each. */
export function readingStats(body: string): { minutes: number; words: number } {
	const text = body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_~|-]/g, ' ');
	const cjk = (text.match(/[㐀-鿿豈-﫿]/g) || []).length;
	const latinWords = text
		.replace(/[㐀-鿿豈-﫿]/g, ' ')
		.split(/\s+/)
		.filter((w) => /\w/.test(w)).length;
	const minutes = Math.max(1, Math.round(cjk / 350 + latinWords / 225));
	return { minutes, words: cjk + latinWords };
}

/** Tag -> post count for one locale, most-used first. */
export function tagCounts(posts: Post[]): [string, number][] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
