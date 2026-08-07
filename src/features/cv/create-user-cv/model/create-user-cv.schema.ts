import { z } from 'zod';

export const createUserCvSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  description: z.string().trim().min(1, 'Description is required'),
});

export type CreateUserCvFormValues = z.infer<typeof createUserCvSchema>;
