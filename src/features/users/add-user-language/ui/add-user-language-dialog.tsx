'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { PROFICIENCY_OPTIONS, Language } from '@/entities/language';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useAddUserLanguage } from '../api/use-add-user-language';
import {
  addUserLanguageSchema,
  type AddUserLanguageFormValues,
} from '../model/add-user-language.schema';
import { getAddUserLanguageDefaultValues } from '../model/add-user-language.defaults';

interface AddUserLanguageDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  availableLanguages: Language[];
}

export function AddUserLanguageDialog({
  open,
  onOpenChange,
  userId,
  availableLanguages,
}: AddUserLanguageDialogProps) {
  const { addUserLanguage, loading } = useAddUserLanguage(userId, availableLanguages);

  const form = useForm<AddUserLanguageFormValues>({
    resolver: standardSchemaResolver(addUserLanguageSchema),

    defaultValues: getAddUserLanguageDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    form.reset(getAddUserLanguageDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: AddUserLanguageFormValues) => {
    try {
      await addUserLanguage(values);

      toast.success('Language added successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to add language');
    }
  };

  const availableLanguageOptions = availableLanguages.map((language) => ({
    id: language.id,
    name: language.name,
  }));

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Add language"

      submitText="Confirm"
      loadingText="Confirming..."

      loading={loading}
      submitDisabled={!isValid}

      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SelectFieldsForm
        form={form}
        firstField="languageId"
        firstLabel="Language"
        firstOptions={availableLanguageOptions}

        secondField="proficiency"
        secondLabel="Language proficiency"
        secondOptions={PROFICIENCY_OPTIONS}

        disabled={loading}
      />
    </EntityDialog>
  );
}
