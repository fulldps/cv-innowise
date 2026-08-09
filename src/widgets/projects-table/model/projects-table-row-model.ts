import type { Project } from '@/entities/project';

export interface ProjectsTableRowModel {
  project: Project;

  canEdit: boolean;
  canDelete: boolean;
}
