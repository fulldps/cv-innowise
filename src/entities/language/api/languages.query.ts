import { graphql } from '@/shared/api/graphql';

export const LANGUAGES_QUERY = graphql(`
  query Languages {
    languages {
      id
      name
    }
  }
`);
