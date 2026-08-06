'use client';

import { toast } from 'sonner';

import { useProfile } from '@/entities/profile';
import { useLanguages } from '@/entities/language';
import { useCurrentUser, USER_ROLE } from '@/entities/user';

import { useUserLanguages } from '../model/use-user-languages';

import { UserProfileTabs } from '@/widgets/user-profile-tabs';
import { LanguageItem } from './language-item';
import { LanguagesActions } from './languages-actions';

import { AddLanguageDialog } from '@/features/users/add-language';
import { EditLanguageDialog, EditingLanguage } from '@/features/users/edit-language';
import { useDeleteLanguage } from '@/features/users/delete-language';

interface UserLanguagesProps {
  userId: string;
}

export function UserLanguages({ userId }: UserLanguagesProps) {
  const { data: profileData, loading: profileLoading, error: profileError } = useProfile(userId);

  const { data: languagesData, loading: languagesLoading, error: languagesError } = useLanguages();

  const currentUser = useCurrentUser();

  const isOwner = currentUser.id === userId;

  const canManage = isOwner || currentUser.role === USER_ROLE.Admin;

  const {
    deleteMode,
    selectedLanguages,

    enterDeleteMode,
    cancelDeleteMode,

    toggleLanguageSelection,

    editingLanguage,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  } = useUserLanguages();

  const { deleteLanguages } = useDeleteLanguage(userId);

  if (profileLoading || languagesLoading) {
    return <div>Loading...</div>;
  }

  if (profileError || languagesError) {
    return <div>Error</div>;
  }

  if (!profileData?.profile || !languagesData?.languages) {
    return <div>Data not found</div>;
  }

  const assignedLanguageNames = new Set(
    profileData.profile.languages.map((language) => language.name),
  );

  const availableLanguages = languagesData.languages.filter(
    (language): language is NonNullable<typeof language> =>
      language !== null && !assignedLanguageNames.has(language.name),
  );

  const selectedLanguageNames = profileData.profile.languages
    .filter((language) => selectedLanguages.has(language.name))
    .map((language) => language.name);

  const handleDelete = async () => {
    if (selectedLanguageNames.length === 0) return;

    try {
      await deleteLanguages(selectedLanguageNames);

      cancelDeleteMode();

      toast.success('Languages deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete languages');
    }
  };

  const handleLanguageClick = (language: EditingLanguage) => {
    if (deleteMode) {
      toggleLanguageSelection(language.name);
      return;
    }

    openEditDialog(language);
  };

  return (
    <section className="mb-15">
      <UserProfileTabs userId={userId} />

      <div className="mt-2 flex flex-col px-42">
        <div className="grid grid-cols-3 gap-x-70 gap-y-2">
          {profileData.profile.languages.map((language) => (
            <LanguageItem
              key={language.name}
              language={language}
              selectable={deleteMode}
              selected={selectedLanguages.has(language.name)}
              onClick={canManage ? () => handleLanguageClick(language) : undefined}
            />
          ))}
        </div>

        <LanguagesActions
          canManage={canManage}
          deleteMode={deleteMode}
          selectedCount={selectedLanguages.size}
          onAddLanguage={openAddDialog}
          onEnterDeleteMode={enterDeleteMode}
          onCancelDeleteMode={cancelDeleteMode}
          onDelete={handleDelete}
        />
      </div>

      <AddLanguageDialog
        open={addDialogOpen}
        onOpenChange={(open) => {
          if (open) {
            openAddDialog();
          } else {
            closeAddDialog();
          }
        }}
        userId={userId}
        availableLanguages={availableLanguages}
      />

      <EditLanguageDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (open) return;

          closeEditDialog();
        }}
        userId={userId}
        editingLanguage={editingLanguage}
      />
    </section>
  );
}
