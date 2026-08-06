export type SortDirection = 'asc' | 'desc';

export interface SortState<TField extends string> {
  field: TField;
  direction: SortDirection;
}
