export interface UsersTableColumn {
  key: 'avatar' | 'first_name' | 'last_name' | 'email' | 'department' | 'position' | 'actions';

  label: string;

  className?: string;

  sortable?: boolean;
}

export const userTableColumns: readonly UsersTableColumn[] = [
  {
    key: 'avatar',
    label: '',
  },
  {
    key: 'first_name',
    label: 'First Name',
    sortable: true,
  },
  {
    key: 'last_name',
    label: 'Last Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'department',
    label: 'Department',
    sortable: true,
  },
  {
    key: 'position',
    label: 'Position',
    sortable: true,
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
