import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    technologies: z.array(z.string()),
    category: z.enum(['employer', 'client', 'personal']),
    dateRange: z.string().optional(),
    confidential: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
