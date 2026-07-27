'use client';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { ArrowUp } from 'lucide-react';
import { useMemo, useState } from 'react';

export function CvsTable({ cvs }: { cvs: ReturnType<typeof useCvsList>['cvs'] }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ key: 'name' | 'user'; dir: 'asc' | 'desc' }>({
    key: 'name',
    dir: 'asc',
  });

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

  const handleSort = (key: 'name' | 'user') => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <>
      <div>
        <Input onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="flex gap-2 items-center">
              Name
              {sort.key === 'name' && (
                <ArrowUp
                  size={14}
                  className={sort.dir === 'desc' ? 'rotate-180 duration-300' : 'duration-300'}
                />
              )}
            </TableHead>
            <TableHead>Education</TableHead>
            <TableHead onClick={() => handleSort('user')} className="flex gap-2 items-center">
              Employee
              {sort.key === 'user' && (
                <ArrowUp
                  size={14}
                  className={sort.dir === 'desc' ? 'rotate-180 duration-300' : 'duration-300'}
                />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((cv) => (
            <TableRow key={cv.id}>
              <TableCell>{cv.name}</TableCell>
              <TableCell>{cv.description}</TableCell>
              <TableCell>{cv.user?.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
