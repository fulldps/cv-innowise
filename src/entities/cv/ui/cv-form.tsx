'use client';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { cvSchema } from '../model/schema';

type CvFormValues = z.infer<typeof cvSchema>;

interface CvFormProps {
  defaultValues: CvFormValues;
  submitLabel: string;
  submitting?: boolean;
  onSubmit: (values: CvFormValues) => void | Promise<void>;
}
export function CvForm({ onSubmit, submitLabel, submitting, defaultValues }: CvFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CvFormValues>({
    resolver: standardSchemaResolver(cvSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xs">
          Name
        </label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => <Input className="h-12" id="name" {...field} placeholder="Name" />}
        />
        {errors.name && <p className="text-sm text-[#c72f31]">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="Education" className="text-xs">
          Education
        </label>
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <Input className="h-12" id="education" {...field} placeholder="Education" />
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

      {errors.root && <p className="text-sm text-[#c72f31]">{errors.root.message}</p>}

      <Button
        type="submit"
        disabled={submitting}
        className="w-100 h-12 rounded-4xl self-end  bg-[#c72f31]"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
