import type { UserCvsSortField } from '@/widgets/user-cvs-list';

export interface UserCvsTableColumn {
  key: 'name' | 'description' | 'actions';

  label: string;

  sortable?: UserCvsSortField;

  className?: string;
}

export const userCvsTableColumns: readonly UserCvsTableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: 'name',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
