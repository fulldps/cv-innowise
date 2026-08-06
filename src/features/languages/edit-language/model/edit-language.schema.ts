import { z } from 'zod';

export const editLanguageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  nativeName: z.string().trim(),

  iso2: z.string().trim().length(2, 'ISO2 must contain exactly 2 characters'),
});

export type EditLanguageFormValues = z.infer<typeof editLanguageSchema>;
