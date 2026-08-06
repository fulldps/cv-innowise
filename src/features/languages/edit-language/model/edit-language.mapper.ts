import type { UpdateLanguageInput } from '@/entities/language';

import type { EditLanguageFormValues } from './edit-language.schema';

export function mapUpdateLanguageInput(
  languageId: string,
  values: EditLanguageFormValues,
): UpdateLanguageInput {
  return {
    languageId,

    name: values.name,

    iso2: values.iso2,

    native_name: values.nativeName || null,
  };
}
