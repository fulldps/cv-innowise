'use client';

import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { useSkillCategories } from '@/entities/skill-category';
import { ErrorState, LoadingState } from '@/shared/ui/states';
import { CvPreview, toPreviewCv } from '@/widgets/cv-preview';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();

  if (loading || categoriesLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!cv || !categoriesData?.skillCategories) return null;

  return <CvPreview cv={toPreviewCv(cv, categoriesData.skillCategories)} />;
}
