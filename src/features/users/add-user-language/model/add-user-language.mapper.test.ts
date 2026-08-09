import type { Language } from '@/entities/language';

import { mapAddUserLanguageInput } from './add-user-language.mapper';
import type { AddUserLanguageFormValues } from './add-user-language.schema';

describe('mapAddUserLanguageInput', () => {
  it('maps the selected language and proficiency into AddProfileLanguageInput', () => {
    const values: AddUserLanguageFormValues = { languageId: 'l1', proficiency: 'B2' };
    const language = { id: 'l1', name: 'English' } as unknown as Language;

    expect(mapAddUserLanguageInput(values, language, 'u1')).toEqual({
      userId: 'u1',
      name: 'English',
      proficiency: 'B2',
    });
  });
});
