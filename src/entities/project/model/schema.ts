import z from 'zod';

export const projectSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
  roles: z.string().optional(),
  responsibilities: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
