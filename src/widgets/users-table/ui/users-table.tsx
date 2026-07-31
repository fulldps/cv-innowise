import { Table, TableBody } from '@/shared/ui/table';

import type { UsersSort, UsersSortField } from '@/widgets/users-list/model/sort';

import type { UsersTableRowModel } from '../model/users-table-row-model';

import { UsersTableHeader } from './users-table-header';
import { UsersTableRow } from './users-table-row';

interface UsersTableProps {
  rows: UsersTableRowModel[];

  sort: UsersSort;
  onSortChange(field: UsersSortField): void;

  onEdit(userId: string): void;
  onDelete?(userId: string, userFullName: string): void;
}

export function UsersTable({ rows, sort, onSortChange, onEdit, onDelete }: UsersTableProps) {
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
          {rows.map((row) => (
            <UsersTableRow key={row.user.id} row={row} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
