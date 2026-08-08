import { DataTable, DataTableHeader, DataTableState } from '@/shared/ui/data-table';

import { PositionsTableRow } from './positions-table-row';

import { positionsTableColumns } from '../model/columns';

import type { PositionsTableRowModel } from '../model/positions-table-row-model';

import type { Position } from '@/entities/position';

import type { SortState } from '@/shared/model/sort';
import type { PositionsSortField } from '@/widgets/positions-list';

interface PositionsTableProps {
  rows: PositionsTableRowModel[];

  loading: boolean;
  error: Error | null;

  sort: SortState<PositionsSortField>;
  onSortChange(field: PositionsSortField): void;

  onEdit(position: Position): void;
  onDelete?(positionId: string, positionName: string): void;
}

export function PositionsTable({
  rows,
  loading,
  error,
  sort,
  onSortChange,
  onEdit,
  onDelete,
}: PositionsTableProps) {
  return (
    <DataTable
      colGroup={
        <colgroup>
          <col />
          <col className="w-12" />
        </colgroup>
      }
    >
      <DataTableHeader columns={positionsTableColumns} sort={sort} onSortChange={onSortChange} />

      <DataTableState
        loading={loading}
        error={error}
        isEmpty={rows.length === 0}
        columnsCount={positionsTableColumns.length}
        loadingText="Loading..."
        emptyText="No positions found"
        errorText="Failed to load positions"
      >
        {rows.map((row) => (
          <PositionsTableRow key={row.position.id} row={row} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </DataTableState>
    </DataTable>
  );
}
