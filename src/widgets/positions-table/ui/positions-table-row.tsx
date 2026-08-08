import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/ui/actions-menu';

import type { Position } from '@/entities/position';
import type { PositionsTableRowModel } from '../model/positions-table-row-model';

interface PositionsTableRowProps {
  row: PositionsTableRowModel;

  onEdit(position: Position): void;
  onDelete?(positionId: string, positionName: string): void;
}

export function PositionsTableRow({ row, onEdit, onDelete }: PositionsTableRowProps) {
  const { position } = row;

  const cellClassName = 'px-4 text-[15px] text-primary whitespace-normal break-words';

  return (
    <TableRow className="h-15 border-border hover:bg-accent/40">
      <TableCell className={cellClassName}>{position.name}</TableCell>

      <TableCell className="pr-4">
        <div className="flex justify-end">
          {row.canEdit && (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(position)}
              onDelete={() => onDelete?.(position.id, position.name)}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
