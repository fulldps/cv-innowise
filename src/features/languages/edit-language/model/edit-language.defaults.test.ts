import type { Language } from '@/entities/language';

import { getEditLanguageDefaultValues } from './edit-language.defaults';

describe('getEditLanguageDefaultValues', () => {
  it('maps the language fields into the form shape', () => {
    expect(
      getEditLanguageDefaultValues({
        name: 'German',
        native_name: 'Deutsch',
        iso2: 'de',
      } as unknown as Language),
    ).toEqual({ name: 'German', nativeName: 'Deutsch', iso2: 'de' });
  });

  it('falls back to empty strings when fields are missing', () => {
    expect(getEditLanguageDefaultValues({} as unknown as Language)).toEqual({
      name: '',
      nativeName: '',
      iso2: '',
    });
  });
});
