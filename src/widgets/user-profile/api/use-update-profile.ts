import { useApolloClient, useMutation } from '@apollo/client/react';

import { UPDATE_PROFILE_MUTATION, UPDATE_USER_MUTATION, USER_QUERY } from '@/entities/user';

import { mapUpdateProfileInput } from '../model/update-profile.mapper';
import { mapUpdateUserInput } from '../model/update-user.mapper';
import type { ProfileFormValues } from '../model/profile-form.schema';

export function useUpdateProfile() {
  const [updateUserMutation, updateUserState] = useMutation(UPDATE_USER_MUTATION);

  const [updateProfileMutation, updateProfileState] = useMutation(UPDATE_PROFILE_MUTATION);

  const client = useApolloClient();

  const updateProfile = async (userId: string, values: ProfileFormValues) => {
    await Promise.all([
      updateUserMutation({
        variables: {
          user: mapUpdateUserInput(userId, values),
        },
      }),

      updateProfileMutation({
        variables: {
          profile: mapUpdateProfileInput(userId, values),
        },
      }),
    ]);

    await client.refetchQueries({
      include: [USER_QUERY],
    });
  };

  return {
    updateProfile,

    loading: updateUserState.loading || updateProfileState.loading,

    error: updateUserState.error ?? updateProfileState.error,
  };
}
