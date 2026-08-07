export const USER_CVS_SORT_FIELDS = {
  name: 'name',
} as const;

export type UserCvsSortField = (typeof USER_CVS_SORT_FIELDS)[keyof typeof USER_CVS_SORT_FIELDS];
