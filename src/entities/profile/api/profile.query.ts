import { graphql } from '@/shared/api/graphql';

export const PROFILE_QUERY = graphql(`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id

      skills {
        name
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`);
