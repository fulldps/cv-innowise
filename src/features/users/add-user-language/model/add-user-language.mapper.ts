import type { AddProfileLanguageInput, Language } from '@/entities/language';

import type { AddUserLanguageFormValues } from './add-user-language.schema';

export function mapAddUserLanguageInput(
  values: AddUserLanguageFormValues,
  userLanguage: Language,
  userId: string,
): AddProfileLanguageInput {
  return {
    userId,
    name: userLanguage.name,
    proficiency: values.proficiency,
  };
}
