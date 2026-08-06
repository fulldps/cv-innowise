'use client';

import { useParams } from 'next/navigation';

import { useCv } from '@/entities/cv/api/use-cv';
import { groupCvSkills } from '@/entities/cv/lib/group-cv-skills';
import { useSkillCategories } from '@/entities/skill-category';
import { CvSkills } from '@/widgets/cv-skills';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { cv, loading, error } = useCv(id);
  const { data: categoriesData, loading: categoriesLoading } = useSkillCategories();

  if (loading || categoriesLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  if (!cv || !categoriesData?.skillCategories) return null;

  return <CvSkills groups={groupCvSkills(cv.skills, categoriesData.skillCategories)} />;
}
