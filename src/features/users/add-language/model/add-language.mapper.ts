import type { AddProfileLanguageInput, Language } from '@/entities/language';

import type { AddLanguageFormValues } from './add-language.schema';

export function mapAddLanguageInput(
  values: AddLanguageFormValues,
  language: Language,
  userId: string,
): AddProfileLanguageInput {
  return {
    userId,
    name: language.name,
    proficiency: values.proficiency,
  };
}
