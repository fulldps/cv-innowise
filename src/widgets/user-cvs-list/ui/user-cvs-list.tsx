'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { UserCvsTable } from '@/widgets/user-cvs-table';

import { CreateUserCvDialog } from '@/features/cv/create-user-cv';
import { EditUserCvDialog } from '@/features/cv/edit-user-cv';
import { DeleteUserCvDialog } from '@/features/cv/delete-user-cv';

import { useUserCvsListPage } from '../model/use-user-cvs-list-page';

interface UserCvsListProps {
  userId: string;
}

export function UserCvsList({ userId }: UserCvsListProps) {
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
    editingCv,
    setEditingCv,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingCvId,
    setDeletingCvId,

    deletingCvName,
    setDeletingCvName,
  } = useUserCvsListPage(userId);

  return (
    <>
      <div className="flex flex-col gap-2 ml-6 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE CV"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <UserCvsTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(cv) => {
            setEditingCv(cv);
            setIsEditOpen(true);
          }}
          onDelete={(cvId, cvName) => {
            setDeletingCvId(cvId);
            setDeletingCvName(cvName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateUserCvDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditUserCvDialog
        cv={editingCv}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingCv(null);
          }
        }}
      />

      <DeleteUserCvDialog
        cvId={deletingCvId}
        cvName={deletingCvName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingCvId(null);
          setDeletingCvName('');
        }}
      />
    </>
  );
}
