'use client';

import { ChevronDown, X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface EnvironmentSelectProps {
  label: string;
  value: string[];
  onChange(value: string[]): void;
  options: string[];
  disabled?: boolean;
}

export function EnvironmentSelect({
  label,
  value,
  onChange,
  options,
  disabled,
}: EnvironmentSelectProps) {
  const available = options.filter((option) => !value.includes(option));
  const floated = value.length > 0;

  const add = (item: string) => onChange([...value, item]);
  const remove = (item: string) => onChange(value.filter((current) => current !== item));

  return (
    <div className="relative">
      <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-md border border-input px-3 py-2">
        {value.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          >
            {item}
            <button
              type="button"
              disabled={disabled}
              onClick={() => remove(item)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                disabled={disabled || available.length === 0}
                className="ml-auto flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-50"
              >
                {floated && <span>Add skill</span>}
                <ChevronDown className="h-4 w-4" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
            {available.map((option) => (
              <DropdownMenuItem key={option} onClick={() => add(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
