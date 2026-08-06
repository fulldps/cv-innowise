import { CreateLanguageFormValues } from './create-language.schema';

export function getCreateLanguageDefaultValues(): CreateLanguageFormValues {
  return {
    name: '',
    nativeName: '',
    iso2: '',
  };
}
