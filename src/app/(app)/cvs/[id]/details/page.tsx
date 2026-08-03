'use client';

import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { UpdateCv } from '@/features/cv/update-cv';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  if (!cv) return null;

  return (
    <div>
      <UpdateCv cv={cv} />
    </div>
  );
}
