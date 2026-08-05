import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { ADD_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import type { Language } from '@/entities/language';

import { mapAddLanguageInput } from '../model/add-language.mapper';
import type { AddLanguageFormValues } from '../model/add-language.schema';

export function useAddLanguage(userId: string, languages: Language[]) {
  const [mutate, state] = useMutation(ADD_PROFILE_LANGUAGE_MUTATION);

  const addLanguage = async (values: AddLanguageFormValues) => {
    const language = languages.find((item) => item.id === values.languageId);

    if (!language) {
      throw new Error(`Language not found: ${values.languageId}`);
    }

    return mutate({
      variables: {
        language: mapAddLanguageInput(values, language, userId),
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
    addLanguage,
    ...state,
  };
}
