import { graphql } from '@/shared/api/graphql';

export const SKILLS_QUERY = graphql(`
  query Skills {
    skills {
      id
      created_at
      name

      category {
        id
        name
        order
      }

      category_parent_name
    }
  }
`);
