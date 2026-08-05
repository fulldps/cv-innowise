import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { UPDATE_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import { mapUpdateLanguageInput } from '../model/edit-language.mapper';
import type { EditLanguageFormValues } from '../model/edit-language.schema';
import type { EditingLanguage } from '../model/edit-language.types';

export function useEditLanguage(userId: string) {
  const [mutate, state] = useMutation(UPDATE_PROFILE_LANGUAGE_MUTATION);

  const editLanguage = async (values: EditLanguageFormValues, editingLanguage: EditingLanguage) => {
    return mutate({
      variables: {
        language: mapUpdateLanguageInput(values, editingLanguage, userId),
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
    editLanguage,
    ...state,
  };
}
