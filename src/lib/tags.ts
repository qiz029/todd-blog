/**
 * URL slug for a tag: case-insensitive, spaces collapsed to hyphens.
 * "Internet History" and "internet-history" share /tags/internet-history/;
 * CJK tags pass through unchanged.
 */
export function tagSlug(tag: string): string {
	return tag
		.trim()
		.toLowerCase()
		.replace(/[\s_]+/g, '-')
		.replace(/[\/?#%]+/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

export function tagUrl(tag: string, locale: string): string {
	return `/${locale}/tags/${tagSlug(tag)}/`;
}

/** Tag pages with fewer posts than this are noindexed and left out of the sitemap. */
export const MIN_INDEXED_TAG_POSTS = 2;
