'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { DepartmentsTable } from '@/widgets/departments-table';

import { CreateDepartmentDialog } from '@/features/departments/create-department';
import { EditDepartmentDialog } from '@/features/departments/edit-department';
import { DeleteDepartmentDialog } from '@/features/departments/delete-department';

import { useDepartmentsListPage } from '../model/use-departments-list-page';

export function DepartmentsList() {
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
    editingDepartment,
    setEditingDepartment,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingDepartmentId,
    setDeletingDepartmentId,
    deletingDepartmentName,
    setDeletingDepartmentName,
  } = useDepartmentsListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE DEPARTMENT"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <DepartmentsTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(department) => {
            setEditingDepartment(department);
            setIsEditOpen(true);
          }}
          onDelete={(departmentId, departmentName) => {
            setDeletingDepartmentId(departmentId);
            setDeletingDepartmentName(departmentName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateDepartmentDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditDepartmentDialog
        department={editingDepartment}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingDepartment(null);
          }
        }}
      />

      <DeleteDepartmentDialog
        departmentId={deletingDepartmentId}
        departmentName={deletingDepartmentName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingDepartmentId(null);
          setDeletingDepartmentName('');
        }}
      />
    </>
  );
}
