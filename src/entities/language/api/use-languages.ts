import { useQuery } from '@apollo/client/react';

import { LANGUAGES_QUERY } from './languages.query';

export function useLanguages() {
  return useQuery(LANGUAGES_QUERY);
}
