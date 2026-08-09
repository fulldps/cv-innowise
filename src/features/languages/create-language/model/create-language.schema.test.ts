import { createLanguageSchema } from './create-language.schema';

describe('createLanguageSchema', () => {
  it('accepts a valid language', () => {
    expect(
      createLanguageSchema.safeParse({ name: 'English', nativeName: '', iso2: 'en' }).success,
    ).toBe(true);
  });

  it('rejects an iso2 that is not exactly 2 characters', () => {
    expect(
      createLanguageSchema.safeParse({ name: 'English', nativeName: '', iso2: 'eng' }).success,
    ).toBe(false);
  });

  it('rejects a blank name', () => {
    expect(
      createLanguageSchema.safeParse({ name: '', nativeName: '', iso2: 'en' }).success,
    ).toBe(false);
  });
});
