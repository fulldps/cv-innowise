import type { DeleteProfileLanguageInput } from '@/shared/api/graphql/graphql';

export function mapDeleteLanguageInput(
  userId: string,
  languageNames: string[],
): DeleteProfileLanguageInput {
  return {
    userId,
    name: languageNames,
  };
}
