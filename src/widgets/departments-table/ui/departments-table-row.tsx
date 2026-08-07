import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/actions-menu';

import type { Department } from '@/entities/department';
import type { DepartmentsTableRowModel } from '../model/departments-table-row-model';

interface DepartmentsTableRowProps {
  row: DepartmentsTableRowModel;

  onEdit(department: Department): void;
  onDelete?(departmentId: string, departmentName: string): void;
}

export function DepartmentsTableRow({ row, onEdit, onDelete }: DepartmentsTableRowProps) {
  const { department } = row;

  const cellClassName = 'px-4 text-[15px] text-primary';

  return (
    <TableRow className="h-15 border-border hover:bg-accent/40">
      <TableCell className={cellClassName}>{department.name}</TableCell>

      <TableCell className="pr-4">
        <div className="flex justify-end">
          {row.canEdit && (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(department)}
              onDelete={() => onDelete?.(department.id, department.name)}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
