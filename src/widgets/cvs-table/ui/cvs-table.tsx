'use client';

import { Fragment, useMemo, useState } from 'react';

import { ArrowUp } from 'lucide-react';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';
import { CreateCv } from '@/features/cv/create-cv';
import { DeleteCv } from '@/features/cv/delete-cv';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { useRouter } from 'next/navigation';

type SortKey = 'name' | 'user';

export function CvsTable({ cvs }: { cvs: ReturnType<typeof useCvsList>['cvs'] }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'name',
    dir: 'asc',
  });

  const router = useRouter();

  const sorted = useMemo(() => {
    const s = search.toLowerCase();
    const filtered = cvs.filter(
      (cv) => cv.name.toLowerCase().includes(s) || cv.description.toLowerCase().includes(s),
    );
    return [...filtered].sort((a, b) => {
      const av = sort.key === 'name' ? a.name : (a.user?.email ?? '');
      const bv = sort.key === 'name' ? b.name : (b.user?.email ?? '');
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [cvs, sort, search]);

  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  const renderSortableHead = (key: SortKey, label: string) => (
    <button
      type="button"
      onClick={() => handleSort(key)}
      className="flex items-center gap-1 font-medium"
    >
      {label}
      {sort.key === key && (
        <ArrowUp
          size={14}
          className={
            sort.dir === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'
          }
        />
      )}
    </button>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="max-w-sm"
        />
        <CreateCv />
      </div>

      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">{renderSortableHead('name', 'Name')}</TableHead>
            <TableHead className="w-[25%]">Education</TableHead>
            <TableHead className="w-[35%]">{renderSortableHead('user', 'Employee')}</TableHead>
            <TableHead className="w-16" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((cv) => (
            <Fragment key={cv.id}>
              <TableRow className="border-b-0" onClick={() => router.push(`/cvs/${cv.id}/details`)}>
                <TableCell className="truncate font-medium">{cv.name}</TableCell>
                <TableCell className="truncate">{cv.education ?? '—'}</TableCell>
                <TableCell className="truncate">{cv.user?.email ?? '—'}</TableCell>
                <TableCell
                  className="text-right"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <DeleteCv cv={cv} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  className="whitespace-normal pt-0 text-sm text-muted-foreground"
                >
                  {cv.description}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
