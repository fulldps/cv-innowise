import type { Department } from '@/entities/department';

import type { EditDepartmentFormValues } from './edit-department.schema';

export function getEditDepartmentDefaultValues(department: Department): EditDepartmentFormValues {
  return {
    name: department.name ?? '',
  };
}
