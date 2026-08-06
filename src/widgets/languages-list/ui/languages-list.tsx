'use client';

import { TableToolbar } from '@/shared/ui/table-toolbar';

import { LanguagesTable } from '@/widgets/languages-table';

import { CreateLanguageDialog } from '@/features/languages/create-language';
import { EditLanguageDialog } from '@/features/languages/edit-language';
import { DeleteLanguageDialog } from '@/features/languages/delete-language';

import { useLanguagesListPage } from '../model/use-languages-list-page';

export function LanguagesList() {
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
    editingLanguage,
    setEditingLanguage,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingLanguageId,
    setDeletingLanguageId,
    deletingLanguageName,
    setDeletingLanguageName,
  } = useLanguagesListPage();

  return (
    <>
      <div className="flex flex-col gap-2 bg-primary-foreground">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showAction={showCreateButton}
          actionText="CREATE LANGUAGE"
          onActionClick={() => setIsCreateOpen(true)}
        />

        <LanguagesTable
          rows={rows}
          loading={loading}
          error={error}
          sort={sort}
          onSortChange={toggleSort}
          onEdit={(language) => {
            setEditingLanguage(language);
            setIsEditOpen(true);
          }}
          onDelete={(languageId, languageName) => {
            setDeletingLanguageId(languageId);
            setDeletingLanguageName(languageName);
            setIsDeleteOpen(true);
          }}
        />
      </div>

      <CreateLanguageDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditLanguageDialog
        language={editingLanguage}
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            setEditingLanguage(null);
          }
        }}
      />

      <DeleteLanguageDialog
        languageId={deletingLanguageId}
        languageName={deletingLanguageName}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClosed={() => {
          setDeletingLanguageId(null);
          setDeletingLanguageName('');
        }}
      />
    </>
  );
}
