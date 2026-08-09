import type { CreateProjectFormValues } from './create-project.schema';

export function getCreateProjectDefaultValues(): CreateProjectFormValues {
  return {
    name: '',
    domain: '',
    start_date: '',
    end_date: '',
    description: '',
    environment: [],
  };
}
