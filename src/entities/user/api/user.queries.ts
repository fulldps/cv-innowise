import { graphql } from '@/shared/api/graphql';

export const USERS_QUERY = graphql(`
  query Users {
    users {
      id
      email
      department_name
      position_name

      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`);

export const USER_QUERY = graphql(`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      role

      department {
        id
      }

      position {
        id
      }

      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`);
