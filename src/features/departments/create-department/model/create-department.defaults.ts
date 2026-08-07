import type { CreateDepartmentFormValues } from './create-department.schema';

export function getCreateDepartmentDefaultValues(): CreateDepartmentFormValues {
  return {
    name: '',
  };
}
