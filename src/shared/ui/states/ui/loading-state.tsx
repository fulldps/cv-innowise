import { Spinner } from '@/shared/ui/spinner';

export function LoadingState() {
  return (
    <div className="flex min-h-105 items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
