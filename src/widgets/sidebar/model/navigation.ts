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

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  dividerAfter?: boolean;
}

export const navigation: NavigationItem[] = [
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
