import type { PositionsSortField } from '@/widgets/positions-list';

export interface PositionsTableColumn {
  key: 'name' | 'actions';

  label: string;

  sortable?: PositionsSortField;

  className?: string;
}

export const positionsTableColumns: readonly PositionsTableColumn[] = [
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
