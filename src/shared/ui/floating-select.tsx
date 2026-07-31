'use client';

import { useId, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface Option {
  id: string;
  name: string;
}

interface FloatingSelectProps {
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  className?: string;
  'aria-invalid'?: boolean;
}

export function FloatingSelect({
  label,
  value,
  onValueChange,
  options,
  disabled,
  className,
  ...props
}: FloatingSelectProps) {
  const generatedId = useId();

  const [focused, setFocused] = useState(false);

  const floated = focused || Boolean(value);

  return (
    <div className="relative">
      <Select
        value={value ?? ''}
        disabled={disabled}
        onValueChange={(newValue) => {
          onValueChange(newValue ?? '');
        }}
      >
        <SelectTrigger
          id={generatedId}
          className={cn('peer w-full', className)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        >
          <SelectValue>{options.find((option) => option.id === value)?.name}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label
        className={cn(
          'pointer-events-none absolute left-1.5 rounded-none text-muted-foreground transition-all duration-200',
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
