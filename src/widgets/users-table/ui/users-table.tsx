import { Table, TableBody } from '@/shared/ui/table';

import type { UsersSort, UsersSortField } from '@/widgets/users-list/model/sort';

import type { UsersTableRowModel } from '../model/users-table-row';

import { UsersTableHeader } from './users-table-header';
import { UsersTableRow } from './users-table-row';

interface UsersTableProps {
  rows: UsersTableRowModel[];

  sort: UsersSort;
  onSortChange(field: UsersSortField): void;
}

export function UsersTable({ rows, sort, onSortChange }: UsersTableProps) {
  return (
    <section className="overflow-hidden pr-5">
      <Table>
        <UsersTableHeader sort={sort} onSortChange={onSortChange} />

        <TableBody>
          {rows.map((row) => (
            <UsersTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
