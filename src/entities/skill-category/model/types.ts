import type { SkillCategoriesQuery } from '@/shared/api/graphql/graphql';

export type SkillCategory = SkillCategoriesQuery['skillCategories'][number];
