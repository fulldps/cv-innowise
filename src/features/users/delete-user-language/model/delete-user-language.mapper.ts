import type { DeleteProfileLanguageInput } from '@/shared/api/graphql/graphql';

export function mapDeleteUserLanguageInput(
  userId: string,
  languageNames: string[],
): DeleteProfileLanguageInput {
  return {
    userId,
    name: languageNames,
  };
}
