'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import { FloatingInput } from './floating-input';
import { cn } from '@/shared/lib/utils';

interface FloatingPasswordInputProps extends Omit<ComponentProps<typeof FloatingInput>, 'type'> {
  label: string;
}

export function FloatingPasswordInput({
  label = 'Password',
  className,
  ...props
}: FloatingPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <FloatingInput
        {...props}
        label={label}
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
      />

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
