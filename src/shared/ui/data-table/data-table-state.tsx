import { EmptyState, ErrorState } from '@/shared/ui/states';
import { TableBody, TableCell, TableRow } from '@/shared/ui/table';

interface DataTableStateProps {
  loading: boolean;
  error: Error | null;

  isEmpty: boolean;

  columnsCount: number;

  children: React.ReactNode;

  loadingText?: string;
  emptyText?: string;
  errorText?: string;
}

export function DataTableState({
  loading,
  error,
  isEmpty,
  columnsCount,
  children,
  loadingText = 'Loading...',
  emptyText = 'No data found',
  errorText = 'Failed to load data',
}: DataTableStateProps) {
  return (
    <TableBody>
      {loading ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnsCount} className="p-0">
            <div className="flex min-h-105 items-center justify-center text-muted-foreground">
              {loadingText}
            </div>
          </TableCell>
        </TableRow>
      ) : !error ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnsCount} className="p-0">
            <ErrorState title={errorText} />
          </TableCell>
        </TableRow>
      ) : isEmpty ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnsCount} className="p-0">
            <EmptyState title={emptyText} />
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </TableBody>
  );
}
