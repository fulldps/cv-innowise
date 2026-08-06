'use client';

import { Fragment, useMemo, useState } from 'react';

import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { AddProject } from '@/features/project/add-project';
import { RemoveProject } from '@/features/project/remove-project';
import { useSort } from '@/shared/lib/hooks/use-sort';
import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';
import type { DataTableColumn } from '@/shared/ui/data-table/types';
import { TableCell, TableRow } from '@/shared/ui/table';
import { TableToolbar } from '@/shared/ui/table-toolbar';

type ProjectsSortField = 'name';

const columns: readonly DataTableColumn<ProjectsSortField>[] = [
  { key: 'name', label: 'Name', sortable: 'name', className: 'w-[30%] max-lg:w-[52%]' },
  { key: 'domain', label: 'Domain', className: 'w-[22%] max-lg:w-[38%]' },
  { key: 'start_date', label: 'Start Date', className: 'w-[18%] max-lg:hidden' },
  { key: 'end_date', label: 'End Date', className: 'w-[18%] max-lg:hidden' },
  { key: 'actions', label: '', className: 'w-12' },
];

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);

  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const { sort, toggleSort } = useSort<ProjectsSortField>('name');

  const projects = useMemo(() => {
    const list = cv?.projects ?? [];
    const query = search.trim().toLowerCase();

    const filtered = list.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.internal_name.toLowerCase().includes(query),
    );

    return [...filtered].sort((a, b) => {
      const result = a.name.localeCompare(b.name);

      return sort.direction === 'asc' ? result : -result;
    });
  }, [cv?.projects, search, sort]);

  return (
    <div className="flex flex-col gap-2">
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        showAction
        actionText="ADD PROJECT"
        onActionClick={() => setAddOpen(true)}
      />

      <DataTable>
        <DataTableHeader columns={columns} sort={sort} onSortChange={toggleSort} />

        <DataTableState
          loading={loading}
          error={error ?? null}
          isEmpty={projects.length === 0}
          columnsCount={columns.length}
          emptyText="No projects found."
        >
          {projects.map((project) => (
            <Fragment key={project.id}>
              <TableRow className="border-b-0">
                <TableCell className="truncate px-4 font-medium">{project.name}</TableCell>
                <TableCell className="truncate px-4">{project.domain}</TableCell>
                <TableCell className="truncate px-4 max-lg:hidden">{project.start_date}</TableCell>
                <TableCell className="truncate px-4 max-lg:hidden">
                  {project.end_date ?? 'Till now'}
                </TableCell>
                <TableCell className="px-4 text-right">
                  <RemoveProject cvId={id} projectId={project.project.id} name={project.name} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="space-y-3 px-4 pt-0 pb-5 whitespace-normal"
                >
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.environment ?? []).map((tag) => (
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
          ))}
        </DataTableState>
      </DataTable>

      <AddProject cvId={id} open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
