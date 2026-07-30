'use client';

import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useUserFormOptions } from '@/entities/user';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { UserForm } from '@/shared/ui/user-form';

import { useCreateUser } from '../api/use-create-user';
import { createUserSchema } from '../model/create-user.schema';
import { getCreateUserDefaultValues } from '../model/create-user.defaults';
import { UserFormValues } from '@/shared/model/user-form.types';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const { departments, positions } = useUserFormOptions();

  const { createUser, loading } = useCreateUser();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(createUserSchema),

    defaultValues: getCreateUserDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({ control: form.control });

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
          <DialogTitle className="text-[20px] font-semibold">Create user</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, async () => {
            await form.trigger();
          })}
          className="flex flex-col gap-2"
        >
          <UserForm form={form} departments={departments} positions={positions} />

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading || !isValid}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
