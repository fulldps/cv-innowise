import { useQuery } from '@apollo/client/react';

import { DEPARTMENTS_QUERY } from './department.queries';
import { POSITIONS_QUERY } from './position.queries';

export function useUserFormOptions() {
  const departmentsQuery = useQuery(DEPARTMENTS_QUERY);

  const positionsQuery = useQuery(POSITIONS_QUERY);

  return {
    departments: departmentsQuery.data?.departments ?? [],

    positions: positionsQuery.data?.positions ?? [],

    loading: departmentsQuery.loading || positionsQuery.loading,

    error: departmentsQuery.error ?? positionsQuery.error ?? null,
  };
}
