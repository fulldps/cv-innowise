import type { DeleteProfileSkillInput } from '@/shared/api/graphql/graphql';

export function mapDeleteSkillInput(userId: string, skillNames: string[]): DeleteProfileSkillInput {
  return {
    userId,
    name: skillNames,
  };
}
