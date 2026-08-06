'use client';

import { useEffect } from 'react';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useCurrentUser, useUser, useUserFormOptions } from '@/entities/user';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { UserForm } from '@/shared/ui/user-form';

import { useEditUser } from '../api/use-edit-user';

import { editUserSchema } from '../model/edit-user.schema';

import { getEditUserDefaultValues } from '../model/edit-user.defaults';

import type { UserFormValues } from '@/shared/model/user-form.types';

interface EditUserDialogProps {
  userId: string | null;

  open: boolean;

  onOpenChange(open: boolean): void;
}

export function EditUserDialog({ userId, open, onOpenChange }: EditUserDialogProps) {
  const { departments, positions } = useUserFormOptions();

  const { data, loading: userLoading } = useUser(userId ?? undefined);

  const { editUser, loading: updateLoading } = useEditUser();

  const currentUser = useCurrentUser();

  const form = useForm<UserFormValues>({
    resolver: standardSchemaResolver(editUserSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      departmentId: '',
      positionId: '',
      role: 'Employee',
    },

    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (data?.user) {
      form.reset(getEditUserDefaultValues(data.user));
    }
  }, [data?.user, form]);

  const { isDirty } = useFormState({
    control: form.control,
  });

  const disabled = userLoading || updateLoading;

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: UserFormValues) => {
    if (!userId) return;

    try {
      await editUser(userId, values);

      toast.success('User updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update user');
    }
  };

  const canEditRole = currentUser.role === 'Admin';

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Update user"

      submitText="Update"
      loadingText="Updating..."

      loading={disabled}
      submitDisabled={!isDirty}

      onSubmit={form.handleSubmit(onSubmit)}

      onCancel={handleClose}

      maxWidth="max-w-4xl"
    >
      <UserForm
        form={form}

        departments={departments}
        positions={positions}

        disabled={{
          fields: disabled,

          email: true,

          password: true,

          role: disabled || !canEditRole,
        }}
      />
    </EntityDialog>
  );
}
