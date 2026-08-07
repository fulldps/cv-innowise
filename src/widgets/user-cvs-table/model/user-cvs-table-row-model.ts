import type { UserCv } from '@/entities/cv/model/types';

export interface UserCvsTableRowModel {
  cv: UserCv;

  canEdit: boolean;
  canDelete: boolean;
}
