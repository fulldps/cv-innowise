'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingSelect } from '@/shared/ui/floating-select';
import { FieldError } from '@/shared/ui/field-error';

import type { SkillFormValues } from '@/shared/model/skill-form.types';

interface Option {
  id: string;
  name: string;
}

interface SkillFormProps {
  form: UseFormReturn<SkillFormValues>;

  categories: Option[];

  disabled?: boolean;
}

export function SkillForm({ form, categories, disabled = false }: SkillFormProps) {
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
            <FloatingInput {...field} autoFocus label="Skill name" disabled={disabled} />
          )}
        />

        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FloatingSelect
              label="Category"
              value={field.value}
              onValueChange={field.onChange}
              options={categories}
              disabled={disabled}
            />
          )}
        />

        <FieldError message={errors.categoryId?.message} />
      </div>
    </div>
  );
}
