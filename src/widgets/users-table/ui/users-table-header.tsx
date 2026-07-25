import { ArrowUp } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import type { UsersSort, UsersSortField } from '@/widgets/users-list/model/sort';

import { userTableColumns } from '../model/columns';

interface UsersTableHeaderProps {
  sort: UsersSort;
  onSortChange(field: UsersSortField): void;
}

export function UsersTableHeader({ sort, onSortChange }: UsersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="h-11 border-border hover:bg-transparent">
        {userTableColumns.map((column) => (
          <TableHead key={column.key} className={cn('px-4 font-semibold', column.className)}>
            {column.sortable ? (
              <button
                type="button"
                aria-label={`Sort by ${column.label}`}
                onClick={() => onSortChange(column.sortable!)}
                className="flex items-center gap-1 transition-colors hover:text-foreground"
              >
                <span>{column.label}</span>

                <ArrowUp
                  className={cn(
                    'h-3.5 w-3.5 transition-transform text-muted-foreground',
                    sort.direction === 'desc' && 'rotate-180',
                  )}
                />
              </button>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
