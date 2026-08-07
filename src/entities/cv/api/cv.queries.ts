import { graphql } from '@/shared/api/graphql';

export const CV_QUERY = graphql(`
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      description
      education
      user {
        id
        email
        position_name
        profile {
          full_name
        }
      }
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        project {
          id
        }
      }
      languages {
        name
        proficiency
      }
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`);
