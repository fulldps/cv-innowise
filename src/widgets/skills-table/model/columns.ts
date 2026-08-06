import type { SkillsSortField } from '@/widgets/skills-list';

export interface SkillsTableColumn {
  key: 'name' | 'type' | 'category' | 'actions';

  label: string;

  sortable?: SkillsSortField;

  className?: string;
}

export const skillsTableColumns: readonly SkillsTableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: 'name',
  },
  {
    key: 'type',
    label: 'Type',
    sortable: 'type',
  },
  {
    key: 'category',
    label: 'Category',
    sortable: 'category',
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
