import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    project: z.string(), // name of the microblog
  }),
});

export const collections = {
  projects,
};
