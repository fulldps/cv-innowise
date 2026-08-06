'use client';

import { useEffect } from 'react';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { PROFICIENCY_OPTIONS } from '@/entities/language';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useEditUserLanguage } from '../api/use-edit-user-language';
import {
  editUserLanguageSchema,
  type EditUserLanguageFormValues,
} from '../model/edit-user-language.schema';

import { getEditUserLanguageDefaultValues } from '../model/edit-user-language.defaults';

import type { EditingUserLanguage } from '../model/edit-user-language.types';

interface EditUserLanguageDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  editingUserLanguage: EditingUserLanguage | null;
}

export function EditUserLanguageDialog({
  open,
  onOpenChange,
  userId,
  editingUserLanguage,
}: EditUserLanguageDialogProps) {
  const { editUserLanguage, loading } = useEditUserLanguage(userId);

  const form = useForm<EditUserLanguageFormValues>({
    resolver: standardSchemaResolver(editUserLanguageSchema),

    defaultValues: {
      languageId: '',
      proficiency: 'A1',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!editingUserLanguage) return;

    form.reset(getEditUserLanguageDefaultValues(editingUserLanguage));
  }, [editingUserLanguage, form]);

  const { isDirty } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditUserLanguageFormValues) => {
    if (!editingUserLanguage) return;

    try {
      await editUserLanguage(values, editingUserLanguage);

      toast.success('Language updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update language');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Update language"

      submitText="Confirm"
      loadingText="Confirming..."

      loading={loading}
      submitDisabled={!isDirty}

      onSubmit={form.handleSubmit(onSubmit)}

      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SelectFieldsForm
        form={form}
        firstField="languageId"
        firstLabel="Language"
        firstDisabled
        firstOptions={[
          {
            id: editingUserLanguage?.name ?? '',
            name: editingUserLanguage?.name ?? '',
          },
        ]}

        secondField="proficiency"
        secondLabel="Language proficiency"
        secondOptions={PROFICIENCY_OPTIONS}

        disabled={loading}
      />
    </EntityDialog>
  );
}
