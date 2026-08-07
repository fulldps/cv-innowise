import type { Department } from '@/entities/department';

export interface DepartmentsTableRowModel {
  department: Department;

  canEdit: boolean;
  canDelete: boolean;
}