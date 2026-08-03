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
    "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.CvsDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": typeof types.DeleteCvDocument,
    "\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n": typeof types.DepartmentsDocument,
    "\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n": typeof types.PositionsDocument,
    "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n": typeof types.UpdateProfileDocument,
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
    "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.CvsDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": types.DeleteCvDocument,
    "\n  query Departments {\n    departments {\n      id\n      name\n    }\n  }\n": types.DepartmentsDocument,
    "\n  query Positions {\n    positions {\n      id\n      name\n    }\n  }\n": types.PositionsDocument,
    "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n": types.UpdateProfileDocument,
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
export function graphql(source: "\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cvs {\n    cvs {\n      id\n      name\n      description\n      education\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($profile: UpdateProfileInput!) {\n    updateProfile(profile: $profile) {\n      id\n      first_name\n      last_name\n    }\n  }\n"];
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