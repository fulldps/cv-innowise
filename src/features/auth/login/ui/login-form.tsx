'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { loginSchema, type LoginValues } from '@/features/auth/login/model/schema';
import { Button } from '@/shared/ui/button';
import { FloatingPasswordInput } from '@/shared/ui/floating-password-input';
import { FloatingInput } from '@/shared/ui/floating-input';

export function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const router = useRouter();

  const onSubmit = async (values: LoginValues) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const { error } = await res.json();
      setError('root', { message: error });
      return;
    }
    router.push('/users');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[35rem] max-w-[calc(100vw_-_2rem)]">
      <div className="flex flex-col gap-4 mb-15">
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FloatingInput {...field} label="Email" className="h-12 w-full" />
            )}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FloatingPasswordInput {...field} label="Password" className="h-12 w-full" />
            )}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}
        <Button
          className="bg-destructive text-white w-55 h-12 rounded-4xl shadow-xs shadow-black"
          type="submit"
        >
          LOG IN
        </Button>
        <Link
          className="w-55 h-12 text-center text-sm text-muted-foreground"
          href="/auth/forgot-password"
        >
          FORGOT PASSWORD
        </Link>
      </div>
    </form>
  );
}
