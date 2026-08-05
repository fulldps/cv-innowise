import type { EditingLanguage } from './edit-language.types';

import type { EditLanguageFormValues } from './edit-language.schema';

export function getEditLanguageDefaultValues(
  editingLanguage: EditingLanguage,
): EditLanguageFormValues {
  return {
    languageId: editingLanguage.name,
    proficiency: editingLanguage.proficiency,
  };
}
