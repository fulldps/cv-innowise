import type { DepartmentsQuery } from '@/shared/api/graphql/graphql';

export type Department = DepartmentsQuery['departments'][number];
export type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DeleteDepartmentInput,
} from '@/shared/api/graphql/graphql';
