import type { CreateProjectInput } from '@/entities/project';

import type { CreateProjectFormValues } from './create-project.schema';

export function mapCreateProjectInput(values: CreateProjectFormValues): CreateProjectInput {
  return {
    name: values.name,
    domain: values.domain,
    start_date: values.start_date,
    end_date: values.end_date || null,
    description: values.description,
    environment: values.environment,
  };
}
