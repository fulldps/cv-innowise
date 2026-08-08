'use client';

import { toast } from 'sonner';

import { useProfile } from '@/entities/profile';
import { useLanguages } from '@/entities/language';
import { useCurrentUser, USER_ROLE } from '@/entities/user';

import { useUserLanguages } from '../model/use-user-languages';

import { UserProfileTabs } from '@/widgets/user-profile-tabs';
import { LanguageItem } from './language-item';
import { LanguagesActions } from './languages-actions';

import { AddUserLanguageDialog } from '@/features/users/add-user-language';
import { EditUserLanguageDialog, EditingUserLanguage } from '@/features/users/edit-user-language';
import { useDeleteUserLanguage } from '@/features/users/delete-user-language';

import { EmptyState, ErrorState } from '@/shared/ui/states';

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

    editingUserLanguage,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  } = useUserLanguages();

  const { deleteUserLanguages, loading: deleteUserLanguagesLoading } =
    useDeleteUserLanguage(userId);

  if (profileLoading || languagesLoading) {
    return <div>Loading...</div>;
  }

  if (profileError || languagesError || !profileData?.profile || !languagesData?.languages) {
    return <ErrorState title="Failed to load languages" />;
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
      await deleteUserLanguages(selectedLanguageNames);

      cancelDeleteMode();

      toast.success('Languages deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete languages');
    }
  };

  const handleLanguageClick = (language: EditingUserLanguage) => {
    if (deleteMode) {
      toggleLanguageSelection(language.name);
      return;
    }

    openEditDialog(language);
  };

  return (
    <section className="mb-15">
      <UserProfileTabs userId={userId} />

      <div className="mt-2 flex flex-col px-4 sm:px-20 xl:px-42">
        {profileData.profile.languages.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-70">
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
        ) : (
          <EmptyState title="No languages yet" message="" />
        )}

        <LanguagesActions
          canManage={canManage}
          deleteMode={deleteMode}
          selectedCount={selectedLanguages.size}
          onAddLanguage={openAddDialog}
          onEnterDeleteMode={enterDeleteMode}
          onCancelDeleteMode={cancelDeleteMode}
          onDelete={handleDelete}
          disabled={deleteUserLanguagesLoading}
        />
      </div>

      <AddUserLanguageDialog
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

      <EditUserLanguageDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (open) return;

          closeEditDialog();
        }}
        userId={userId}
        editingUserLanguage={editingUserLanguage}
      />
    </section>
  );
}
