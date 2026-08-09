import { getAddUserLanguageDefaultValues } from './add-user-language.defaults';

describe('getAddUserLanguageDefaultValues', () => {
  it('defaults to no language and A1 proficiency', () => {
    expect(getAddUserLanguageDefaultValues()).toEqual({ languageId: '', proficiency: 'A1' });
  });
});
