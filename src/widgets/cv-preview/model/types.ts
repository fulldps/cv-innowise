export interface PreviewLanguage {
  name: string;
  proficiency: string;
}

export interface PreviewSkillGroup {
  category: string;
  skills: string[];
}

export interface PreviewProject {
  name: string;
  description: string;
  roles: string[];
  period: string;
  responsibilities: string[];
  environment: string[];
}

export interface PreviewProfessionalSkill {
  category: string;
  skills: string[];
  experienceYears: string;
  lastUsed: string;
}

export interface PreviewCv {
  fullName: string;
  position: string;
  education: string;
  languages: PreviewLanguage[];
  domains: string[];
  name: string;
  description: string;
  skillGroups: PreviewSkillGroup[];
  projects: PreviewProject[];
  professionalSkills: PreviewProfessionalSkill[];
}
