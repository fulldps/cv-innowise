export interface UsersToolbarProps {
  searchValue: string;
  onSearchChange(value: string): void;

  canCreateUser: boolean;
  onCreateUser?(): void;
}
