export enum UserRole {
  Employee = 'Employee',
  Admin = 'Admin',
}

export enum Mastery {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert',
}

export enum Proficiency {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  Native = 'Native',
}

export interface Department {
  id: string;
  created_at: string;
  name: string;
}

export interface Position {
  id: string;
  created_at: string;
  name: string;
}

export interface SkillMastery {
  name: string;
  categoryId: string | null;
  mastery: Mastery;
}

export interface LanguageProficiency {
  name: string;
  proficiency: Proficiency;
}

export interface Profile {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  avatar: string | null;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface Project {
  id: string;
  created_at: string;
  name: string;
  internal_name: string;
  domain: string;
  start_date: string;
  end_date: string | null;
  description: string;
  environment: string[];
}

export interface CvProject {
  id: string;
  project: Project;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string | null;
  environment: string[];
  roles: string[];
  responsibilities: string[];
}

export interface Cv {
  id: string;
  created_at: string;
  name: string;
  education: string | null;
  description: string;
  user: User | null;
  projects: CvProject[] | null;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  is_verified: boolean;
  profile: Profile;
  cvs: Cv[] | null;
  department: Department | null;
  department_name: string | null;
  position: Position | null;
  position_name: string | null;
  role: UserRole;
}
