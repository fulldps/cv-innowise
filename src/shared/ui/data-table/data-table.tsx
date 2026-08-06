import { Table } from '@/shared/ui/table';

interface DataTableProps {
  colGroup?: React.ReactNode;

  children: React.ReactNode;

  className?: string;
}

export function DataTable({ colGroup, children, className }: DataTableProps) {
  return (
    <section className="overflow-hidden pr-5">
      <Table className={className ?? 'w-full table-fixed'}>
        {colGroup}

        {children}
      </Table>
    </section>
  );
}
