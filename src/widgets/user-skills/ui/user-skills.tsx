'use client';

import { toast } from 'sonner';

import { useProfile } from '@/entities/profile';
import { useSkills } from '@/entities/skill';
import { useCurrentUser, USER_ROLE } from '@/entities/user';
import { useSkillCategories } from '@/entities/skill-category';

import { useUserSkills } from '../model/use-user-skills';
import { buildGroupedSkills } from '../model/build-grouped-skills';

import { UserProfileTabs } from '@/widgets/user-profile-tabs';
import { SkillsCategorySection } from './skills-category-section';
import { SkillItem } from './skill-item';
import { SkillsActions } from './skills-actions';
import { AddUserSkillDialog } from '@/features/users/add-user-skill';
import { EditingUserSkill, EditUserSkillDialog } from '@/features/users/edit-user-skill';
import { useDeleteUserSkill } from '@/features/users/delete-user-skill';

interface UserSkillsProps {
  userId: string;
}

export function UserSkills({ userId }: UserSkillsProps) {
  const { data: profileData, loading: profileLoading, error: profileError } = useProfile(userId);

  const { data: skillsData, loading: skillsLoading, error: skillsError } = useSkills();

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSkillCategories();

  const currentUser = useCurrentUser();

  const isOwner = currentUser.id === userId;

  const canManage = isOwner || currentUser.role === USER_ROLE.Admin;

  const {
    deleteMode,
    selectedSkills,

    enterDeleteMode,
    cancelDeleteMode,

    toggleSkillSelection,

    editingUserSkill,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  } = useUserSkills();

  const { deleteUserSkills, loading: deleteUserSkillsLoading } = useDeleteUserSkill(userId);

  const groupedSkills =
    profileData?.profile && skillsData?.skills && categoriesData?.skillCategories
      ? buildGroupedSkills({
          profile: profileData.profile,
          skills: skillsData.skills,
          categories: categoriesData.skillCategories,
        })
      : [];

  const assignedSkillNames = new Set(profileData?.profile.skills.map((skill) => skill.name));

  const availableSkills =
    skillsData?.skills.filter((skill) => !assignedSkillNames.has(skill.name)) ?? [];

  const selectedSkillNames = groupedSkills
    .flatMap((category) => category.skills)
    .filter((skill) => selectedSkills.has(skill.id))
    .map((skill) => skill.name);

  const handleDelete = async () => {
    if (selectedSkillNames.length === 0) return;

    try {
      await deleteUserSkills(selectedSkillNames);

      cancelDeleteMode();

      toast.success('Skills deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete skills');
    }
  };

  const handleSkillClick = (skill: EditingUserSkill) => {
    if (deleteMode) {
      toggleSkillSelection(skill.id);
      return;
    }

    openEditDialog(skill);
  };

  if (profileLoading || skillsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (profileError || skillsError || categoriesError) {
    return <div>Error</div>;
  }

  if (!profileData?.profile || !skillsData?.skills || !categoriesData?.skillCategories) {
    return <div>Data not found</div>;
  }

  return (
    <section className="mb-15">
      <UserProfileTabs userId={userId} />

      <div className="flex flex-col gap-4 px-42 mt-2">
        {groupedSkills.map((category) => (
          <SkillsCategorySection key={category.id} title={category.name}>
            {category.skills.map((skill) => (
              <SkillItem
                key={skill.id}
                skill={skill}
                selectable={deleteMode}
                selected={selectedSkills.has(skill.id)}
                onClick={canManage ? () => handleSkillClick(skill) : undefined}
              />
            ))}
          </SkillsCategorySection>
        ))}
        <SkillsActions
          canManage={canManage}
          deleteMode={deleteMode}
          selectedCount={selectedSkills.size}
          onAddSkill={openAddDialog}
          onEnterDeleteMode={enterDeleteMode}
          onCancelDeleteMode={cancelDeleteMode}
          onDelete={handleDelete}
          disabled={deleteUserSkillsLoading}
        />
      </div>

      <AddUserSkillDialog
        open={addDialogOpen}
        onOpenChange={(open) => {
          if (open) {
            openAddDialog();
          } else {
            closeAddDialog();
          }
        }}
        userId={userId}
        availableSkills={availableSkills}
      />
      <EditUserSkillDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (open) return;

          closeEditDialog();
        }}
        userId={userId}
        editingUserSkill={editingUserSkill}
      />
    </section>
  );
}
