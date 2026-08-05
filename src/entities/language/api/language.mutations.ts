import { graphql } from '@/shared/api/graphql';

export const ADD_PROFILE_LANGUAGE_MUTATION = graphql(`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`);

export const UPDATE_PROFILE_LANGUAGE_MUTATION = graphql(`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`);

export const DELETE_PROFILE_LANGUAGE_MUTATION = graphql(`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`);
