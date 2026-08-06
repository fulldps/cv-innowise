'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FieldError } from '@/shared/ui/field-error';

import type { LanguageFormValues } from '@/shared/model/language-form.types';

interface LanguageFormProps {
  form: UseFormReturn<LanguageFormValues>;

  disabled?: boolean;
}

export function LanguageForm({ form, disabled = false }: LanguageFormProps) {
  const { control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-1">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FloatingInput {...field} autoFocus label="Language name" disabled={disabled} />
          )}
        />

        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="nativeName"
          render={({ field }) => (
            <FloatingInput
              {...field}
              value={field.value ?? ''}
              label="Native name"
              disabled={disabled}
            />
          )}
        />

        <FieldError message={errors.nativeName?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="iso2"
          render={({ field }) => <FloatingInput {...field} label="ISO2" disabled={disabled} />}
        />

        <FieldError message={errors.iso2?.message} />
      </div>
    </div>
  );
}
