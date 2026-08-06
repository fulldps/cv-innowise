import type { LanguagesQuery } from '@/shared/api/graphql/graphql';

export type Language = NonNullable<LanguagesQuery['languages'][number]>;
export type {
  AddProfileLanguageInput,
  UpdateProfileLanguageInput,
  DeleteProfileLanguageInput,
  CreateLanguageInput,
  UpdateLanguageInput,
  DeleteLanguageInput,
} from '@/shared/api/graphql/graphql';
