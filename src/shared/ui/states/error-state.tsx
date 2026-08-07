import { AlertTriangle } from 'lucide-react';

import { State } from './state';

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again later',
}: ErrorStateProps) {
  return (
    <State
      icon={<AlertTriangle className="h-8 w-8 text-destructive" strokeWidth={2} />}
      title={title}
      message={message}
    />
  );
}
