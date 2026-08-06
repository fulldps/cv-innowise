import { useMutation } from '@apollo/client/react';

import { UPDATE_LANGUAGE_MUTATION, LANGUAGES_QUERY } from '@/entities/language';

import { mapUpdateLanguageInput } from '../model/edit-language.mapper';

import type { EditLanguageFormValues } from '../model/edit-language.schema';

export function useEditLanguage() {
  const [mutate, state] = useMutation(UPDATE_LANGUAGE_MUTATION);

  const editLanguage = async (languageId: string, values: EditLanguageFormValues) => {
    return mutate({
      variables: {
        language: mapUpdateLanguageInput(languageId, values),
      },

      refetchQueries: [{ query: LANGUAGES_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    editLanguage,

    loading: state.loading,

    error: state.error,
  };
}
