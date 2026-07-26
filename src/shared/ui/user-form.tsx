'use client';

import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { UserRole } from '@/entities/user';
import { UserFormValues } from '../model/user-form.types';
import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingSelect } from './floating-select';
import { FieldError } from './field-error';

interface Option {
  id: string;
  name: string;
}

interface UserFormDisabled {
  email?: boolean;
  password?: boolean;
  role?: boolean;
}

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
  departments: Option[];
  positions: Option[];
  disabled?: UserFormDisabled;
}

export function UserForm({
  form,
  departments,
  positions,
  disabled = {
    email: false,
    password: false,
    role: false,
  },
}: UserFormProps) {
  const { control } = form;

  const { errors } = useFormState({ control });

  const roleOptions = [
    {
      id: UserRole.Employee,
      name: 'Employee',
    },
    {
      id: UserRole.Admin,
      name: 'Admin',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-7 gap-y-1">
      <div className="space-y-1">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <FloatingInput
              {...field}
              label="Email"
              aria-invalid={!!errors.email}
              disabled={disabled.email}
            />
          )}
        />

        <FieldError message={errors.email?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <FloatingInput
              {...field}
              type="password"
              label="Password"
              aria-invalid={!!errors.password}
              disabled={disabled.password}
            />
          )}
        />

        <FieldError message={errors.password?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <FloatingInput
              {...field}
              autoFocus
              label="First Name"
              aria-invalid={!!errors.firstName}
            />
          )}
        />

        <FieldError message={errors.firstName?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <FloatingInput {...field} label="Last Name" aria-invalid={!!errors.lastName} />
          )}
        />

        <FieldError message={errors.lastName?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="departmentId"
          render={({ field }) => (
            <FloatingSelect
              label="Department"
              value={field.value}
              onValueChange={field.onChange}
              options={departments}
              aria-invalid={!!errors.departmentId}
            />
          )}
        />

        <FieldError message={errors.departmentId?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="positionId"
          render={({ field }) => (
            <FloatingSelect
              label="Position"
              value={field.value}
              onValueChange={field.onChange}
              options={positions}
              aria-invalid={!!errors.positionId}
            />
          )}
        />

        <FieldError message={errors.positionId?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <FloatingSelect
              label="Role"
              value={field.value}
              onValueChange={field.onChange}
              options={roleOptions}
              disabled={disabled.role}
              aria-invalid={!!errors.role}
            />
          )}
        />
      </div>
    </div>
  );
}
