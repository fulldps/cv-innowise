import { graphql } from '@/shared/api/graphql';

export const POSITIONS_QUERY = graphql(`
  query Positions {
    positions {
      id
      name
    }
  }
`);
