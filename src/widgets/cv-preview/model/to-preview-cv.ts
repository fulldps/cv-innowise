import { groupCvSkills } from '@/entities/cv/lib/group-cv-skills';
import type { SkillCategory } from '@/entities/skill-category';
import type { CvQuery } from '@/shared/api/graphql/graphql';

import type { PreviewCv } from './types';

type CvData = NonNullable<CvQuery['cv']>;

export function toPreviewCv(cv: CvData, categories: SkillCategory[]): PreviewCv {
  const groups = groupCvSkills(cv.skills, categories);
  const projects = cv.projects ?? [];

  return {
    fullName: cv.user?.profile?.full_name ?? '',
    position: cv.user?.position_name ?? '',
    education: cv.education ?? '',
    name: cv.name,
    description: cv.description,
    languages: cv.languages.map((language) => ({
      name: language.name,
      proficiency: language.proficiency,
    })),
    domains: [...new Set(projects.map((project) => project.domain))],
    skillGroups: groups.map((group) => ({
      category: group.category,
      skills: group.skills.map((skill) => skill.name),
    })),
    professionalSkills: groups.map((group) => ({
      category: group.category,
      skills: group.skills.map((skill) => skill.name),
      experienceYears: '—',
      lastUsed: '—',
    })),
    projects: projects.map((project) => ({
      name: project.name,
      description: project.description,
      roles: project.roles,
      responsibilities: project.responsibilities,
      environment: project.environment ?? [],
      period: `${project.start_date} – ${project.end_date ?? 'Till now'}`,
    })),
  };
}
