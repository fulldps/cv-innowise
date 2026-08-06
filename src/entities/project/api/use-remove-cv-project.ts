'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const RemoveCvProject = graphql(`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      projects {
        id
        name
      }
    }
  }
`);

export function useRemoveCvProject() {
  const removedProject = useMutation(RemoveCvProject, {
    refetchQueries: ['Cv'],
    awaitRefetchQueries: true,
  });
  return removedProject;
}
