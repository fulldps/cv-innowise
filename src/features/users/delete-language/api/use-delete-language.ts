import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { DELETE_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import { mapDeleteLanguageInput } from '../model/delete-language.mapper';

export function useDeleteLanguage(userId: string) {
  const [mutate, state] = useMutation(DELETE_PROFILE_LANGUAGE_MUTATION);

  const deleteLanguages = async (languageNames: string[]) => {
    return mutate({
      variables: {
        language: mapDeleteLanguageInput(userId, languageNames),
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
    deleteLanguages,
    ...state,
  };
}
