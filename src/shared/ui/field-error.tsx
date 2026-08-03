'use client';

import { cn } from '../lib/utils';

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  return (
    <p
      className={cn(
        'ml-2.5 min-h-5 text-[13px] transition-opacity',
        message ? 'text-destructive opacity-100' : 'opacity-0',
      )}
    >
      {message ?? ' '}
    </p>
  );
}
