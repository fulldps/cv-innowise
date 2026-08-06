'use client';

import { Fragment } from 'react';

import { ArrowDown, EllipsisVertical, Plus, Search } from 'lucide-react';

import { useProjectsList } from '@/entities/project/api/use-projects-list';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export default function Page() {
  const { loading, error, projects } = useProjectsList();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="rounded-full pl-8" />
        </div>

        <Button variant="ghost" className="gap-1.5 text-[#c72f31] hover:text-[#c72f31]">
          <Plus className="size-4" />
          ADD PROJECT
        </Button>
      </div>

      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Name</TableHead>
            <TableHead className="w-[25%]">Domain</TableHead>
            <TableHead className="w-[18%]">Start Date</TableHead>
            <TableHead className="w-[17%]">
              <span className="inline-flex items-center gap-1">
                End Date
                <ArrowDown className="size-3.5" />
              </span>
            </TableHead>
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
                <TableCell className="truncate">{project.end_date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} className="space-y-3 whitespace-normal pt-0 pb-5">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
