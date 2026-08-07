import type { UpdateDepartmentInput } from '@/entities/department';

import type { EditDepartmentFormValues } from './edit-department.schema';

export function mapUpdateDepartmentInput(
  departmentId: string,
  values: EditDepartmentFormValues,
): UpdateDepartmentInput {
  return {
    departmentId,

    name: values.name,
  };
}
