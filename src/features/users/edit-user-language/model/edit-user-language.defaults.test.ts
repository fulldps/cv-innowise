import type { EditingUserLanguage } from './edit-user-language.types';
import { getEditUserLanguageDefaultValues } from './edit-user-language.defaults';

describe('getEditUserLanguageDefaultValues', () => {
  it('uses the language name as id and keeps the proficiency', () => {
    const editing = { name: 'English', proficiency: 'C1' } as unknown as EditingUserLanguage;

    expect(getEditUserLanguageDefaultValues(editing)).toEqual({
      languageId: 'English',
      proficiency: 'C1',
    });
  });
});
