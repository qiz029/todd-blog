// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://toddzheng.net',
	integrations: [mdx(), sitemap({
		// The bare root is a 301 to /en/ — keep it out of the sitemap.
		filter: (page) => page !== 'https://toddzheng.net/',
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
	vite: {
		preview: {
			allowedHosts: ['todds-mac-mini.local', 'todds-mac-mini.tail961bf8.ts.net', '.local', '.ts.net'],
		},
	},
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
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
