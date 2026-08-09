'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { useSkills } from '@/entities/skill';
import { FieldError } from '@/shared/ui/field-error';
import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingTextarea } from '@/shared/ui/floating-textarea';

import type { ProjectFormValues } from '../model/project-form.types';
import { EnvironmentSelect } from './environment-select';

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormValues>;
  disabled?: boolean;
}

export function ProjectForm({ form, disabled = false }: ProjectFormProps) {
  const { control } = form;

  const { errors } = useFormState({ control });

  const { data } = useSkills();
  const skillOptions = (data?.skills ?? []).map((skill) => skill.name);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="space-y-1">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FloatingInput {...field} autoFocus label="Name" disabled={disabled} />
            )}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="space-y-1">
          <Controller
            control={control}
            name="domain"
            render={({ field }) => <FloatingInput {...field} label="Domain" disabled={disabled} />}
          />
          <FieldError message={errors.domain?.message} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="space-y-1">
          <Controller
            control={control}
            name="start_date"
            render={({ field }) => (
              <FloatingInput {...field} type="date" label="Start Date" disabled={disabled} />
            )}
          />
          <FieldError message={errors.start_date?.message} />
        </div>

        <div className="space-y-1">
          <Controller
            control={control}
            name="end_date"
            render={({ field }) => (
              <FloatingInput {...field} type="date" label="End Date" disabled={disabled} />
            )}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <FloatingTextarea {...field} label="Description" disabled={disabled} />
          )}
        />
        <FieldError message={errors.description?.message} />
      </div>

      <Controller
        control={control}
        name="environment"
        render={({ field }) => (
          <EnvironmentSelect
            label="Environment"
            value={field.value}
            onChange={field.onChange}
            options={skillOptions}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}
