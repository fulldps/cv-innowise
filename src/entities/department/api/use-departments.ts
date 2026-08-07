import { useQuery } from '@apollo/client/react';

import { DEPARTMENTS_QUERY } from './departments.query';

export function useDepartments() {
  return useQuery(DEPARTMENTS_QUERY);
}
