import type { CreateLanguageInput } from '@/entities/language';

import type { CreateLanguageFormValues } from './create-language.schema';

export function mapCreateLanguageInput(values: CreateLanguageFormValues): CreateLanguageInput {
  return {
    name: values.name,
    native_name: values.nativeName || undefined,
    iso2: values.iso2,
  };
}
