'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingTextarea } from '@/shared/ui/floating-textarea';
import { FieldError } from '@/shared/ui/field-error';

import type { UserCvFormValues } from '@/shared/model/user-cv-form.types';

interface UserCvFormProps {
  form: UseFormReturn<UserCvFormValues>;

  disabled?: boolean;
}

export function UserCvForm({ form, disabled = false }: UserCvFormProps) {
  const { control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FloatingInput {...field} autoFocus label="CV name" disabled={disabled} />
          )}
        />

        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <FloatingTextarea
              {...field}
              label="Description"
              disabled={disabled}
            />
          )}
        />

        <FieldError message={errors.description?.message} />
      </div>
    </div>
  );
}
