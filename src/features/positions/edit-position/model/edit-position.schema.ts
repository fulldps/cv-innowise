import { z } from 'zod';

export const editPositionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});

export type EditPositionFormValues = z.infer<typeof editPositionSchema>;
