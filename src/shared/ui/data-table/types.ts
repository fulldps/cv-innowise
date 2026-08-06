export interface DataTableColumn<TSort extends string = string> {
  key: string;

  label: string;

  sortable?: TSort;

  className?: string;
}
