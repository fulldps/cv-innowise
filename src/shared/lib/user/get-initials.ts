interface GetInitialsParams {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
}

export function getInitials({ firstName, lastName, email }: GetInitialsParams): string {
  const initials = `${firstName?.[0] ?? lastName?.[0] ?? ''}` || email[0].toUpperCase();
  return initials;
}
