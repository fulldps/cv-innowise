'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { signupSchema, type SignupValues } from '@/features/auth/signup/model/schema';
import { Button } from '@/shared/ui/button';
import { FloatingInput } from '@/shared/ui/floating-input';
import { FloatingPasswordInput } from '@/shared/ui/floating-password-input';

export function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: standardSchemaResolver(signupSchema),
    defaultValues: { email: '', password: '' },
  });

  const router = useRouter();

  const onSubmit = async (values: SignupValues) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const { error } = await res.json();
      setError('root', { message: error });
      return;
    }
    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-15">
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FloatingInput {...field} label="Email" className="w-140 h-12" />
            )}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FloatingPasswordInput {...field} label="Password" className="w-140 h-12" />
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
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
