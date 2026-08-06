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
  emptyText = 'No data found.',
  errorText = 'Failed to load data.',
}: DataTableStateProps) {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-40 text-center text-muted-foreground">
            {loadingText}
          </TableCell>
        </TableRow>
      ) : error ? (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-40 text-center text-destructive">
            {errorText}
          </TableCell>
        </TableRow>
      ) : isEmpty ? (
        <TableRow>
          <TableCell colSpan={columnsCount} className="h-40 text-center text-muted-foreground">
            {emptyText}
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </TableBody>
  );
}
