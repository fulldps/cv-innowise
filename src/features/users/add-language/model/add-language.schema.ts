import { z } from 'zod';

import { PROFICIENCIES } from '@/entities/language';

export const addLanguageSchema = z.object({
  languageId: z.string().min(1, 'Language is required'),

  proficiency: z.enum(PROFICIENCIES),
});

export type AddLanguageFormValues = z.infer<typeof addLanguageSchema>;
