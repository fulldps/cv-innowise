import { graphql } from '@/shared/api/graphql';

export const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`);

export const UPDATE_USER_MUTATION = graphql(`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`);

export const DELETE_USER_MUTATION = graphql(`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`);
