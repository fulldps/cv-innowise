import type { Profile } from '@/entities/profile';
import type { Skill } from '@/entities/skill';
import type { SkillCategory } from '@/entities/skill-category';

interface BuildGroupedSkillsParams {
  profile: Profile;
  skills: Skill[];
  categories: SkillCategory[];
}

export function buildGroupedSkills({ profile, skills, categories }: BuildGroupedSkillsParams) {
  const masteryMap = new Map(profile.skills.map((skill) => [skill.name, skill.mastery]));

  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => {
      const categorySkills = skills
        .filter((skill) => skill.category?.id === category.id)
        .map((skill) => ({
          ...skill,
          mastery: masteryMap.get(skill.name) ?? null,
        }))
        .filter((skill) => skill.mastery !== null);

      return {
        id: category.id,
        name: category.name,

        skills: categorySkills.map((skill) => ({
          ...skill,
          mastery: skill.mastery!,
        })),
      };
    })
    .filter((category) => category.skills.length > 0);
}
