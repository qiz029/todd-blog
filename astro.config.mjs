// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { sitemapMeta } from './src/lib/sitemap-meta';

const SITE = 'https://toddzheng.net';
const { lastmod, thinTagPaths } = sitemapMeta(['en', 'zh']);

// Astro only optimizes remote Markdown images by absolute URL, so point root-relative
// /media/ images (R2, served by the worker) at the site origin.
function remarkAbsoluteMedia() {
	const walk = (node) => {
		if (node.type === 'image' && node.url.startsWith('/media/')) node.url = SITE + node.url;
		node.children?.forEach(walk);
	};
	return walk;
}

// https://astro.build/config
export default defineConfig({
	site: SITE,
	// Every page is a directory index; links without the slash would cost a redirect.
	trailingSlash: 'always',
	integrations: [mdx(), sitemap({
		// The bare root is a 301 to /en/, and single-post tag pages are noindexed.
		filter: (page) => {
			const path = decodeURI(new URL(page).pathname);
			return path !== '/' && path !== '/404/' && !thinTagPaths.has(path);
		},
		serialize: (item) => {
			const modified = lastmod.get(decodeURI(new URL(item.url).pathname));
			return modified ? { ...item, lastmod: modified.toISOString() } : item;
		},
		i18n: {
			defaultLocale: 'en',
			locales: {
				en: 'en-US',
				zh: 'zh-CN',
			},
		},
	})],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	image: {
		// Post images live in R2 behind /media/. Authorizing the domain lets Astro fetch them at
		// build time, so Markdown images ship as sized, lazy-loaded WebP instead of raw PNGs.
		domains: ['toddzheng.net'],
	},
	vite: {
		preview: {
			allowedHosts: ['todds-mac-mini.local', 'todds-mac-mini.tail961bf8.ts.net', '.local', '.ts.net'],
		},
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath, remarkAbsoluteMedia],
			rehypePlugins: [
				rehypeKatex,
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
						content: { type: 'text', value: '#' },
					},
				],
			],
		}),
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-inter',
			fallbacks: ['-apple-system', 'PingFang SC', 'Noto Sans SC', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/inter-400-normal.woff2'], weight: 400, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/inter-600-normal.woff2'], weight: 600, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/inter-700-normal.woff2'], weight: 700, style: 'normal', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Space Grotesk',
			cssVariable: '--font-space-grotesk',
			fallbacks: ['-apple-system', 'PingFang SC', 'Noto Sans SC', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/space-grotesk-500-normal.woff2'], weight: 500, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/space-grotesk-700-normal.woff2'], weight: 700, style: 'normal', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/jetbrains-mono-400-normal.woff2'], weight: 400, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/jetbrains-mono-500-normal.woff2'], weight: 500, style: 'normal', display: 'swap' },
				],
			},
		},
	],
});
