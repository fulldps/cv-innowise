import { mapUpdateLanguageInput } from './edit-language.mapper';

describe('mapUpdateLanguageInput', () => {
  it('maps id and fields', () => {
    expect(
      mapUpdateLanguageInput('l1', { name: 'German', nativeName: 'Deutsch', iso2: 'de' }),
    ).toEqual({ languageId: 'l1', name: 'German', iso2: 'de', native_name: 'Deutsch' });
  });

  it('sends native_name as null when empty', () => {
    expect(mapUpdateLanguageInput('l1', { name: 'English', nativeName: '', iso2: 'en' })).toEqual({
      languageId: 'l1',
      name: 'English',
      iso2: 'en',
      native_name: null,
    });
  });
});
