import z from 'zod';

export const cvSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  education: z.string().optional(),
});

export type CvFormValues = z.infer<typeof cvSchema>;
