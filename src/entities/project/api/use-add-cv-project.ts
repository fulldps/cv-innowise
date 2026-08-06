'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const AddCvProject = graphql(`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
      }
    }
  }
`);

export function useAddCvProject() {
  const addedProject = useMutation(AddCvProject, {
    refetchQueries: ['Cv'],
    awaitRefetchQueries: true,
  });
  return addedProject;
}
