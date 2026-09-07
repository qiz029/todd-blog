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

// ── Series ──────────────────────────────────────────────────────────────────

type Series = CollectionEntry<'series'>;

export function seriesSlug(entry: Series, locale: string): string {
	return entry.id.replace(locale + '/', '');
}

export function seriesUrl(slug: string, locale: string): string {
	return `/${locale}/series/${slug}/`;
}

/** Series entries for one locale. */
export function localeSeries(all: Series[], locale: string): Series[] {
	return all.filter((s) => s.id.startsWith(locale + '/'));
}

/** Posts in one series, in reading order: explicit seriesOrder first, then oldest first. */
export function seriesPosts(posts: Post[], slug: string): Post[] {
	return posts
		.filter((p) => p.data.series === slug)
		.sort((a, b) => {
			const ao = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
			const bo = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
			if (ao !== bo) return ao - bo;
			return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
		});
}

export interface SeriesSummary {
	entry: Series;
	slug: string;
	posts: Post[];
	updated: Date | undefined;
}

/**
 * Every series in a locale with its posts, most recently updated first.
 * Throws when a post names a series that has no entry file for that locale,
 * so a typo fails the build instead of silently dropping the post.
 */
export function seriesSummaries(all: Series[], posts: Post[], locale: string): SeriesSummary[] {
	const entries = localeSeries(all, locale);
	const known = new Set(entries.map((s) => seriesSlug(s, locale)));
	for (const p of posts) {
		if (p.data.series && !known.has(p.data.series)) {
			throw new Error(
				`Post ${p.id} references series "${p.data.series}" but src/content/series/${locale}/${p.data.series}.md does not exist`
			);
		}
	}
	return entries
		.map((entry) => {
			const slug = seriesSlug(entry, locale);
			const list = seriesPosts(posts, slug);
			const updated = list.reduce<Date | undefined>((latest, p) => {
				const d = p.data.updatedDate ?? p.data.pubDate;
				return !latest || d > latest ? d : latest;
			}, undefined);
			return { entry, slug, posts: list, updated };
		})
		.sort((a, b) => {
			const au = a.updated?.valueOf() ?? 0;
			const bu = b.updated?.valueOf() ?? 0;
			return bu - au || a.slug.localeCompare(b.slug);
		});
}

export interface SeriesContext {
	entry: Series;
	slug: string;
	href: string;
	index: number; // 1-based position of the current post
	total: number;
	prev?: Post;
	next?: Post;
	posts: Post[];
}

/** Where `current` sits in its series, or undefined when it is not in one. */
export function seriesContext(
	all: Series[],
	posts: Post[],
	current: Post,
	locale: string
): SeriesContext | undefined {
	const slug = current.data.series;
	if (!slug) return undefined;
	const entry = localeSeries(all, locale).find((s) => seriesSlug(s, locale) === slug);
	if (!entry) {
		throw new Error(
			`Post ${current.id} references series "${slug}" but src/content/series/${locale}/${slug}.md does not exist`
		);
	}
	const list = seriesPosts(posts, slug);
	const i = list.findIndex((p) => p.id === current.id);
	return {
		entry,
		slug,
		href: seriesUrl(slug, locale),
		index: i + 1,
		total: list.length,
		prev: i > 0 ? list[i - 1] : undefined,
		next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
		posts: list,
	};
}
