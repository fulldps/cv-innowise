import { useMutation } from '@apollo/client/react';

import { DELETE_LANGUAGE_MUTATION, LANGUAGES_QUERY } from '@/entities/language';

export function useDeleteLanguage() {
  const [mutate, state] = useMutation(DELETE_LANGUAGE_MUTATION);

  const deleteLanguage = async (languageId: string) => {
    return mutate({
      variables: {
        language: {
          languageId,
        },
      },

      refetchQueries: [{ query: LANGUAGES_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    deleteLanguage,
    ...state,
  };
}
