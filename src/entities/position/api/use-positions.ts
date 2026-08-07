import { useQuery } from '@apollo/client/react';

import { POSITIONS_QUERY } from './positions.query';

export function usePositions() {
  return useQuery(POSITIONS_QUERY);
}
