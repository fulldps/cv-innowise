import type { SkillsQuery } from '@/shared/api/graphql/graphql';

export type Skill = SkillsQuery['skills'][number];
export type { AddProfileSkillInput, UpdateProfileSkillInput, DeleteProfileSkillInput } from '@/shared/api/graphql/graphql';
