'use client';

import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client/react';

const Cv = graphql(`
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

export function useCv(cvId: string) {
  const { loading, error, data } = useQuery(Cv, { variables: { cvId } });
  return { cv: data?.cv ?? null, loading, error };
}
