'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { SkillsTable } from '@/widgets/skills-table';

import { CreateSkillDialog } from '@/features/skills/create-skill';
import { EditSkillDialog } from '@/features/skills/edit-skill';
import { DeleteSkillDialog } from '@/features/skills/delete-skill';

import { useSkillsListPage } from '../model/use-skills-list-page';

export function SkillsList() {
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
    editingSkill,
    setEditingSkill,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingSkillId,
    setDeletingSkillId,
    deletingSkillName,
    setDeletingSkillName,
  } = useSkillsListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE SKILL"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <SkillsTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(skill) => {
            setEditingSkill(skill);
            setIsEditOpen(true);
          }}
          onDelete={(skillId, skillName) => {
            setDeletingSkillId(skillId);
            setDeletingSkillName(skillName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateSkillDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditSkillDialog
        skill={editingSkill}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingSkill(null);
          }
        }}
      />

      <DeleteSkillDialog
        skillId={deletingSkillId}
        skillName={deletingSkillName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingSkillId(null);
          setDeletingSkillName('');
        }}
      />
    </>
  );
}
