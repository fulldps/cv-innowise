export const DEPARTMENTS_SORT_FIELDS = {
  name: 'name',
} as const;

export type DepartmentsSortField =
  (typeof DEPARTMENTS_SORT_FIELDS)[keyof typeof DEPARTMENTS_SORT_FIELDS];
