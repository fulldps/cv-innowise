import { cn } from '@/shared/lib/utils';

import { MASTERY_CONFIG } from '../model/mastery-config';
import type { CvSkill } from '../model/placeholder-skills';

interface SkillBarProps {
  skill: CvSkill;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function SkillBar({ skill, selectable = false, selected = false, onClick }: SkillBarProps) {
  const config = MASTERY_CONFIG[skill.mastery];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('group flex items-center pt-6 focus:outline-none', onClick && 'cursor-pointer')}
    >
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
          style={{ width: `${config.progress}%` }}
        />
      </div>

      <span className="ml-4 text-[15px] text-muted-foreground">{skill.name}</span>
    </button>
  );
}
