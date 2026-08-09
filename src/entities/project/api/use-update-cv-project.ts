'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const UpdateCvProject = graphql(`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        roles
        responsibilities
      }
    }
  }
`);

export function useUpdateCvProject() {
  return useMutation(UpdateCvProject, {
    refetchQueries: ['Cv'],
    awaitRefetchQueries: true,
  });
}
