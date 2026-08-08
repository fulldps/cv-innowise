import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

import { LanguagesTableRow } from './languages-table-row';

import { languagesTableColumns } from '../model/columns';

import type { LanguagesTableRowModel } from '../model/languages-table-row-model';

import type { Language } from '@/entities/language';

import type { SortState } from '@/shared/model/sort';
import type { LanguagesSortField } from '@/widgets/languages-list';

interface LanguagesTableProps {
  rows: LanguagesTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<LanguagesSortField>;
  onSortChange(field: LanguagesSortField): void;

  onEdit(language: Language): void;
  onDelete?(languageId: string, languageName: string): void;
}

export function LanguagesTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: LanguagesTableProps) {
  return (
    <DataTable
      colGroup={
        <colgroup>
          <col className="w-20 xl:w-120" />
          <col className="w-20 xl:w-120" />
          <col className="w-20 xl:w-60" />
          <col className="w-12" />
        </colgroup>
      }
    >
      <DataTableHeader columns={languagesTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={languagesTableColumns.length}
        loadingText="Loading..."
        emptyText="No languages found"
        errorText="Failed to load languages"
      >
        {rows.map((row) => (
          <LanguagesTableRow key={row.language.id} row={row} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </DataTableState>
    </DataTable>
  );
}
