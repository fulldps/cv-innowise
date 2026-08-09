import { addUserLanguageSchema } from './add-user-language.schema';

describe('addUserLanguageSchema', () => {
  it('accepts a language with a proficiency', () => {
    expect(addUserLanguageSchema.safeParse({ languageId: 'l1', proficiency: 'B2' }).success).toBe(
      true,
    );
  });

  it('rejects a missing language', () => {
    expect(addUserLanguageSchema.safeParse({ languageId: '', proficiency: 'B2' }).success).toBe(
      false,
    );
  });

  it('rejects an unknown proficiency', () => {
    expect(addUserLanguageSchema.safeParse({ languageId: 'l1', proficiency: 'Z9' }).success).toBe(
      false,
    );
  });
});
