'use client';

import { Fragment, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';

import { CreateCv } from '@/features/cv/create-cv';
import { DeleteCv } from '@/features/cv/delete-cv';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import {
  DataTable,
  DataTableHeader,
  DataTableState,
  type DataTableColumn,
} from '@/shared/ui/data-table';

import { TableCell, TableRow } from '@/shared/ui/table';
import { TableToolbar } from '@/shared/ui/table-toolbar';

type CvsSortField = 'name' | 'user';

const columns: readonly DataTableColumn<CvsSortField>[] = [
  { key: 'name', label: 'Name', sortable: 'name', className: 'w-[30%] max-lg:w-[48%]' },
  { key: 'education', label: 'Education', className: 'w-[25%] max-lg:hidden' },
  { key: 'user', label: 'Employee', sortable: 'user', className: 'w-[35%] max-lg:w-[42%]' },
  { key: 'actions', label: '', className: 'w-16' },
];

export function CvsTable({ cvs }: { cvs: ReturnType<typeof useCvsList>['cvs'] }) {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const { sort, toggleSort } = useSort<CvsSortField>('name');

  const normalizedSearch = useDebounce(search, 600).trim().toLowerCase();

  const sorted = useMemo(() => {
    const filtered = cvs.filter(
      (cv) =>
        cv.name.toLowerCase().includes(normalizedSearch) ||
        cv.description.toLowerCase().includes(normalizedSearch),
    );

    return [...filtered].sort((a, b) => {
      const av = sort.field === 'name' ? a.name : (a.user?.email ?? '');
      const bv = sort.field === 'name' ? b.name : (b.user?.email ?? '');
      const result = av.localeCompare(bv);

      return sort.direction === 'asc' ? result : -result;
    });
  }, [cvs, sort, normalizedSearch]);

  return (
    <div className="flex flex-col gap-2">
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        showAction
        actionText="CREATE CV"
        onActionClick={() => setCreateOpen(true)}
      />

      <DataTable>
        <DataTableHeader columns={columns} sort={sort} onSortChange={toggleSort} />

        <DataTableState
          loading={false}
          error={null}
          isEmpty={sorted.length === 0}
          columnsCount={columns.length}
          emptyText="No CVs found."
        >
          {sorted.map((cv) => (
            <Fragment key={cv.id}>
              <TableRow
                className="cursor-pointer border-b-0"
                onClick={() => router.push(`/cvs/${cv.id}/details`)}
              >
                <TableCell className="truncate px-4 font-medium">{cv.name}</TableCell>
                <TableCell className="truncate px-4 max-lg:hidden">{cv.education ?? '—'}</TableCell>
                <TableCell className="truncate px-4">{cv.user?.email ?? '—'}</TableCell>
                <TableCell className="px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <DeleteCv cv={cv} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 pt-0 text-sm whitespace-normal text-muted-foreground"
                >
                  {cv.description}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </DataTableState>
      </DataTable>

      <CreateCv open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
