import { z } from 'zod';

import { PROFICIENCIES } from '@/entities/language';

export const editUserLanguageSchema = z.object({
  languageId: z.string(),

  proficiency: z.enum(PROFICIENCIES),
});

export type EditUserLanguageFormValues = z.infer<typeof editUserLanguageSchema>;
