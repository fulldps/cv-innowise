'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { ProjectsTable } from '@/widgets/projects-table';

import { CreateProjectDialog } from '@/features/projects/create-project';
import { EditProjectDialog } from '@/features/projects/edit-project';
import { DeleteProjectDialog } from '@/features/projects/delete-project';

import { useProjectsListPage } from '../model/use-projects-list-page';

export function ProjectsList() {
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
    editingProject,
    setEditingProject,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingProjectId,
    setDeletingProjectId,
    deletingProjectName,
    setDeletingProjectName,
  } = useProjectsListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE PROJECT"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <ProjectsTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(project) => {
            setEditingProject(project);
            setIsEditOpen(true);
          }}
          onDelete={(projectId, projectName) => {
            setDeletingProjectId(projectId);
            setDeletingProjectName(projectName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateProjectDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditProjectDialog
        project={editingProject}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingProject(null);
          }
        }}
      />

      <DeleteProjectDialog
        projectId={deletingProjectId}
        projectName={deletingProjectName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingProjectId(null);
          setDeletingProjectName('');
        }}
      />
    </>
  );
}
