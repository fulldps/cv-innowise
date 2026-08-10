import { mapCreateLanguageInput } from './create-language.mapper';

describe('mapCreateLanguageInput', () => {
  it('maps fields and keeps a provided native name', () => {
    expect(mapCreateLanguageInput({ name: 'German', nativeName: 'Deutsch', iso2: 'de' })).toEqual({
      name: 'German',
      native_name: 'Deutsch',
      iso2: 'de',
    });
  });

  it('sends native_name as undefined when empty', () => {
    expect(mapCreateLanguageInput({ name: 'English', nativeName: '', iso2: 'en' })).toEqual({
      name: 'English',
      native_name: undefined,
      iso2: 'en',
    });
  });
});
