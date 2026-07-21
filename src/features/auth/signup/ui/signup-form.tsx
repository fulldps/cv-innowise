'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { signupSchema, type SignupValues } from '@/features/auth/signup/model/schema';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/PasswordInput';

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
              <Input
                {...field}
                className="w-140 h-12"
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
            )}
          />
          {errors.email && <p className="text-sm text-[#c72f31]">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="password"
            render={({ field }) => <PasswordInput {...field} autoComplete="new-password" />}
          />
          {errors.password && <p className="text-sm text-[#c72f31]">{errors.password.message}</p>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {errors.root && <p className="text-sm text-[#c72f31]">{errors.root.message}</p>}
        <Button className="bg-[#c72f31] w-55 h-12 rounded-4xl shadow-xs shadow-black" type="submit">
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
