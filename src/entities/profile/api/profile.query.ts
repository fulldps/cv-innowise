import { graphql } from '@/shared/api/graphql';

export const PROFILE_QUERY = graphql(`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id

      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`);
