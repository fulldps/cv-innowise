'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

import { useBreadcrumbs } from '../model/use-breadcrumbs';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  const hasNestedBreadcrumbs = breadcrumbs.length > 1;

  return (
    <Breadcrumb className="p-3 pb-0">
      <BreadcrumbList className="text-[16px]">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className={hasNestedBreadcrumbs ? 'text-[#bd2525]' : 'text-muted-foreground'}
                  >
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href!} className="text-foreground">
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
