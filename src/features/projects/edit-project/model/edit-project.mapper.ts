import type { UpdateProjectInput } from '@/entities/project';

import type { EditProjectFormValues } from './edit-project.schema';

export function mapUpdateProjectInput(
  projectId: string,
  values: EditProjectFormValues,
): UpdateProjectInput {
  return {
    projectId,
    name: values.name,
    domain: values.domain,
    start_date: values.start_date,
    end_date: values.end_date || null,
    description: values.description,
    environment: values.environment,
  };
}
