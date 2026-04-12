import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "../docs",
    // Preserve the full path (including ".ja" suffix) so parseDocId can decode locale.
    // Default slugifier strips dots; we need it to stay as "frontend/react/hooks.ja".
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    created: z.coerce.date().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { docs };
