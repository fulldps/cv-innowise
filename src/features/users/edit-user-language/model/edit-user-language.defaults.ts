import type { EditingUserLanguage } from './edit-user-language.types';

import type { EditUserLanguageFormValues } from './edit-user-language.schema';

export function getEditUserLanguageDefaultValues(
  editingUserLanguage: EditingUserLanguage,
): EditUserLanguageFormValues {
  return {
    languageId: editingUserLanguage.name,
    proficiency: editingUserLanguage.proficiency,
  };
}
