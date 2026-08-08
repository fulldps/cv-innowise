import { cn } from '@/shared/lib/utils';
import { Table } from '@/shared/ui/table';

interface DataTableProps {
  colGroup?: React.ReactNode;

  children: React.ReactNode;

  className?: string;
}

export function DataTable({ colGroup, children, className }: DataTableProps) {
  return (
    <section className="overflow-x-auto overflow-y-hidden pr-2">
      <Table className={cn('w-full table-fixed', className)}>
        {colGroup}

        {children}
      </Table>
    </section>
  );
}
