import { graphql } from '@/shared/api/graphql';

export const SKILL_CATEGORIES_QUERY = graphql(`
  query SkillCategories {
    skillCategories {
      id
      name
      order

      parent {
        id
        name
      }

      children {
        id
        name
        order
      }
    }
  }
`);
