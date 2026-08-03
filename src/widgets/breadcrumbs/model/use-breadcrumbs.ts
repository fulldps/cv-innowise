'use client';

import { usePathname } from 'next/navigation';

import type { BreadcrumbItem } from './types';
import { breadcrumbMap } from './breadcrumb-map';

export function useBreadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return {
      breadcrumbs: [] as BreadcrumbItem[],
      profileUserId: null as string | null,
    };
  }

  if (segments.length === 3 && segments[0] === 'users' && segments[2] === 'profile') {
    return {
      breadcrumbs: [
        {
          label: breadcrumbMap.users,
          href: '/users',
        },
        {
          label: null,
          href: pathname,
        },
      ],
      profileUserId: segments[1],
    };
  }

  const breadcrumbs = segments.map((segment, index) => ({
    label: breadcrumbMap[segment] ?? segment,
    href: `/${segments.slice(0, index + 1).join('/')}`,
  }));

  return {
    breadcrumbs,
    profileUserId: null,
  };
}
