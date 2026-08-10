'use client';

import { useId, useState } from 'react';
import type { ComponentProps } from 'react';

import { Input } from './input';
import { cn } from '@/shared/lib/utils';

interface FloatingInputProps extends Omit<ComponentProps<'input'>, 'placeholder'> {
  label: string;
}

export function FloatingInput({
  label,
  id,
  value,
  onFocus,
  onBlur,
  className,
  ...props
}: FloatingInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [focused, setFocused] = useState(false);

  const floated = focused || Boolean(value);

  return (
    <div className="relative">
      <Input
        {...props}
        id={inputId}
        value={value}
        className={cn('peer', !floated && '[&::-webkit-datetime-edit]:text-transparent', className)}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />

      <label
        htmlFor={inputId}
        className={cn(
          'pointer-events-none absolute left-1.5 rounded-none text-muted-foreground transition-all duration-200 peer-focus:text-destructive',
          floated
            ? '-top-2 z-10 bg-background px-1 text-[13px]'
            : 'top-1/2 -translate-y-1/2 px-1 text-base',
        )}
      >
        {label}
      </label>
    </div>
  );
}
