import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog-posts" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.union([z.string(), z.date()]).optional(),
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
