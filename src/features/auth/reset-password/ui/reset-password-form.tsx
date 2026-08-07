'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/features/auth/reset-password/model/schema';
import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/PasswordInput';

export function ResetPasswordForm({ token }: { token: string }) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: standardSchemaResolver(resetPasswordSchema),
    defaultValues: { newPassword: '' },
  });

  const router = useRouter();

  const onSubmit = async (values: ResetPasswordValues) => {
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: values.newPassword }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setError('root', { message: error });
      return;
    }

    toast.success('Password reset. You can log in now.');
    router.push('/auth/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-15 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => <PasswordInput {...field} autoComplete="new-password" />}
          />
          {errors.newPassword && (
            <p className="text-sm text-destructive">{errors.newPassword.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}

        <Button
          className="h-12 w-55 rounded-4xl bg-destructive text-white shadow-xs shadow-black"
          type="submit"
        >
          RESET PASSWORD
        </Button>
      </div>
    </form>
  );
}
