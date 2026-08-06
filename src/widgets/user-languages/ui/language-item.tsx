import { cn } from '@/shared/lib/utils';

import { EditingLanguage } from '@/features/users/edit-language';
import { PROFICIENCY_CONFIG } from '../model/proficiency-config';

interface LanguageItemProps {
  language: EditingLanguage;

  selectable?: boolean;
  selected?: boolean;

  onClick?: () => void;
}

export function LanguageItem({
  language,
  selectable = false,
  selected = false,
  onClick,
}: LanguageItemProps) {
  const config = PROFICIENCY_CONFIG[language.proficiency];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex items-center gap-4 py-4 focus:outline-none',
        onClick && 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'min-w-12 text-left transition-colors',
          config.color,
          selectable && (selected ? 'text-primary' : 'group-hover:text-primary'),
        )}
      >
        {language.proficiency}
      </span>

      <span
        className={cn(
          'text-[15px] transition-colors text-muted-foreground',
          selectable && (selected ? 'text-primary' : 'group-hover:text-primary'),
        )}
      >
        {language.name}
      </span>
    </button>
  );
}
