'use client';

import { useId, useState } from 'react';
import type { ComponentProps } from 'react';

import { Textarea } from './textarea';
import { cn } from '@/shared/lib/utils';

interface FloatingTextareaProps extends Omit<ComponentProps<'textarea'>, 'placeholder'> {
  label: string;
}

export function FloatingTextarea({
  label,
  id,
  value,
  onFocus,
  onBlur,
  className,
  ...props
}: FloatingTextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  const [focused, setFocused] = useState(false);

  const floated = focused || Boolean(value);

  return (
    <div className="relative min-w-0 w-full">
      <Textarea
        {...props}
        id={textareaId}
        value={value}
        className={cn(
          'peer field-sizing-fixed w-full min-w-0 min-h-60 resize-none wrap-break-words',
          className,
        )}
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
        htmlFor={textareaId}
        className={cn(
          'pointer-events-none absolute left-1.5 rounded-none text-muted-foreground transition-all duration-200 peer-focus:text-destructive',
          floated ? '-top-2 z-10 bg-background px-1 text-[13px]' : 'top-3 px-1 text-base',
        )}
      >
        {label}
      </label>
    </div>
  );
}
