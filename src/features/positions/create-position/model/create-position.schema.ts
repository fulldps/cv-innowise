import { z } from 'zod';

export const createPositionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});

export type CreatePositionFormValues = z.infer<typeof createPositionSchema>;
