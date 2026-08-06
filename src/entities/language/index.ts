export { useLanguages } from './api/use-languages';
export {
  ADD_PROFILE_LANGUAGE_MUTATION,
  UPDATE_PROFILE_LANGUAGE_MUTATION,
  DELETE_PROFILE_LANGUAGE_MUTATION,
  CREATE_LANGUAGE_MUTATION,
  UPDATE_LANGUAGE_MUTATION,
  DELETE_LANGUAGE_MUTATION,
} from './api/language.mutations';

export type {
  Language,
  AddProfileLanguageInput,
  UpdateProfileLanguageInput,
  DeleteProfileLanguageInput,
  CreateLanguageInput,
  UpdateLanguageInput,
  DeleteLanguageInput,
} from './model/types';
export {
  PROFICIENCY,
  PROFICIENCIES,
  PROFICIENCY_OPTIONS,
  type Proficiency,
} from './model/proficiency';
export { LANGUAGES_QUERY } from './api/languages.query';
