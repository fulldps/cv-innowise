import { useMutation } from '@apollo/client/react';

import { CREATE_LANGUAGE_MUTATION, LANGUAGES_QUERY } from '@/entities/language';

import type { CreateLanguageFormValues } from '../model/create-language.schema';

import { mapCreateLanguageInput } from '../model/create-language.mapper';

export function useCreateLanguage() {
  const [mutate, state] = useMutation(CREATE_LANGUAGE_MUTATION);

  const createLanguage = async (values: CreateLanguageFormValues) => {
    return mutate({
      variables: {
        language: mapCreateLanguageInput(values),
      },

      refetchQueries: [{ query: LANGUAGES_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    createLanguage,
    ...state,
  };
}
