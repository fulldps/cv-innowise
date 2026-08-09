'use client';

import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { UpdateCv } from '@/features/cv/update-cv';
import { ErrorState, LoadingState } from '@/shared/ui/states';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!cv) return null;

  return (
    <div className="flex flex-col justify-center px-40 max-lg:px-4">
      <UpdateCv cv={cv} />
    </div>
  );
}
