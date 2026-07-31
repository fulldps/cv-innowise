'use client';

import { useForm, useFormState } from 'react-hook-form';
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
import { useEffect } from 'react';

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
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      positionId: '',
      role: UserRole.Employee,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!data?.user) return;

    form.reset(getEditUserDefaultValues(data.user));
  }, [data?.user, form]);

  const { isDirty } = useFormState({ control: form.control });

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
      <DialogContent className="max-w-4xl rounded-sm px-6 pb-2 pt-4">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[20px] font-semibold">Update user</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, async () => {
            await form.trigger();
          })}
          className="flex flex-col gap-2"
        >
          <UserForm
            form={form}
            departments={departments}
            positions={positions}
            disabled={{
              email: true,
              password: true,
              role: !canEditRole,
            }}
          />

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={handleClose}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={disabled || !isDirty}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              {updateLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
