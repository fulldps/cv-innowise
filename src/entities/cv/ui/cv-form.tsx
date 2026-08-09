'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingTextarea } from '@/shared/ui/floating-textarea';

import type { CvFormValues } from '../model/schema';

interface CvFormProps {
  form: UseFormReturn<CvFormValues>;
  disabled?: boolean;
}

export function CvForm({ form, disabled }: CvFormProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FloatingInput label="Name" {...field} className="h-12" disabled={disabled} />
          )}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <FloatingInput label="Education" {...field} className="h-12" disabled={disabled} />
          )}
        />
      </div>

      <div className="flex flex-col">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <FloatingTextarea
              disabled={disabled}
              {...field}
              className="h-40 pb-28"
              label="Description"
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
}
