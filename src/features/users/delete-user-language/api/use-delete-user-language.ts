import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { DELETE_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import { mapDeleteUserLanguageInput } from '../model/delete-user-language.mapper';

export function useDeleteUserLanguage(userId: string) {
  const [mutate, state] = useMutation(DELETE_PROFILE_LANGUAGE_MUTATION);

  const deleteUserLanguages = async (languageNames: string[]) => {
    return mutate({
      variables: {
        language: mapDeleteUserLanguageInput(userId, languageNames),
      },

      refetchQueries: [
        {
          query: PROFILE_QUERY,
          variables: {
            userId,
          },
        },
      ],

      awaitRefetchQueries: true,
    });
  };

  return {
    deleteUserLanguages,
    ...state,
  };
}
