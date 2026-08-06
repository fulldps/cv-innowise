'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { LanguageForm } from '@/shared/ui/language-form';

import { useCreateLanguage } from '../api/use-create-language';
import {
  createLanguageSchema,
  type CreateLanguageFormValues,
} from '../model/create-language.schema';
import { getCreateLanguageDefaultValues } from '../model/create-language.defaults';

interface CreateLanguageDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateLanguageDialog({ open, onOpenChange }: CreateLanguageDialogProps) {
  const { createLanguage, loading } = useCreateLanguage();

  const form = useForm<CreateLanguageFormValues>({
    resolver: standardSchemaResolver(createLanguageSchema),

    defaultValues: getCreateLanguageDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({
    control,
  });

  const handleClose = () => {
    form.reset(getCreateLanguageDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: CreateLanguageFormValues) => {
    try {
      await createLanguage(values);

      toast.success('Language created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create language');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create language"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <LanguageForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
