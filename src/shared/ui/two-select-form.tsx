'use client';

import {
  Controller,
  useFormState,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

import { FloatingSelect } from '@/shared/ui/floating-select';
import { FieldError } from '@/shared/ui/field-error';

interface Option {
  id: string;
  name: string;
}

interface SelectFieldsFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  firstField: FieldPath<T>;
  firstLabel: string;
  firstOptions: Option[];
  firstDisabled?: boolean;

  secondField: FieldPath<T>;
  secondLabel: string;
  secondOptions: Option[];
  secondDisabled?: boolean;
}

export function SelectFieldsForm<T extends FieldValues>({
  form,

  firstField,
  firstLabel,
  firstOptions,
  firstDisabled = false,

  secondField,
  secondLabel,
  secondOptions,
  secondDisabled = false,
}: SelectFieldsFormProps<T>) {
  const { control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="space-y-1">
        <Controller
          control={control}
          name={firstField}
          render={({ field }) => (
            <FloatingSelect
              label={firstLabel}
              value={field.value}
              onValueChange={field.onChange}
              options={firstOptions}
              disabled={firstDisabled}
              aria-invalid={!!errors[firstField]}
            />
          )}
        />

        <FieldError message={errors[firstField]?.message as string | undefined} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name={secondField}
          render={({ field }) => (
            <FloatingSelect
              label={secondLabel}
              value={field.value}
              onValueChange={field.onChange}
              options={secondOptions}
              disabled={secondDisabled}
              aria-invalid={!!errors[secondField]}
            />
          )}
        />

        <FieldError message={errors[secondField]?.message as string | undefined} />
      </div>
    </div>
  );
}
