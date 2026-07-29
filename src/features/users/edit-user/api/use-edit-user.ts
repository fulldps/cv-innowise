import { useApolloClient, useMutation } from '@apollo/client/react';

import { UPDATE_USER_MUTATION, UPDATE_PROFILE_MUTATION, USERS_QUERY } from '@/entities/user';

import { mapUpdateUserInput } from '../model/edit-user.mapper';
import { mapUpdateProfileInput } from '../model/edit-profile.mapper';
import { UserFormValues } from '@/shared/model/user-form.types';

export function useEditUser() {
  const [updateUserMutation, updateUserState] = useMutation(UPDATE_USER_MUTATION);

  const [updateProfileMutation, updateProfileState] = useMutation(UPDATE_PROFILE_MUTATION);

  const client = useApolloClient();

  const editUser = async (userId: string, values: UserFormValues) => {
    await updateUserMutation({
      variables: {
        user: mapUpdateUserInput(userId, values),
      },
    });
    await updateProfileMutation({
      variables: {
        profile: mapUpdateProfileInput(userId, values),
      },
    });
    await client.refetchQueries({
      include: [USERS_QUERY],
    });
  };

  return {
    editUser,

    loading: updateUserState.loading || updateProfileState.loading,

    error: updateUserState.error ?? updateProfileState.error,
  };
}
