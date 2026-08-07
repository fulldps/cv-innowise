import type { ReactNode } from 'react';

interface StateProps {
  icon: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function State({ icon, title, message, action }: StateProps) {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>

      <h2 className="text-xl font-semibold text-primary">{title}</h2>

      {message && (
        <p className="mt-2 max-w-md text-base leading-6 text-muted-foreground">{message}</p>
      )}

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
