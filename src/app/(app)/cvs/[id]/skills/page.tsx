'use client';

import { useParams } from 'next/navigation';

import { CvSkills } from '@/widgets/cv-skills';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  return <CvSkills cvId={id} />;
}
