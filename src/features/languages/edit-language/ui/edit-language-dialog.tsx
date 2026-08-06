'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import type { Language } from '@/entities/language';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { LanguageForm } from '@/shared/ui/language-form';

import { useEditLanguage } from '../api/use-edit-language';
import { editLanguageSchema, type EditLanguageFormValues } from '../model/edit-language.schema';
import { getEditLanguageDefaultValues } from '../model/edit-language.defaults';

interface EditLanguageDialogProps {
  language: Language | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditLanguageDialog({ language, open, onOpenChange }: EditLanguageDialogProps) {
  const { editLanguage, loading: updateLoading } = useEditLanguage();

  const form = useForm<EditLanguageFormValues>({
    resolver: standardSchemaResolver(editLanguageSchema),

    defaultValues: {
      name: '',
      nativeName: '',
      iso2: '',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!language) return;

    form.reset(getEditLanguageDefaultValues(language));
  }, [language, form]);

  const { control } = form;

  const { isDirty } = useFormState({
    control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditLanguageFormValues) => {
    if (!language) return;

    try {
      await editLanguage(language.id, values);

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
      submitText="Update"
      loadingText="Updating..."
      loading={updateLoading}
      submitDisabled={!isDirty}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <LanguageForm form={form} disabled={updateLoading} />
    </EntityDialog>
  );
}
