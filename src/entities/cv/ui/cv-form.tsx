'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

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
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs">
          Name
        </label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input className="h-12" id="name" disabled={disabled} {...field} placeholder="Name" />
          )}
        />
        {errors.name && <p className="text-sm text-[#c72f31]">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="education" className="text-xs">
          Education
        </label>
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <Input
              className="h-12"
              id="education"
              disabled={disabled}
              {...field}
              placeholder="Education"
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-xs">
          Description
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              id="description"
              disabled={disabled}
              {...field}
              className="h-40 pb-28"
              placeholder="Description"
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-[#c72f31]">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
}
