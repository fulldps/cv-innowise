import { Table, TableBody } from '@/shared/ui/table';

import type { UsersTableRowModel } from '../model/users-table-row';

import { UsersTableHeader } from './users-table-header';
import { UsersTableRow } from './users-table-row';

interface UsersTableProps {
  rows: UsersTableRowModel[];
}

export function UsersTable({ rows }: UsersTableProps) {
  return (
    <section className="overflow-hidden pr-5">
      <Table>
        <UsersTableHeader />

        <TableBody>
          {rows.map((row) => (
            <UsersTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
