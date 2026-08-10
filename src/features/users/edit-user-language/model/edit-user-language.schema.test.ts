import { editUserLanguageSchema } from './edit-user-language.schema';

describe('editUserLanguageSchema', () => {
  it('accepts a proficiency level', () => {
    expect(
      editUserLanguageSchema.safeParse({ languageId: 'English', proficiency: 'C1' }).success,
    ).toBe(true);
  });

  it('rejects an unknown proficiency', () => {
    expect(
      editUserLanguageSchema.safeParse({ languageId: 'English', proficiency: 'Z9' }).success,
    ).toBe(false);
  });
});
