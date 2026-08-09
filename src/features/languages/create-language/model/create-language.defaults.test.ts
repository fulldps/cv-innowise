import { getCreateLanguageDefaultValues } from './create-language.defaults';

describe('getCreateLanguageDefaultValues', () => {
  it('returns empty language fields', () => {
    expect(getCreateLanguageDefaultValues()).toEqual({ name: '', nativeName: '', iso2: '' });
  });
});
