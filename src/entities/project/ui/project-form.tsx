'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/shared/ui/button';
import { FloatingSelect } from '@/shared/ui/floating-select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { projectSchema } from '../model/schema';

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectOption {
  id: string;
  name: string;
}

interface ProjectFormProps {
  defaultValues: ProjectFormValues;
  submitLabel: string;
  submitting?: boolean;
  projects: ProjectOption[];
  onSubmit: (values: ProjectFormValues) => void | Promise<void>;
}

export function ProjectForm({
  defaultValues,
  submitLabel,
  submitting,
  projects,
  onSubmit,
}: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: standardSchemaResolver(projectSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name="projectId"
          render={({ field }) => (
            <FloatingSelect
              label="Project"
              value={field.value}
              onValueChange={field.onChange}
              options={projects}
              aria-invalid={!!errors.projectId}
            />
          )}
        />
        {errors.projectId && <p className="text-sm text-[#c72f31]">{errors.projectId.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <Controller
            control={control}
            name="start_date"
            render={({ field }) => <Input {...field} type="date" />}
          />
          {errors.start_date && (
            <p className="text-sm text-[#c72f31]">{errors.start_date.message}</p>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Controller
            control={control}
            name="end_date"
            render={({ field }) => <Input {...field} type="date" />}
          />
        </div>
      </div>

      <Controller
        control={control}
        name="responsibilities"
        render={({ field }) => <Textarea {...field} placeholder="Responsibilities (one per line)" />}
      />

      <Controller
        control={control}
        name="roles"
        render={({ field }) => <Textarea {...field} placeholder="Roles (one per line)" />}
      />

      <Button type="submit" disabled={submitting} className="bg-[#c72f31]">
        {submitLabel}
      </Button>
    </form>
  );
}
