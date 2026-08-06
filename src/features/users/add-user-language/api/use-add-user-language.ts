import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { ADD_PROFILE_LANGUAGE_MUTATION } from '@/entities/language';

import type { Language } from '@/entities/language';

import { mapAddUserLanguageInput } from '../model/add-user-language.mapper';
import type { AddUserLanguageFormValues } from '../model/add-user-language.schema';

export function useAddUserLanguage(userId: string, languages: Language[]) {
  const [mutate, state] = useMutation(ADD_PROFILE_LANGUAGE_MUTATION);

  const addUserLanguage = async (values: AddUserLanguageFormValues) => {
    const language = languages.find((item) => item.id === values.languageId);

    if (!language) {
      throw new Error(`Language not found: ${values.languageId}`);
    }

    return mutate({
      variables: {
        language: mapAddUserLanguageInput(values, language, userId),
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
    addUserLanguage,
    ...state,
  };
}
