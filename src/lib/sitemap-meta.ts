// Build-time sitemap metadata, read straight from the Markdown files because
// astro.config runs before content collections exist.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMarkdown } from '../../worker/markdown';
import { MIN_INDEXED_TAG_POSTS, tagSlug } from './tags';

const BLOG_DIR = 'src/content/blog';

export interface SitemapMeta {
	/** Path (e.g. /en/blog/foo/) -> last modification date. */
	lastmod: Map<string, Date>;
	/** Tag page paths with too few posts to be worth indexing. */
	thinTagPaths: Set<string>;
}

export function sitemapMeta(locales: string[]): SitemapMeta {
	const lastmod = new Map<string, Date>();
	const thinTagPaths = new Set<string>();
	for (const locale of locales) {
		const dir = join(BLOG_DIR, locale);
		const tagCounts = new Map<string, number>();
		let latest: Date | undefined;
		for (const file of readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
			const post = parseMarkdown(readFileSync(join(dir, file), 'utf8'));
			if (post.draft) continue;
			const modified = new Date(post.updatedDate || post.pubDate);
			if (Number.isNaN(modified.getTime())) continue;
			lastmod.set(`/${locale}/blog/${file.replace(/\.mdx?$/, '')}/`, modified);
			if (!latest || modified > latest) latest = modified;
			for (const slug of new Set(post.tags.map(tagSlug))) {
				tagCounts.set(slug, (tagCounts.get(slug) ?? 0) + 1);
			}
		}
		for (const [slug, count] of tagCounts) {
			if (count < MIN_INDEXED_TAG_POSTS) thinTagPaths.add(`/${locale}/tags/${slug}/`);
		}
		if (latest) {
			for (const listing of ['/', '/blog/']) lastmod.set(`/${locale}${listing}`, latest);
		}
	}
	return { lastmod, thinTagPaths };
}
