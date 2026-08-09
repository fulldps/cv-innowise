import { z } from 'zod';

export const editProjectSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  domain: z.string().trim().min(1, 'Domain is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string(),
  description: z.string().trim().min(1, 'Description is required'),
  environment: z.array(z.string()),
});

export type EditProjectFormValues = z.infer<typeof editProjectSchema>;
