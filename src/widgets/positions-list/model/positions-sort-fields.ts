export const POSITIONS_SORT_FIELDS = {
  name: 'name',
} as const;

export type PositionsSortField = (typeof POSITIONS_SORT_FIELDS)[keyof typeof POSITIONS_SORT_FIELDS];
