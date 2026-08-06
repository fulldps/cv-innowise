import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { UPDATE_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import { mapUpdateUserLanguageInput } from '../model/edit-user-language.mapper';
import type { EditUserLanguageFormValues } from '../model/edit-user-language.schema';
import type { EditingUserLanguage } from '../model/edit-user-language.types';

export function useEditUserLanguage(userId: string) {
  const [mutate, state] = useMutation(UPDATE_PROFILE_LANGUAGE_MUTATION);

  const editUserLanguage = async (
    values: EditUserLanguageFormValues,
    editingUserLanguage: EditingUserLanguage,
  ) => {
    return mutate({
      variables: {
        language: mapUpdateUserLanguageInput(values, editingUserLanguage, userId),
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
    editUserLanguage,
    ...state,
  };
}
