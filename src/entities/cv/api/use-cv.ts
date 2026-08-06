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
    }
  }
`);

export function useCv(cvId: string) {
  const { loading, error, data } = useQuery(Cv, { variables: { cvId } });
  return { cv: data?.cv ?? null, loading, error };
}
