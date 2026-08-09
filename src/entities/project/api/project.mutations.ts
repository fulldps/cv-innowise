import { graphql } from '@/shared/api/graphql';

export const CREATE_PROJECT_MUTATION = graphql(`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
      id
      name
    }
  }
`);

export const UPDATE_PROJECT_MUTATION = graphql(`
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      id
      name
    }
  }
`);

export const DELETE_PROJECT_MUTATION = graphql(`
  mutation DeleteProject($project: DeleteProjectInput!) {
    deleteProject(project: $project) {
      affected
    }
  }
`);
