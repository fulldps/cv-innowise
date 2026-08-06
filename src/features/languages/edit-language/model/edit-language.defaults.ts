import type { Language } from '@/entities/language';

import type { EditLanguageFormValues } from './edit-language.schema';

export function getEditLanguageDefaultValues(language: Language): EditLanguageFormValues {
  return {
    name: language.name ?? '',

    nativeName: language.native_name ?? '',

    iso2: language.iso2 ?? '',
  };
}
