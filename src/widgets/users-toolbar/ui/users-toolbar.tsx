import { Plus } from 'lucide-react';

import type { UsersToolbarProps } from '../model/types';

import { SearchInput } from './search-input';
import { Button } from '@/shared/ui/button';

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
        <Button
          type="button"
          variant="ghost"
          onClick={onCreateUser}
          className="
            gap-2
            font-semibold
            tracking-wide
            text-destructive
            hover:text-destructive/70
            hover:bg-transparent
        "
        >
          <Plus className="size-5" />
          <span className="text-[13px]">CREATE USER</span>
        </Button>
      )}
    </section>
  );
}
