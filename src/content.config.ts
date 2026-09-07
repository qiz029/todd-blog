import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.union([image(), z.string()]).optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			// Series membership: the series slug (shared across locales, resolved to
			// `src/content/series/<locale>/<slug>.md`) and the 1-based reading position.
			// Missing seriesOrder falls back to publication order.
			series: z
				.string()
				.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'series must be a kebab-case slug')
				.optional(),
			seriesOrder: z.number().int().positive().optional(),
		}),
});

// One file per locale per series: `src/content/series/<locale>/<slug>.md`.
// The Markdown body is the long-form introduction shown on the series page.
const series = defineCollection({
	loader: glob({ base: './src/content/series', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			status: z.enum(['ongoing', 'completed']).default('ongoing'),
			// Draft series are invisible everywhere (no pages, badges, banners or OG images).
			draft: z.boolean().default(false),
			cover: z.union([image(), z.string()]).optional(),
			// Optional teaser for what comes next in an ongoing series.
			upNext: z.string().optional(),
		}),
});

export const collections = { blog, series };
