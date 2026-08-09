import type {
  ProjectsQuery,
  CreateProjectInput,
  UpdateProjectInput,
  DeleteProjectInput,
} from '@/shared/api/graphql/graphql';

export type Project = ProjectsQuery['projects'][number];

export type { CreateProjectInput, UpdateProjectInput, DeleteProjectInput };
