import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/actions-menu';

import type { UserCv } from '@/entities/cv/model/types';
import type { UserCvsTableRowModel } from '../model/user-cvs-table-row-model';

interface UserCvsTableRowProps {
  row: UserCvsTableRowModel;

  onEdit(cv: UserCv): void;
  onDelete?(cvId: string, cvName: string): void;
}

export function UserCvsTableRow({ row, onEdit, onDelete }: UserCvsTableRowProps) {
  const { cv } = row;

  const cellClassName = 'px-4 text-[15px] text-primary whitespace-normal break-words';

  return (
    <TableRow className="h-15 border-border hover:bg-accent/40">
      <TableCell className={cellClassName}>{cv.name}</TableCell>

      <TableCell className={cellClassName}>{cv.description}</TableCell>

      <TableCell className="pr-4">
        <div className="flex justify-end">
          {row.canEdit && (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(cv)}
              onDelete={() => onDelete?.(cv.id, cv.name)}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
