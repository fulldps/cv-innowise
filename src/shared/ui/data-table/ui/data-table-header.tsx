import { ArrowUp } from 'lucide-react';

import type { DataTableColumn } from '../model/types';

import { cn } from '@/shared/lib/utils';
import { SortState } from '@/shared/model/sort';
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table';

interface DataTableHeaderProps<TSort extends string> {
  columns: readonly DataTableColumn<TSort>[];

  sort: SortState<TSort>;

  onSortChange(field: TSort): void;
}

export function DataTableHeader<TSort extends string>({
  columns,
  sort,
  onSortChange,
}: DataTableHeaderProps<TSort>) {
  return (
    <TableHeader>
      <TableRow className="h-11 border-border hover:bg-transparent">
        {columns.map((column) => (
          <TableHead key={column.key} className={cn('px-4 font-semibold', column.className)}>
            {column.sortable ? (
              <button
                type="button"
                onClick={() => onSortChange(column.sortable!)}
                className="flex items-center gap-1 transition-colors hover:text-foreground"
              >
                <span>{column.label}</span>

                {column.sortable === sort.field && (
                  <ArrowUp
                    className={cn(
                      'h-3.5 w-3.5 text-muted-foreground transition-transform',
                      sort.direction === 'desc' && 'rotate-180',
                    )}
                  />
                )}
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
