'use client';

import { CreateUserDialog } from '@/features/users/create-user';

import { UsersTable } from '@/widgets/users-table';
import { UsersToolbar } from '@/widgets/users-toolbar';

import { useUsersListPage } from '../model/use-users-list-page';
import { EditUserDialog } from '@/features/users/edit-user';
import { DeleteUserDialog } from '@/features/users/delete-user';

export function UsersList() {
  const {
    rows,
    searchValue,
    setSearchValue,
    showCreateButton,
    sort,
    toggleSort,
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    setIsEditOpen,
    editingUserId,
    setEditingUserId,
    isDeleteOpen,
    setIsDeleteOpen,
    deletingUserId,
    setDeletingUserId,
  } = useUsersListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <UsersToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          canCreateUser={showCreateButton}
          onCreateUser={() => setIsCreateOpen(true)}
        />

        <UsersTable
          rows={rows}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(userId) => {
            setEditingUserId(userId);
            setIsEditOpen(true);
          }}
          onDelete={(userId) => {
            setDeletingUserId(userId);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateUserDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      <EditUserDialog
        userId={editingUserId}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) setEditingUserId(null);
        }}
      />
      <DeleteUserDialog
        userId={deletingUserId}
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open);
          if (!open) {
            setDeletingUserId(null);
          }
        }}
      />
    </>
  );
}
