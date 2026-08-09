export const PROJECTS_SORT_FIELDS = {
  name: 'name',
} as const;

export type ProjectsSortField = (typeof PROJECTS_SORT_FIELDS)[keyof typeof PROJECTS_SORT_FIELDS];
