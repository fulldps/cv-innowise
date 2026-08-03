import { graphql } from '@/shared/api/graphql';

export const DEPARTMENTS_QUERY = graphql(`
  query Departments {
    departments {
      id
      name
    }
  }
`);