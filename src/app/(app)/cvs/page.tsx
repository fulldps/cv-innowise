'use client';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';
import { CvsTable } from '@/widgets/cvs-table/ui/cvs-table';

export default function CvsPage() {
  const { cvs, loading, error } = useCvsList();

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <>
      <CvsTable cvs={cvs} />
    </>
  );
}
