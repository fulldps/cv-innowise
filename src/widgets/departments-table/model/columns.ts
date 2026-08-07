import type { DepartmentsSortField } from '@/widgets/departments-list';

export interface DepartmentsTableColumn {
  key: 'name' | 'actions';

  label: string;

  sortable?: DepartmentsSortField;

  className?: string;
}

export const departmentsTableColumns: readonly DepartmentsTableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: 'name',
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
