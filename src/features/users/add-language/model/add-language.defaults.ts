import type { AddLanguageFormValues } from './add-language.schema';

export function getAddLanguageDefaultValues(): AddLanguageFormValues {
  return {
    languageId: '',
    proficiency: 'A1',
  };
}
