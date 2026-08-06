'use client';

import { Fragment, useMemo, useState } from 'react';

import { ArrowUp } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { AddProject } from '@/features/project/add-project';
import { RemoveProject } from '@/features/project/remove-project';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);

  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const projects = useMemo(() => {
    const list = cv?.projects ?? [];
    const query = search.trim().toLowerCase();

    const filtered = list.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.internal_name.toLowerCase().includes(query),
    );

    return [...filtered].sort((a, b) =>
      sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [cv?.projects, search, sortDir]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  if (!cv) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            className="rounded-full"
          />
        </div>

        <AddProject cvId={id} />
      </div>

      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">
              <button
                type="button"
                onClick={() => setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))}
                className="flex items-center gap-1 font-medium"
              >
                Name
                <ArrowUp
                  size={14}
                  className={sortDir === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </button>
            </TableHead>
            <TableHead className="w-[22%]">Domain</TableHead>
            <TableHead className="w-[18%]">Start Date</TableHead>
            <TableHead className="w-[18%]">End Date</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <Fragment key={project.id}>
              <TableRow className="border-b-0">
                <TableCell className="truncate font-medium">{project.name}</TableCell>
                <TableCell className="truncate">{project.domain}</TableCell>
                <TableCell className="truncate">{project.start_date}</TableCell>
                <TableCell className="truncate">{project.end_date ?? 'Till now'}</TableCell>
                <TableCell className="text-right">
                  <RemoveProject
                    cvId={id}
                    projectId={project.project.id}
                    name={project.name}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} className="space-y-3 whitespace-normal pt-0 pb-5">
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
        </TableBody>
      </Table>
    </div>
  );
}
