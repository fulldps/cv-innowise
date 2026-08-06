import type { Profile } from '@/entities/profile';
import type { SkillCategory } from '@/entities/skill-category';

interface BuildGroupedSkillsParams {
  profile: Profile;
  categories: SkillCategory[];
}

export function buildGroupedSkills({ profile, categories }: BuildGroupedSkillsParams) {
  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      id: category.id,
      name: category.name,

      skills: profile.skills.filter((skill) => skill.categoryId === category.id),
    }))
    .filter((category) => category.skills.length > 0);
}
