import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { CvSkillGroup } from '../model/placeholder-skills';
import { SkillBar } from './skill-bar';

interface CvSkillsProps {
  groups: CvSkillGroup[];
}

export function CvSkills({ groups }: CvSkillsProps) {
  return (
    <div className="flex flex-col p-4">
      {groups.map((group) => (
        <section key={group.category}>
          <h2 className="mt-4 text-base">{group.category}</h2>

          <div className="grid grid-cols-1 gap-x-24 sm:grid-cols-2 lg:grid-cols-3">
            {group.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 flex items-center justify-end gap-8">
        <Button variant="ghost" className="gap-2 text-muted-foreground">
          <Plus className="size-4" />
          ADD SKILL
        </Button>

        <Button variant="ghost" className="gap-2 text-destructive hover:text-destructive">
          <Trash2 className="size-4" />
          REMOVE SKILLS
        </Button>
      </div>
    </div>
  );
}
