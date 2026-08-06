export const LANGUAGES_SORT_FIELDS = {
  name: 'name',
} as const;

export type LanguagesSortField = (typeof LANGUAGES_SORT_FIELDS)[keyof typeof LANGUAGES_SORT_FIELDS];
