import type { AddUserLanguageFormValues } from './add-user-language.schema';

export function getAddUserLanguageDefaultValues(): AddUserLanguageFormValues {
  return {
    languageId: '',
    proficiency: 'A1',
  };
}
