'use client';

import { usePathname } from 'next/navigation';

import { breadcrumbMap } from './breadcrumb-map';
import type { BreadcrumbItem } from './types';

function createBreadcrumb(segment: string, href: string): BreadcrumbItem {
  return {
    label: breadcrumbMap[segment] ?? segment,
    href,
  };
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [];
  }

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;

    return createBreadcrumb(segment, href);
  });
}
