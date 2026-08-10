import type { DeleteProfileSkillInput } from '@/shared/api/graphql/graphql';

export function mapDeleteUserSkillInput(
  userId: string,
  skillNames: string[],
): DeleteProfileSkillInput {
  return {
    userId,
    name: skillNames,
  };
}
