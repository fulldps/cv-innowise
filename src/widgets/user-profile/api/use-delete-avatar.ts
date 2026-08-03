import { useApolloClient, useMutation } from '@apollo/client/react';

import { DELETE_AVATAR_MUTATION, USER_QUERY } from '@/entities/user';

export function useDeleteAvatar() {
  const client = useApolloClient();

  const [deleteAvatarMutation, deleteAvatarState] = useMutation(DELETE_AVATAR_MUTATION);

  const deleteAvatar = async (userId: string) => {
    await deleteAvatarMutation({
      variables: {
        avatar: {
          userId,
        },
      },
    });

    await client.refetchQueries({
      include: [USER_QUERY],
    });
  };

  return {
    deleteAvatar,
    loading: deleteAvatarState.loading,
    error: deleteAvatarState.error,
  };
}
