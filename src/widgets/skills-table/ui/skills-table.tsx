import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

import { skillsTableColumns } from '../model/columns';
import type { SkillsTableRowModel } from '../model/skills-table-row-model';

import type { SkillsSortField } from '@/widgets/skills-list';
import type { SortState } from '@/shared/model/sort';

import type { Skill } from '@/entities/skill';
import { SkillsTableRow } from './skills-table-row';

interface SkillsTableProps {
  rows: SkillsTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<SkillsSortField>;
  onSortChange(field: SkillsSortField): void;

  onEdit(skill: Skill): void;
  onDelete?(skillId: string, skillName: string): void;
}

export function SkillsTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: SkillsTableProps) {
  return (
    <DataTable
      colGroup={
        <colgroup>
          <col className="xl:w-100" />
          <col className="xl:w-80" />
          <col className="xl:w-55" />
          <col className="w-12" />
        </colgroup>
      }
    >
      <DataTableHeader columns={skillsTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={skillsTableColumns.length}
        loadingText="Loading..."
        emptyText="No skills found"
        errorText="Failed to load skills"
      >
        {rows.map((row) => (
          <SkillsTableRow key={row.skill.id} row={row} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </DataTableState>
    </DataTable>
  );
}
