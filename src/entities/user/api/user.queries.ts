import { graphql } from '@/shared/api/graphql';

export const USERS_QUERY = graphql(`
  query Users {
    users {
      id
      email
      department_name
      position_name

      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`);
