/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.CreateCvDocument,
    "\n  query Cv($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n        description\n        environment\n        roles\n        responsibilities\n        project {\n          id\n        }\n      }\n    }\n  }\n": typeof types.CvDocument,
    "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.CvsDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": typeof types.DeleteCvDocument,
    "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n    }\n  }\n": typeof types.UpdateCvDocument,
    "\n  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": typeof types.AddProfileLanguageDocument,
    "\n  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": typeof types.UpdateProfileLanguageDocument,
    "\n  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": typeof types.DeleteProfileLanguageDocument,
    "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.CreateLanguageDocument,
    "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.UpdateLanguageDocument,
    "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n": typeof types.DeleteLanguageDocument,
    "\n  query Languages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.LanguagesDocument,
    "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  query Profile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n\n      skills {\n        name\n        categoryId\n        mastery\n      }\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": typeof types.ProfileDocument,
    "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n      }\n    }\n  }\n": typeof types.AddCvProjectDocument,
    "\n  query Project($projectId: ID!) {\n    project(projectId: $projectId) {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n": typeof types.ProjectDocument,
    "\n  query Projects {\n    projects {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n": typeof types.ProjectsDocument,
    "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n      }\n    }\n  }\n": typeof types.RemoveCvProjectDocument,
    "\n  query SkillCategories {\n    skillCategories {\n      id\n      name\n      order\n\n      parent {\n        id\n        name\n      }\n\n      children {\n        id\n        name\n        order\n      }\n    }\n  }\n": typeof types.SkillCategoriesDocument,
    "\n  mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n    addProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": typeof types.AddProfileSkillDocument,
    "\n  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": typeof types.UpdateProfileSkillDocument,
    "\n  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": typeof types.DeleteProfileSkillDocument,
    "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n": typeof types.CreateSkillDocument,
    "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n": typeof types.UpdateSkillDocument,
    "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n": typeof types.DeleteSkillDocument,
    "\n  query Skills {\n    skills {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n\n      category_parent_name\n    }\n  }\n": typeof types.SkillsDocument,
    "\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n": typeof types.DepartmentsDocument,
    "\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n": typeof types.PositionsDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      department {\n        id\n      }\n      position {\n        id\n      }\n      role\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation UploadAvatar($avatar: UploadAvatarInput!) {\n    uploadAvatar(avatar: $avatar)\n  }\n": typeof types.UploadAvatarDocument,
    "\n  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $avatar)\n  }\n": typeof types.DeleteAvatarDocument,
    "\n  query Users {\n    users {\n      id\n      email\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n      }\n    }\n  }\n": typeof types.UsersDocument,
    "\n  query User($userId: ID!) {\n    user(userId: $userId) {\n      id\n      email\n      role\n\n      department {\n        id\n        name\n      }\n\n      position {\n        id\n        name\n      }\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n        created_at\n      }\n    }\n  }\n": typeof types.UserDocument,
};
const documents: Documents = {
    "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateCvDocument,
    "\n  query Cv($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n        description\n        environment\n        roles\n        responsibilities\n        project {\n          id\n        }\n      }\n    }\n  }\n": types.CvDocument,
    "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.CvsDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": types.DeleteCvDocument,
    "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n    }\n  }\n": types.UpdateCvDocument,
    "\n  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": types.AddProfileLanguageDocument,
    "\n  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": types.UpdateProfileLanguageDocument,
    "\n  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": types.DeleteProfileLanguageDocument,
    "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.CreateLanguageDocument,
    "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.UpdateLanguageDocument,
    "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n": types.DeleteLanguageDocument,
    "\n  query Languages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.LanguagesDocument,
    "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query Profile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n\n      skills {\n        name\n        categoryId\n        mastery\n      }\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": types.ProfileDocument,
    "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n      }\n    }\n  }\n": types.AddCvProjectDocument,
    "\n  query Project($projectId: ID!) {\n    project(projectId: $projectId) {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n": types.ProjectDocument,
    "\n  query Projects {\n    projects {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n": types.ProjectsDocument,
    "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n      }\n    }\n  }\n": types.RemoveCvProjectDocument,
    "\n  query SkillCategories {\n    skillCategories {\n      id\n      name\n      order\n\n      parent {\n        id\n        name\n      }\n\n      children {\n        id\n        name\n        order\n      }\n    }\n  }\n": types.SkillCategoriesDocument,
    "\n  mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n    addProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": types.AddProfileSkillDocument,
    "\n  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": types.UpdateProfileSkillDocument,
    "\n  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": types.DeleteProfileSkillDocument,
    "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n": types.CreateSkillDocument,
    "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n": types.UpdateSkillDocument,
    "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n": types.DeleteSkillDocument,
    "\n  query Skills {\n    skills {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n\n      category_parent_name\n    }\n  }\n": types.SkillsDocument,
    "\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n": types.DepartmentsDocument,
    "\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n": types.PositionsDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      department {\n        id\n      }\n      position {\n        id\n      }\n      role\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UploadAvatar($avatar: UploadAvatarInput!) {\n    uploadAvatar(avatar: $avatar)\n  }\n": types.UploadAvatarDocument,
    "\n  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $avatar)\n  }\n": types.DeleteAvatarDocument,
    "\n  query Users {\n    users {\n      id\n      email\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  query User($userId: ID!) {\n    user(userId: $userId) {\n      id\n      email\n      role\n\n      department {\n        id\n        name\n      }\n\n      position {\n        id\n        name\n      }\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n        created_at\n      }\n    }\n  }\n": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cv($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n        description\n        environment\n        roles\n        responsibilities\n        project {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cv($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n        description\n        environment\n        roles\n        responsibilities\n        project {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $language) {\n      id\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Languages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  query Languages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Profile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n\n      skills {\n        name\n        categoryId\n        mastery\n      }\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"): (typeof documents)["\n  query Profile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n\n      skills {\n        name\n        categoryId\n        mastery\n      }\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n        internal_name\n        domain\n        start_date\n        end_date\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Project($projectId: ID!) {\n    project(projectId: $projectId) {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n"): (typeof documents)["\n  query Project($projectId: ID!) {\n    project(projectId: $projectId) {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Projects {\n    projects {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n"): (typeof documents)["\n  query Projects {\n    projects {\n      id\n      created_at\n      name\n      internal_name\n      domain\n      start_date\n      end_date\n      description\n      environment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n      projects {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SkillCategories {\n    skillCategories {\n      id\n      name\n      order\n\n      parent {\n        id\n        name\n      }\n\n      children {\n        id\n        name\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query SkillCategories {\n    skillCategories {\n      id\n      name\n      order\n\n      parent {\n        id\n        name\n      }\n\n      children {\n        id\n        name\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n    addProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddProfileSkill($skill: AddProfileSkillInput!) {\n    addProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $skill) {\n      id\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Skills {\n    skills {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n\n      category_parent_name\n    }\n  }\n"): (typeof documents)["\n  query Skills {\n    skills {\n      id\n      created_at\n      name\n\n      category {\n        id\n        name\n        order\n      }\n\n      category_parent_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      department {\n        id\n      }\n      position {\n        id\n      }\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      department {\n        id\n      }\n      position {\n        id\n      }\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadAvatar($avatar: UploadAvatarInput!) {\n    uploadAvatar(avatar: $avatar)\n  }\n"): (typeof documents)["\n  mutation UploadAvatar($avatar: UploadAvatarInput!) {\n    uploadAvatar(avatar: $avatar)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $avatar)\n  }\n"): (typeof documents)["\n  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $avatar)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      email\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      email\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($userId: ID!) {\n    user(userId: $userId) {\n      id\n      email\n      role\n\n      department {\n        id\n        name\n      }\n\n      position {\n        id\n        name\n      }\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n        created_at\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($userId: ID!) {\n    user(userId: $userId) {\n      id\n      email\n      role\n\n      department {\n        id\n        name\n      }\n\n      position {\n        id\n        name\n      }\n\n      profile {\n        id\n        first_name\n        last_name\n        full_name\n        avatar\n        created_at\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;