import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/actions-menu';

import type { Skill } from '@/entities/skill';
import type { SkillsTableRowModel } from '../model/skills-table-row-model';

interface SkillsTableRowProps {
  row: SkillsTableRowModel;

  onEdit(skill: Skill): void;
  onDelete?(skillId: string, skillName: string): void;
}

export function SkillsTableRow({ row, onEdit, onDelete }: SkillsTableRowProps) {
  const { skill } = row;

  const cellClassName = 'px-4 text-[15px] text-primary whitespace-normal break-words';

  return (
    <TableRow className="h-15 border-border hover:bg-accent/40">
      <TableCell className={cellClassName}>{skill.name}</TableCell>

      <TableCell className={cellClassName}>{skill.category_parent_name ?? '—'}</TableCell>

      <TableCell className={cellClassName}>{skill.category?.name ?? '—'}</TableCell>

      <TableCell className="pr-4">
        <div className="flex justify-end">
          {row.canEdit && (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(skill)}
              onDelete={() => onDelete?.(skill.id, skill.name)}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
