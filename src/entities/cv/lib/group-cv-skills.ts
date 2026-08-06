import type { SkillCategory } from '@/entities/skill-category';

export function groupCvSkills<T extends { categoryId?: string | null }>(
  skills: readonly T[],
  categories: readonly SkillCategory[],
): { category: string; skills: T[] }[] {
  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      category: category.name,
      skills: skills.filter((skill) => skill.categoryId === category.id),
    }))
    .filter((group) => group.skills.length > 0);
}
