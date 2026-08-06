import type { SortState } from '@/shared/model/sort';
import { UsersSortField } from '@/widgets/users-list';

import type { UsersTableRowModel } from '../model/users-table-row-model';

import { UsersTableRow } from './users-table-row';
import { userTableColumns } from '../model/columns';

import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

interface UsersTableProps {
  rows: UsersTableRowModel[];
  loading: boolean;
  error: Error | null;

  sort: SortState<UsersSortField>;
  onSortChange(field: UsersSortField): void;

  onOpenProfile(userId: string): void;

  onEdit(userId: string): void;
  onDelete?(userId: string, userFullName: string): void;
}

export function UsersTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onOpenProfile,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <section className="overflow-hidden pr-5">
      <DataTable
        colGroup={
          <colgroup>
            <col className="w-17" />
            <col className="w-45" />
            <col className="w-45" />
            <col className="w-90" />
            <col className="w-40" />
            <col />
            <col className="w-12" />
          </colgroup>
        }
      >
        <DataTableHeader columns={userTableColumns} sort={sort} onSortChange={onSortChange} />

        <DataTableState
          loading={loading}
          error={error}
          isEmpty={rows.length === 0}
          columnsCount={userTableColumns.length}
          loadingText="Loading..."
          emptyText="No users found."
          errorText="Failed to load users."
        >
          {rows.map((row) => (
            <UsersTableRow
              key={row.user.id}
              row={row}
              onOpenProfile={onOpenProfile}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </DataTableState>
      </DataTable>
    </section>
  );
}
