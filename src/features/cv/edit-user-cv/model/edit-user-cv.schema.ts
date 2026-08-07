import { z } from 'zod';

export const editUserCvSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  description: z.string().trim().min(1, 'Description is required'),
});

export type EditUserCvFormValues = z.infer<typeof editUserCvSchema>;
