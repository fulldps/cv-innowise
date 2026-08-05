import { z } from 'zod';

import { PROFICIENCIES } from '@/entities/language';

export const editLanguageSchema = z.object({
  languageId: z.string(),

  proficiency: z.enum(PROFICIENCIES),
});

export type EditLanguageFormValues = z.infer<typeof editLanguageSchema>;
