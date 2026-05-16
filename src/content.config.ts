import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: z.object({
		heroHeading: z.string(),
		heroSubheading: z.string(),
		heroImage: z.string(),
	}),
});

export const collections = { pages };
