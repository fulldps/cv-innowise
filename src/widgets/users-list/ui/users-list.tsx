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
    loading,
    error,

    openProfile,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton,
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
    deletingUserFullName,
    setDeletingUserFullName,
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
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onOpenProfile={openProfile}
          onEdit={(userId) => {
            setEditingUserId(userId);
            setIsEditOpen(true);
          }}
          onDelete={(userId, fullName) => {
            setDeletingUserId(userId);
            setDeletingUserFullName(fullName);
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
        userFullName={deletingUserFullName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingUserId(null);
          setDeletingUserFullName('');
        }}
      />
    </>
  );
}
