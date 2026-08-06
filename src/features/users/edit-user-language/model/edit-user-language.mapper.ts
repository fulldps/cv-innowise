import type { EditingUserLanguage } from './edit-user-language.types';
import type { UpdateProfileLanguageInput } from '@/entities/language';

import type { EditUserLanguageFormValues } from './edit-user-language.schema';

export function mapUpdateUserLanguageInput(
  values: EditUserLanguageFormValues,
  editingUserLanguage: EditingUserLanguage,
  userId: string,
): UpdateProfileLanguageInput {
  return {
    userId,
    name: editingUserLanguage.name,
    proficiency: values.proficiency,
  };
}
