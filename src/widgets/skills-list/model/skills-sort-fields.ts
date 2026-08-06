export const SKILLS_SORT_FIELDS = {
  name: 'name',
  type: 'type',
  category: 'category',
} as const;

export type SkillsSortField = (typeof SKILLS_SORT_FIELDS)[keyof typeof SKILLS_SORT_FIELDS];
