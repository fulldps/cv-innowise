'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useUpdateCv } from '@/entities/cv/api/use-update-cv';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { UserCvForm } from '@/shared/ui/user-cv-form';

import { editUserCvSchema, type EditUserCvFormValues } from '../model/edit-user-cv.schema';
import { getEditUserCvDefaultValues } from '../model/edit-user-cv.defaults';

interface EditUserCvDialogProps {
  cv: {
    id: string;
    name: string;
    description: string;
    education?: string | null;
  } | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditUserCvDialog({ cv, open, onOpenChange }: EditUserCvDialogProps) {
  const [updateCv, { loading }] = useUpdateCv();

  const form = useForm<EditUserCvFormValues>({
    resolver: standardSchemaResolver(editUserCvSchema),

    defaultValues: {
      name: '',
      description: '',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!cv) return;

    form.reset(getEditUserCvDefaultValues(cv));
  }, [cv, form]);

  const { control } = form;

  const { isDirty } = useFormState({
    control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditUserCvFormValues) => {
    if (!cv) return;

    try {
      await updateCv({
        variables: {
          cv: {
            cvId: cv.id,
            ...values,
          },
        },
      });

      toast.success('CV updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update CV');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update CV"
      submitText="Update"
      loadingText="Updating..."
      loading={loading}
      submitDisabled={!isDirty}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <UserCvForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
