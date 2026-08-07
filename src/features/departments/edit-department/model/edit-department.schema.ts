import { z } from 'zod';

export const editDepartmentSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});

export type EditDepartmentFormValues = z.infer<typeof editDepartmentSchema>;
