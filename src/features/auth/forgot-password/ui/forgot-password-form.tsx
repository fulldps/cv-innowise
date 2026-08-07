'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/features/auth/forgot-password/model/schema';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    const res = await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setError('root', { message: error });
      return;
    }

    toast.success('Check your email for reset instructions');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-15 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                className="h-12 w-140"
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
            )}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
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

        <Link className="h-12 w-55 text-center text-sm text-muted-foreground" href="/auth/login">
          CANCEL
        </Link>
      </div>
    </form>
  );
}
