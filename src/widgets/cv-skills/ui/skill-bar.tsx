import { cn } from '@/shared/lib/utils';

import { MASTERY_CONFIG } from '../model/mastery-config';
import type { CvSkill } from '../model/placeholder-skills';

interface SkillBarProps {
  skill: CvSkill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const config = MASTERY_CONFIG[skill.mastery];

  return (
    <div className="flex items-center pt-6">
      <div className={cn('h-1 w-18 overflow-hidden', config.background)}>
        <div className={cn('h-full', config.color)} style={{ width: `${config.progress}%` }} />
      </div>

      <span className="ml-4 text-[15px] text-muted-foreground">{skill.name}</span>
    </div>
  );
}
