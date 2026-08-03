'use client';

import { useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useUserFormOptions, type User } from '@/entities/user';

import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field-error';
import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingSelect } from '@/shared/ui/floating-select';

import { useUpdateProfile } from '../api/use-update-profile';
import { getProfileDefaultValues } from '../model/profile-form.defaults';
import { profileFormSchema, type ProfileFormValues } from '../model/profile-form.schema';

interface ProfileFormProps {
  user: User;
  canEdit: boolean;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}

export function ProfileForm({ user, canEdit, disabled, setDisabled }: ProfileFormProps) {
  const { departments, positions } = useUserFormOptions();

  const { updateProfile, loading } = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: standardSchemaResolver(profileFormSchema),
    defaultValues: getProfileDefaultValues(user),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { errors, isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    if (!form.formState.isDirty) {
      form.reset(getProfileDefaultValues(user));
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setDisabled(true);

    try {
      await updateProfile(user.id, values);

      form.reset(values);

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to update profile');
    } finally {
      setDisabled(false);
    }
  };

  const isDisabled = disabled || loading || !canEdit;

  return (
    <form
      className="max-w-200 mx-auto grid grid-cols-2 gap-x-6 gap-y-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="First Name"
              disabled={isDisabled}
              aria-invalid={!!errors.firstName}
            />
          )}
        />

        <FieldError message={errors.firstName?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Last Name"
              disabled={isDisabled}
              aria-invalid={!!errors.lastName}
            />
          )}
        />

        <FieldError message={errors.lastName?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="departmentId"
          render={({ field }) => (
            <FloatingSelect
              value={field.value}
              onValueChange={field.onChange}
              label="Department"
              options={departments}
              disabled={isDisabled}
              aria-invalid={!!errors.departmentId}
            />
          )}
        />

        <FieldError message={errors.departmentId?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="positionId"
          render={({ field }) => (
            <FloatingSelect
              value={field.value}
              onValueChange={field.onChange}
              label="Position"
              options={positions}
              disabled={isDisabled}
              aria-invalid={!!errors.positionId}
            />
          )}
        />

        <FieldError message={errors.positionId?.message} />
      </div>

      <div className="col-span-2 flex justify-end">
        <Button
          type="submit"
          disabled={isDisabled || !isDirty}
          className="h-11 w-96 rounded-full uppercase tracking-wide"
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
