import { CvsQuery } from '@/shared/api/graphql/graphql';

export interface Cv {
  id: number;
  name: string;
  education: string;
  email: string;
}

export type UserCv = NonNullable<CvsQuery['cvs'][number]>;
