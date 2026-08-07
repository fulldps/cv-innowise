import type { CreateDepartmentInput } from '@/entities/department';

import type { CreateDepartmentFormValues } from './create-department.schema';

export function mapCreateDepartmentInput(
  values: CreateDepartmentFormValues,
): CreateDepartmentInput {
  return {
    name: values.name,
  };
}