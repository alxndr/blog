import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog-posts" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.union([z.string(), z.date()]),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		thumbnail: image().optional(),
	}),
});

const tagPages = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/data/tag-pages" }),
	schema: z.object({
		title: z.string().optional(),
		thumbnail: z.string().url().optional(),
	}),
});

export const collections = { posts, tagPages };
