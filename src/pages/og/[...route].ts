import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

// One social-card PNG per blog post, served at /og/<locale>/<slug>.png.
const posts = await getCollection('blog', (entry) => !entry.data.draft);
const pages = Object.fromEntries(posts.map((post) => [post.id, post.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
	param: 'route',
	pages,
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		// Matches the site palette in src/styles/global.css (--bg / --bg-card / --accent).
		bgGradient: [
			[13, 17, 23],
			[21, 27, 36],
		],
		border: { color: [230, 43, 30], width: 14, side: 'inline-start' },
		padding: 72,
		font: {
			title: {
				color: [230, 233, 239],
				size: 64,
				lineHeight: 1.25,
				weight: 'Bold',
				families: ['Space Grotesk', 'Noto Sans SC'],
			},
			description: {
				color: [139, 149, 165],
				size: 32,
				lineHeight: 1.5,
				families: ['Inter', 'Noto Sans SC'],
			},
		},
		fonts: [
			'./src/assets/og-fonts/space-grotesk-700.ttf',
			'./src/assets/og-fonts/inter-400.ttf',
			'./src/assets/og-fonts/noto-sans-sc-700.otf',
			'./src/assets/og-fonts/noto-sans-sc-400.otf',
		],
	}),
});
