import type { DataTableColumn } from '@/shared/ui/data-table';
import type { ProjectsSortField } from '@/widgets/projects-list';

export const projectsTableColumns: readonly DataTableColumn<ProjectsSortField>[] = [
  { key: 'name', label: 'Name', sortable: 'name', className: 'w-[30%] max-lg:w-[52%]' },
  { key: 'domain', label: 'Domain', className: 'w-[22%] max-lg:w-[38%]' },
  { key: 'start_date', label: 'Start Date', className: 'w-[18%] max-lg:hidden' },
  { key: 'end_date', label: 'End Date', className: 'w-[18%] max-lg:hidden' },
  { key: 'actions', label: '', className: 'w-12' },
];
