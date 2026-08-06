'use client';

import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client/react';

const ProjectsDocument = graphql(`
  query Projects {
    projects {
      id
      created_at
      name
      internal_name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`);

export function useProjectsList() {
  const { loading, error, data } = useQuery(ProjectsDocument);
  return { projects: data?.projects ?? [], loading, error };
}
