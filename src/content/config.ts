import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    longDescription: z.string().optional(),
    tech: z.array(z.string()),
    features: z.array(z.string()).optional(),
    role: z.string().optional(),
    year: z.string().optional(),
    category: z.string().default("Full-Stack"),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
