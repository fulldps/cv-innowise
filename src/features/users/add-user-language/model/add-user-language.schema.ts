import { z } from 'zod';

import { PROFICIENCIES } from '@/entities/language';

export const addUserLanguageSchema = z.object({
  languageId: z.string().min(1, 'Language is required'),

  proficiency: z.enum(PROFICIENCIES),
});

export type AddUserLanguageFormValues = z.infer<typeof addUserLanguageSchema>;
