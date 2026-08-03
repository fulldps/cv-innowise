import { graphql } from '@/shared/api/graphql';

export const UPDATE_PROFILE_MUTATION = graphql(`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`);
