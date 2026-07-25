import { Plus } from 'lucide-react';

import type { UsersToolbarProps } from '../model/types';

import { SearchInput } from './search-input';

export function UsersToolbar({
  searchValue,
  onSearchChange,
  canCreateUser,
  onCreateUser,
}: UsersToolbarProps) {
  return (
    <section className="flex items-center justify-between gap-2 pl-3 pr-20 pt-2">
      <SearchInput value={searchValue} onValueChange={onSearchChange} />

      {canCreateUser && (
        <button
          type="button"
          onClick={onCreateUser}
          className="flex items-center gap-2 text-destructive font-semibold tracking-wide transition-colors hover:text-destructive/70 cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          <span className="text-[13px]">CREATE USER</span>
        </button>
      )}
    </section>
  );
}
