import { useApolloClient, useMutation } from '@apollo/client/react';

import { UPLOAD_AVATAR_MUTATION, USER_QUERY } from '@/entities/user';

interface UploadAvatarInput {
  userId: string;
  base64: string;
  size: number;
  type: string;
}

export function useUploadAvatar() {
  const client = useApolloClient();

  const [uploadAvatarMutation, uploadAvatarState] = useMutation(UPLOAD_AVATAR_MUTATION);

  const uploadAvatar = async ({ userId, base64, size, type }: UploadAvatarInput) => {
    const { data } = await uploadAvatarMutation({
      variables: {
        avatar: {
          userId,
          // cv-node передаёт base64 напрямую в Cloudinary без сборки Data URI
          // (баг: игнорирует свой же `type`), поэтому шлём готовый data URI сами
          base64: `data:${type};base64,${base64}`,
          size,
          type,
        },
      },
    });
    await client.refetchQueries({ include: [USER_QUERY] });
    return data?.uploadAvatar ?? null;
  };

  return {
    uploadAvatar,
    loading: uploadAvatarState.loading,
    error: uploadAvatarState.error,
  };
}
