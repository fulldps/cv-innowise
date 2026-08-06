import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client/react';

const Project = graphql(`
  query Project($projectId: ID!) {
    project(projectId: $projectId) {
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

export function useProject(projectId: string) {
  const { loading, error, data } = useQuery(Project, { variables: { projectId } });
  return { project: data?.project ?? null, loading, error };
}
