'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const tabs = [
  { segment: 'details', label: 'DETAILS' },
  { segment: 'skills', label: 'SKILLS' },
  { segment: 'projects', label: 'PROJECTS' },
  { segment: 'preview', label: 'PREVIEW' },
];

export default function CvsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-8">
      <nav className="flex gap-4 border-b">
        {tabs.map((tab) => {
          const href = `/cvs/${id}/${tab.segment}`;
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={tab.segment}
              href={href}
              className={cn(
                '-mb-px border-b-2 border-transparent px-11 py-3 max-lg:px-4',
                isActive && 'border-destructive text-destructive',
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
