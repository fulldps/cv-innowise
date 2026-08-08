'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FieldError } from '@/shared/ui/field-error';

import type { DepartmentFormValues } from '../model/department-form.types';

interface DepartmentFormProps {
  form: UseFormReturn<DepartmentFormValues>;

  disabled?: boolean;
}

export function DepartmentForm({ form, disabled = false }: DepartmentFormProps) {
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
          <FloatingInput {...field} autoFocus label="Department name" disabled={disabled} />
        )}
      />

      <FieldError message={errors.name?.message} />
    </div>
  );
}
