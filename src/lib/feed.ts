const decodeEntities = (value: string) =>
	value
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

const escapeAttr = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * Rendered post HTML made safe for feed readers: Astro's image placeholders become
 * plain <img> tags pointing at the original files, root-relative links and images
 * become absolute, and the "#" heading anchors are dropped.
 */
export function feedContent(html: string, site: URL): string {
	const origin = site.origin;
	return html
		.replace(/<img __ASTRO_IMAGE_="([^"]*)"\s*\/?>/g, (tag, attr: string) => {
			try {
				const { src, alt = '' } = JSON.parse(decodeEntities(attr)) as { src: string; alt?: string };
				return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}">`;
			} catch {
				return '';
			}
		})
		.replace(/<a[^>]*class="heading-anchor"[^>]*>[\s\S]*?<\/a>/g, '')
		.replace(/\s(href|src)="\/(?!\/)/g, ` $1="${origin}/`);
}
