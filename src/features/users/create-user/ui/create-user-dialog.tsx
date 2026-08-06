'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useUserFormOptions } from '@/entities/user';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { UserForm } from '@/shared/ui/user-form';

import { useCreateUser } from '../api/use-create-user';
import { createUserSchema } from '../model/create-user.schema';
import { getCreateUserDefaultValues } from '../model/create-user.defaults';

import type { UserFormValues } from '@/shared/model/user-form.types';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const { departments, positions } = useUserFormOptions();

  const { createUser, loading } = useCreateUser();

  const form = useForm<UserFormValues>({
    resolver: standardSchemaResolver(createUserSchema),

    defaultValues: getCreateUserDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    form.reset(getCreateUserDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: UserFormValues) => {

    try {
      await createUser(values);

      toast.success('User created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create user');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Create user"

      submitText="Create"
      loadingText="Creating..."

      loading={loading}
      submitDisabled={!isValid}

      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}

      maxWidth="max-w-4xl"
    >
      <UserForm
        form={form}

        departments={departments}
        positions={positions}

        disabled={{
          fields: loading,
          email: loading,
          password: loading,
          role: loading,
        }}
      />
    </EntityDialog>
  );
}
