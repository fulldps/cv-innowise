import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Building2,
  FileUser,
  Folders,
  Languages,
  TrendingUp,
  Users,
} from 'lucide-react';

import { UserRole } from '@/entities/user';

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  dividerAfter?: boolean;
}

export const employeeNavigation: NavigationItem[] = [
  {
    label: 'Employees',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Skills',
    href: '/skills',
    icon: TrendingUp,
  },
  {
    label: 'Languages',
    href: '/languages',
    icon: Languages,
  },
  {
    label: 'CVs',
    href: '/cvs',
    icon: FileUser,
  },
];

export const adminNavigation: NavigationItem[] = [
  {
    label: 'Employees',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: Folders,
  },
  {
    label: 'CVs',
    href: '/cvs',
    icon: FileUser,
    dividerAfter: true,
  },
  {
    label: 'Departments',
    href: '/departments',
    icon: Building2,
  },
  {
    label: 'Positions',
    href: '/positions',
    icon: Briefcase,
  },
  {
    label: 'Skills',
    href: '/skills',
    icon: TrendingUp,
  },
  {
    label: 'Languages',
    href: '/languages',
    icon: Languages,
  },
];

export const navigationByRole: Record<UserRole, NavigationItem[]> = {
  [UserRole.Employee]: employeeNavigation,
  [UserRole.Admin]: adminNavigation,
};
