import type { Mastery } from '@/entities/skill';

export interface CvSkill {
  name: string;
  mastery: Mastery;
}

export interface CvSkillGroup {
  category: string;
  skills: CvSkill[];
}
