import type { Project } from '@/entities/project';

import type { EditProjectFormValues } from './edit-project.schema';

const toDateInput = (value?: string | null) => {
  if (!value) return '';

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
};

export function getEditProjectDefaultValues(project: Project): EditProjectFormValues {
  return {
    name: project.name,
    domain: project.domain,
    start_date: toDateInput(project.start_date),
    end_date: toDateInput(project.end_date),
    description: project.description,
    environment: project.environment,
  };
}
