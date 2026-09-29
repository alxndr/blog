import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

// define schemas for the frontmatter of blog posts, pages, and tag pages

// YAML parses an unquoted `publishDate: 2026-09-29` as a Date at UTC midnight, and
// rendering a Date yields a full locale date/time string ("Mon Sep 28 2026 17:00:00
// GMT-0700 (Pacific Daylight Time)") -- which also shifts the day in negative-offset
// timezones. Normalizing here keeps every consumer (post lists, pagefind metadata)
// on a single YYYY-MM-DD format, using UTC to match how date-only values parse.
const publishDate = z
	.union([z.iso.date(), z.date()])
	.transform((value) => typeof value === 'string' ? value : value.toISOString().slice(0, 10))

const posts = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog-posts" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: publishDate.optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		thumbnail: image().optional(),
	}).superRefine((data, ctx) => {
		if (!data.draft && data.publishDate === undefined) {
			ctx.addIssue({
				code: 'custom',
				message: 'publishDate is required for non-draft posts',
				path: ['publishDate'],
			})
		}
	}),
});

const tagPages = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/data/tag-pages" }),
	schema: z.object({
		title: z.string().optional(),
		thumbnail: z.url().optional(),
	}),
});

export const collections = { posts, tagPages };
