import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { SearchInput } from './search-input';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange(value: string): void;

  showAction?: boolean;
  actionText?: string;
  onActionClick?(): void;
}

export function TableToolbar({
  searchValue,
  onSearchChange,

  showAction = false,
  actionText = 'Create',
  onActionClick,
}: TableToolbarProps) {
  return (
    <section className="flex items-center justify-between gap-2 pl-3 pr-20 pt-2">
      <SearchInput value={searchValue} onValueChange={onSearchChange} />

      {showAction && onActionClick && (
        <Button
          type="button"
          variant="ghost"
          onClick={onActionClick}
          className="
            gap-2
            font-semibold
            tracking-wide
            text-destructive
            hover:bg-transparent
            hover:text-destructive/70
          "
        >
          <Plus className="size-5" />

          <span className="text-[13px] uppercase">{actionText}</span>
        </Button>
      )}
    </section>
  );
}
