import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';

import type { UsersSort, UsersSortField } from '@/widgets/users-list/model/sort';

import type { UsersTableRowModel } from '../model/users-table-row-model';

import { UsersTableHeader } from './users-table-header';
import { UsersTableRow } from './users-table-row';
import { userTableColumns } from '../model/columns';

interface UsersTableProps {
  rows: UsersTableRowModel[];
  loading: boolean;
  error: Error | null;

  sort: UsersSort;
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
  const columnsCount = userTableColumns.length;
  return (
    <section className="overflow-hidden pr-5">
      <Table className="w-full table-fixed">
        <colgroup>
          <col className="w-17" />
          <col className="w-45" />
          <col className="w-45" />
          <col className="w-90" />
          <col className="w-40" />
          <col />
          <col className="w-12" />
        </colgroup>
        <UsersTableHeader sort={sort} onSortChange={onSortChange} />

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columnsCount} className="h-40 text-center text-muted-foreground">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={columnsCount} className="h-40 text-center text-destructive">
                Failed to load users.
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnsCount} className="h-40 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <UsersTableRow
                key={row.user.id}
                row={row}
                onOpenProfile={onOpenProfile}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
