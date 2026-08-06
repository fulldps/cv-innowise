import type { LanguagesSortField } from '@/widgets/languages-list';

export interface LanguagesTableColumn {
  key: 'name' | 'nativeName' | 'iso2' | 'actions';

  label: string;

  sortable?: LanguagesSortField;

  className?: string;
}

export const languagesTableColumns: readonly LanguagesTableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: 'name',
  },
  {
    key: 'nativeName',
    label: 'Native Name',
  },
  {
    key: 'iso2',
    label: 'ISO2',
  },
  {
    key: 'actions',
    label: '',
  },
] as const;
