'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { PositionsTable } from '@/widgets/positions-table';

import { CreatePositionDialog } from '@/features/positions/create-position';
import { EditPositionDialog } from '@/features/positions/edit-position';
import { DeletePositionDialog } from '@/features/positions/delete-position';

import { usePositionsListPage } from '../model/use-positions-list-page';

export function PositionsList() {
  const {
    rows,
    loading,
    error,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton,
    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingPosition,
    setEditingPosition,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingPositionId,
    setDeletingPositionId,
    deletingPositionName,
    setDeletingPositionName,
  } = usePositionsListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE POSITION"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <PositionsTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(position) => {
            setEditingPosition(position);
            setIsEditOpen(true);
          }}
          onDelete={(positionId, positionName) => {
            setDeletingPositionId(positionId);
            setDeletingPositionName(positionName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreatePositionDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditPositionDialog
        position={editingPosition}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingPosition(null);
          }
        }}
      />

      <DeletePositionDialog
        positionId={deletingPositionId}
        positionName={deletingPositionName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingPositionId(null);
          setDeletingPositionName('');
        }}
      />
    </>
  );
}
