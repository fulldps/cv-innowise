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
      department {
        id
      }
      position {
        id
      }
      role
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

export const UPLOAD_AVATAR_MUTATION = graphql(`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`);

export const DELETE_AVATAR_MUTATION = graphql(`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`);
