import type { SkillsQuery } from '@/shared/api/graphql/graphql';

export type Skill = SkillsQuery['skills'][number];
export type {
  AddProfileSkillInput,
  UpdateProfileSkillInput,
  DeleteProfileSkillInput,
  CreateSkillInput,
  UpdateSkillInput,
  DeleteSkillInput,
} from '@/shared/api/graphql/graphql';
