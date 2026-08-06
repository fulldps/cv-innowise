import { cn } from '@/shared/lib/utils';

import type { Mastery } from '@/entities/skill';

import { MASTERY_CONFIG } from '../model/mastery-config';

interface SkillItemProps {
  skill: {
    name: string;
    mastery: Mastery;
  };

  selectable?: boolean;
  selected?: boolean;

  onClick?: () => void;
}

export function SkillItem({
  skill,
  selectable = false,
  selected = false,
  onClick,
}: SkillItemProps) {
  const config = MASTERY_CONFIG[skill.mastery];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex items-center px-4 pt-6 focus:outline-none',
        onClick && 'cursor-pointer',
      )}
    >
      <div className="flex items-center">
        <div
          className={cn(
            'h-1 w-18 overflow-hidden transition-colors',
            config.background,
            selectable && (selected ? 'bg-muted-foreground' : 'group-hover:bg-muted-foreground'),
          )}
        >
          <div
            className={cn(
              'h-full transition-opacity',
              config.color,
              selectable && (selected ? 'opacity-0' : 'group-hover:opacity-0'),
            )}
            style={{
              width: `${config.progress}%`,
            }}
          />
        </div>

        <span className="ml-4 text-[15px] text-muted-foreground">{skill.name}</span>
      </div>
    </button>
  );
}
