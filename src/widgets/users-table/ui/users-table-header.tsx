import { cn } from '@/shared/lib/utils';
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { userTableColumns } from '../model/columns';

export function UsersTableHeader() {
  return (
    <TableHeader>
      <TableRow className="h-11 border-border hover:bg-transparent">
        {userTableColumns.map((column) => (
          <TableHead
            key={column.key}
            className={cn('px-4 font-semibold ', column.className)}
          >
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
