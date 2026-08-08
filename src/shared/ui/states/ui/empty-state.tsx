import { SearchX } from 'lucide-react';

import { State } from './state';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = 'No data found',
  message = 'Try changing your search or filters',
}: EmptyStateProps) {
  return (
    <State
      icon={<SearchX className="h-8 w-8 text-muted-foreground" strokeWidth={2} />}
      title={title}
      message={message}
    />
  );
}
