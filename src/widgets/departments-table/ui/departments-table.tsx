import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

import { DepartmentsTableRow } from './departments-table-row';

import { departmentsTableColumns } from '../model/columns';

import type { DepartmentsTableRowModel } from '../model/departments-table-row-model';

import type { Department } from '@/entities/department';

import type { SortState } from '@/shared/model/sort';
import type { DepartmentsSortField } from '@/widgets/departments-list';

interface DepartmentsTableProps {
  rows: DepartmentsTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<DepartmentsSortField>;
  onSortChange(field: DepartmentsSortField): void;

  onEdit(department: Department): void;
  onDelete?(departmentId: string, departmentName: string): void;
}

export function DepartmentsTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: DepartmentsTableProps) {
  return (
    <DataTable
      colGroup={
        <colgroup>
          <col />
          <col className="w-12" />
        </colgroup>
      }
    >
      <DataTableHeader columns={departmentsTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={departmentsTableColumns.length}
        loadingText="Loading..."
        emptyText="No departments found"
        errorText="Failed to load departments"
      >
        {rows.map((row) => (
          <DepartmentsTableRow
            key={row.department.id}
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </DataTableState>
    </DataTable>
  );
}
