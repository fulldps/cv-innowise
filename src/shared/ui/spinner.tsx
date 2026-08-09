import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn('h-6 w-6 animate-spin text-destructive', className)}
    />
  );
}
