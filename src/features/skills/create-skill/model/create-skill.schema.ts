import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  categoryId: z.string().min(1, 'Category is required'),
});

export type CreateSkillFormValues = z.infer<typeof createSkillSchema>;
