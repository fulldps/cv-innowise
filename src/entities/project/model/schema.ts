import z from 'zod';

export const projectSchema = z.object({
  name: z.string().optional(),
  domain: z.string().optional(),
  internal_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});
