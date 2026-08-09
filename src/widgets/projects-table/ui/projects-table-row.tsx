import { Fragment } from 'react';

import { ActionsMenu } from '@/shared/ui/data-table/ui/actions-menu';
import { TableCell, TableRow } from '@/shared/ui/table';

import type { Project } from '@/entities/project';
import type { ProjectsTableRowModel } from '../model/projects-table-row-model';

const formatDate = (value: string | null) => {
  if (!value) return 'Till now';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}/${month}/${date.getFullYear()}`;
};

interface ProjectsTableRowProps {
  row: ProjectsTableRowModel;
  columnsCount: number;

  onEdit(project: Project): void;
  onDelete?(projectId: string, projectName: string): void;
}

export function ProjectsTableRow({ row, columnsCount, onEdit, onDelete }: ProjectsTableRowProps) {
  const { project } = row;

  return (
    <Fragment>
      <TableRow className="border-b-0">
        <TableCell className="truncate px-4 font-medium">{project.name}</TableCell>
        <TableCell className="truncate px-4">{project.domain}</TableCell>
        <TableCell className="truncate px-4 max-lg:hidden">{formatDate(project.start_date)}</TableCell>
        <TableCell className="truncate px-4 max-lg:hidden">{formatDate(project.end_date)}</TableCell>
        <TableCell className="px-4">
          <div className="flex justify-end">
            {row.canEdit && (
              <ActionsMenu
                canDelete={row.canDelete}
                onEdit={() => onEdit(project)}
                onDelete={() => onDelete?.(project.id, project.name)}
              />
            )}
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={columnsCount} className="space-y-3 px-4 pt-0 pb-5 whitespace-normal">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.environment.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
