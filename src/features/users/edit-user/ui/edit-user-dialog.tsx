'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useCurrentUser, UserRole, useUser, useUserFormOptions } from '@/entities/user';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { UserForm } from '@/shared/ui/user-form';

import { useEditUser } from '../api/use-edit-user';
import { editUserSchema } from '../model/edit-user.schema';
import { getEditUserDefaultValues } from '../model/edit-user.defaults';
import { UserFormValues } from '@/shared/model/user-form.types';

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

  const editUserDefaultValues = useMemo(
    () => (data?.user ? getEditUserDefaultValues(data.user) : undefined),
    [data],
  );

  const form = useForm<UserFormValues>({
    resolver: zodResolver(editUserSchema),
    values: editUserDefaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

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

  const disabled = userLoading || updateLoading;

  const canEditRole = currentUser.role === UserRole.Admin;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }

        onOpenChange(true);
      }}
    >
      <DialogContent className="max-w-4xl rounded-md px-8 pb-8 pt-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[18px] font-semibold">Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
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

          <DialogFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={handleClose}
              className="h-14 w-67.5 rounded-full uppercase tracking-wide"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={disabled}
              className="h-14 w-67.5 rounded-full uppercase tracking-wide"
            >
              {updateLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
