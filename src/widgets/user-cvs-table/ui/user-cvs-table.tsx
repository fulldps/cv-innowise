import { DataTable } from '@/shared/ui/data-table';
import { DataTableHeader } from '@/shared/ui/data-table/data-table-header';
import { DataTableState } from '@/shared/ui/data-table/data-table-state';

import { UserCvsTableRow } from './user-cvs-table-row';

import { userCvsTableColumns } from '../model/columns';

import type { UserCv } from '@/entities/cv/model/types';
import type { UserCvsTableRowModel } from '../model/user-cvs-table-row-model';

import type { SortState } from '@/shared/model/sort';
import type { UserCvsSortField } from '@/widgets/user-cvs-list';

interface UserCvsTableProps {
  rows: UserCvsTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<UserCvsSortField>;
  onSortChange(field: UserCvsSortField): void;

  onEdit(cv: UserCv): void;
  onDelete?(cvId: string, cvName: string): void;
}

export function UserCvsTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: UserCvsTableProps) {
  return (
    <DataTable
      colGroup={
        <colgroup>
          <col className="w-120" />
          <col />
          <col className="w-12" />
        </colgroup>
      }
    >
      <DataTableHeader columns={userCvsTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={userCvsTableColumns.length}
        loadingText="Loading..."
        emptyText="No CVs found."
        errorText="Failed to load CVs."
      >
        {rows.map((row) => (
          <UserCvsTableRow key={row.cv.id} row={row} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </DataTableState>
    </DataTable>
  );
}
