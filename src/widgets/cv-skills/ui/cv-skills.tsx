'use client';

import { toast } from 'sonner';

import { useCv } from '@/entities/cv/api/use-cv';
import { useDeleteCvSkill } from '@/entities/cv/api/use-cv-skill-mutations';
import { groupCvSkills } from '@/entities/cv/lib/group-cv-skills';
import { useSkillCategories } from '@/entities/skill-category';
import { useSkills } from '@/entities/skill';
import { USER_ROLE, useCurrentUser } from '@/entities/user';
import { AddCvSkill } from '@/features/cv/add-cv-skill';
import { EditCvSkill } from '@/features/cv/edit-cv-skill';

import { useCvSkills } from '../model/use-cv-skills';
import { SkillBar } from './skill-bar';
import { SkillsActions } from './skills-actions';

export function CvSkills({ cvId }: { cvId: string }) {
  const { cv, loading, error } = useCv(cvId);
  const { data: skillsData, loading: skillsLoading } = useSkills();
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();

  const currentUser = useCurrentUser();
  const { deleteCvSkill, loading: deleting } = useDeleteCvSkill();

  const {
    deleteMode,
    selectedSkills,
    enterDeleteMode,
    cancelDeleteMode,
    toggleSkillSelection,
    addDialogOpen,
    openAddDialog,
    closeAddDialog,
    editDialogOpen,
    editingSkill,
    openEditDialog,
    closeEditDialog,
  } = useCvSkills();

  if (loading || skillsLoading || categoriesLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  if (!cv || !skillsData?.skills || !categoriesData?.skillCategories) return null;

  const canManage = cv.user?.id === currentUser.id || currentUser.role === USER_ROLE.Admin;

  const groups = groupCvSkills(cv.skills, categoriesData.skillCategories);

  const assigned = new Set(cv.skills.map((skill) => skill.name));
  const availableSkills = skillsData.skills.filter((skill) => !assigned.has(skill.name));

  const handleDelete = async () => {
    if (selectedSkills.size === 0) return;
    try {
      await deleteCvSkill({ cvId, name: [...selectedSkills] });
      cancelDeleteMode();
      toast.success('Skills deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete skills');
    }
  };

  return (
    <div className="flex flex-col p-4">
      {groups.map((group) => (
        <section key={group.category}>
          <h2 className="mt-4 text-base">{group.category}</h2>

          <div className="grid grid-cols-1 gap-x-24 sm:grid-cols-2 lg:grid-cols-3">
            {group.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                selectable={deleteMode}
                selected={selectedSkills.has(skill.name)}
                onClick={
                  canManage
                    ? () =>
                        deleteMode
                          ? toggleSkillSelection(skill.name)
                          : openEditDialog({
                              name: skill.name,
                              categoryId: skill.categoryId ?? null,
                              mastery: skill.mastery,
                            })
                    : undefined
                }
              />
            ))}
          </div>
        </section>
      ))}

      <SkillsActions
        canManage={canManage}
        deleteMode={deleteMode}
        selectedCount={selectedSkills.size}
        onAddSkill={openAddDialog}
        onEnterDeleteMode={enterDeleteMode}
        onCancelDeleteMode={cancelDeleteMode}
        onDelete={handleDelete}
        disabled={deleting}
      />

      <AddCvSkill
        cvId={cvId}
        availableSkills={availableSkills}
        open={addDialogOpen}
        onOpenChange={(open) => (open ? openAddDialog() : closeAddDialog())}
      />

      <EditCvSkill
        key={editingSkill?.name}
        cvId={cvId}
        skill={editingSkill}
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeEditDialog();
        }}
      />
    </div>
  );
}
