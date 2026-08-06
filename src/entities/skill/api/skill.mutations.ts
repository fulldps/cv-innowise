import { graphql } from '@/shared/api/graphql';

export const ADD_PROFILE_SKILL_MUTATION = graphql(`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`);

export const UPDATE_PROFILE_SKILL_MUTATION = graphql(`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`);

export const DELETE_PROFILE_SKILL_MUTATION = graphql(`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`);

export const CREATE_SKILL_MUTATION = graphql(`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      created_at
      name

      category {
        id
        name
        order
      }
    }
  }
`);

export const UPDATE_SKILL_MUTATION = graphql(`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      created_at
      name

      category {
        id
        name
        order
      }
    }
  }
`);

export const DELETE_SKILL_MUTATION = graphql(`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      affected
    }
  }
`);
