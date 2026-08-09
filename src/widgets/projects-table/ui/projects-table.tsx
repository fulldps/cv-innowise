import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

import type { Project } from '@/entities/project';
import type { SortState } from '@/shared/model/sort';
import type { ProjectsSortField } from '@/widgets/projects-list';

import { projectsTableColumns } from '../model/columns';
import type { ProjectsTableRowModel } from '../model/projects-table-row-model';
import { ProjectsTableRow } from './projects-table-row';

interface ProjectsTableProps {
  rows: ProjectsTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<ProjectsSortField>;
  onSortChange(field: ProjectsSortField): void;

  onEdit(project: Project): void;
  onDelete?(projectId: string, projectName: string): void;
}

export function ProjectsTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <DataTable>
      <DataTableHeader columns={projectsTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={projectsTableColumns.length}
        emptyText="No projects found"
        errorText="Failed to load projects"
      >
        {rows.map((row) => (
          <ProjectsTableRow
            key={row.project.id}
            row={row}
            columnsCount={projectsTableColumns.length}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </DataTableState>
    </DataTable>
  );
}
