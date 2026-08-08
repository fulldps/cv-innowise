'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FieldError } from '@/shared/ui/field-error';

import type { PositionFormValues } from '../model/position-form.types';

interface PositionFormProps {
  form: UseFormReturn<PositionFormValues>;

  disabled?: boolean;
}

export function PositionForm({ form, disabled = false }: PositionFormProps) {
  const { control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="space-y-1">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <FloatingInput {...field} autoFocus label="Position name" disabled={disabled} />
        )}
      />

      <FieldError message={errors.name?.message} />
    </div>
  );
}
