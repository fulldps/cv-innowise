import { z } from 'zod';

export const createDepartmentSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});

export type CreateDepartmentFormValues = z.infer<typeof createDepartmentSchema>;
