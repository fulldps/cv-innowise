'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useCurrentUser } from '@/entities/user';
import { useCreateCv } from '@/entities/cv/api/use-create-cv';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { UserCvForm } from '@/features/cv/ui/user-cv-form';

import { createUserCvSchema, type CreateUserCvFormValues } from '../model/create-user-cv.schema';
import { getCreateUserCvDefaultValues } from '../model/create-user-cv.defaults';

interface CreateUserCvDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateUserCvDialog({ open, onOpenChange }: CreateUserCvDialogProps) {
  const currentUser = useCurrentUser();

  const [createCv, { loading }] = useCreateCv();

  const form = useForm<CreateUserCvFormValues>({
    resolver: standardSchemaResolver(createUserCvSchema),

    defaultValues: getCreateUserCvDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({
    control,
  });

  const handleClose = () => {
    form.reset(getCreateUserCvDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: CreateUserCvFormValues) => {
    try {
      await createCv({
        variables: {
          cv: {
            ...values,
            userId: currentUser.id,
          },
        },
      });

      toast.success('CV created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create CV');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create CV"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <UserCvForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
