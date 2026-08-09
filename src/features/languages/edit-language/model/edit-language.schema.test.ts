import { editLanguageSchema } from './edit-language.schema';

describe('editLanguageSchema', () => {
  it('accepts a valid language', () => {
    expect(
      editLanguageSchema.safeParse({ name: 'English', nativeName: '', iso2: 'en' }).success,
    ).toBe(true);
  });

  it('rejects an iso2 that is not 2 characters', () => {
    expect(
      editLanguageSchema.safeParse({ name: 'English', nativeName: '', iso2: 'eng' }).success,
    ).toBe(false);
  });
});
