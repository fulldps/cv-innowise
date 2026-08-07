'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { FloatingSelect } from '@/shared/ui/floating-select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import type { ProjectFormValues } from '../model/schema';

interface ProjectOption {
  id: string;
  name: string;
}

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormValues>;
  projects: ProjectOption[];
  disabled?: boolean;
}

export function ProjectForm({ form, projects, disabled }: ProjectFormProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-4">
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
              disabled={disabled}
              aria-invalid={!!errors.projectId}
            />
          )}
        />
        {errors.projectId && <p className="text-sm text-destructive">{errors.projectId.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <Controller
            control={control}
            name="start_date"
            render={({ field }) => <Input {...field} type="date" disabled={disabled} />}
          />
          {errors.start_date && (
            <p className="text-sm text-destructive">{errors.start_date.message}</p>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Controller
            control={control}
            name="end_date"
            render={({ field }) => <Input {...field} type="date" disabled={disabled} />}
          />
        </div>
      </div>

      <Controller
        control={control}
        name="responsibilities"
        render={({ field }) => (
          <Textarea {...field} disabled={disabled} placeholder="Responsibilities (one per line)" />
        )}
      />

      <Controller
        control={control}
        name="roles"
        render={({ field }) => (
          <Textarea {...field} disabled={disabled} placeholder="Roles (one per line)" />
        )}
      />
    </div>
  );
}
