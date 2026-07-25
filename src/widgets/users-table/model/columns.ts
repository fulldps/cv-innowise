import { UsersSortField } from "@/widgets/users-list/model/sort";

export interface UsersTableColumn {
  key: 'avatar' | 'first_name' | 'last_name' | 'email' | 'department' | 'position' | 'actions';

  label: string;

  className?: string;

  sortable?: UsersSortField;
}

export const userTableColumns: readonly UsersTableColumn[] = [
  {
    key: 'avatar',
    label: '',
  },
  {
    key: 'first_name',
    label: 'First Name',
  },
  {
    key: 'last_name',
    label: 'Last Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'department',
    label: 'Department',
    sortable: 'department',
  },
  {
    key: 'position',
    label: 'Position',
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
