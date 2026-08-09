'use client';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';
import { ErrorState, LoadingState } from '@/shared/ui/states';
import { CvsTable } from '@/widgets/cvs-table/ui/cvs-table';

export default function CvsPage() {
  const { cvs, loading, error } = useCvsList();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return <CvsTable cvs={cvs} />;
}
