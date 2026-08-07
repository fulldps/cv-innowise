import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/actions-menu';

import type { Language } from '@/entities/language';
import type { LanguagesTableRowModel } from '../model/languages-table-row-model';

interface LanguagesTableRowProps {
  row: LanguagesTableRowModel;

  onEdit(language: Language): void;
  onDelete?(languageId: string, languageName: string): void;
}

export function LanguagesTableRow({ row, onEdit, onDelete }: LanguagesTableRowProps) {
  const { language } = row;

  const cellClassName = 'px-4 text-[15px] text-primary whitespace-normal break-words';

  return (
    <TableRow className="h-15 border-border hover:bg-accent/40">
      <TableCell className={cellClassName}>{language.name}</TableCell>

      <TableCell className={cellClassName}>{language.native_name ?? '—'}</TableCell>

      <TableCell className={cellClassName}>{language.iso2}</TableCell>

      <TableCell className="pr-4">
        <div className="flex justify-end">
          {row.canEdit && (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(language)}
              onDelete={() => onDelete?.(language.id, language.name)}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
