import type { EditingLanguage } from './edit-language.types';
import type { UpdateProfileLanguageInput } from '@/entities/language';

import type { EditLanguageFormValues } from './edit-language.schema';

export function mapUpdateLanguageInput(
  values: EditLanguageFormValues,
  editingLanguage: EditingLanguage,
  userId: string,
): UpdateProfileLanguageInput {
  return {
    userId,
    name: editingLanguage.name,
    proficiency: values.proficiency,
  };
}
