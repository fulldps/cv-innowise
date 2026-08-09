import { mapUpdateUserLanguageInput } from './edit-user-language.mapper';
import type { EditUserLanguageFormValues } from './edit-user-language.schema';
import type { EditingUserLanguage } from './edit-user-language.types';

describe('mapUpdateUserLanguageInput', () => {
  it('keeps the language identity and applies the new proficiency', () => {
    const values = { proficiency: 'C1' } as unknown as EditUserLanguageFormValues;
    const editing = { name: 'English', proficiency: 'B2' } as unknown as EditingUserLanguage;

    expect(mapUpdateUserLanguageInput(values, editing, 'u1')).toEqual({
      userId: 'u1',
      name: 'English',
      proficiency: 'C1',
    });
  });
});
