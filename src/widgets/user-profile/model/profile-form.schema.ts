import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),

  lastName: z.string().trim().min(1, 'Last name is required'),

  departmentId: z.string().min(1, 'Department is required'),

  positionId: z.string().min(1, 'Position is required'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
