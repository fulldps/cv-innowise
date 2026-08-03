import { USERS_SORT_FIELDS, UsersSortField } from '@/widgets/users-list';

export interface UsersTableColumn {
  key: 'avatar' | 'first_name' | 'last_name' | 'email' | 'department' | 'position' | 'actions';

  label: string;

  sortable?: UsersSortField;

  className?: string;
}

export const userTableColumns: readonly UsersTableColumn[] = [
  {
    key: 'avatar',
    label: '',
  },
  {
    key: 'first_name',
    label: 'First Name',
    sortable: USERS_SORT_FIELDS.firstName,
  },
  {
    key: 'last_name',
    label: 'Last Name',
    sortable: USERS_SORT_FIELDS.lastName,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: USERS_SORT_FIELDS.email,
  },
  {
    key: 'department',
    label: 'Department',
    sortable: USERS_SORT_FIELDS.department,
  },
  {
    key: 'position',
    label: 'Position',
    sortable: USERS_SORT_FIELDS.position,
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
