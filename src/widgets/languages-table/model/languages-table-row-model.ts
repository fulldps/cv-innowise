import type { Language } from '@/entities/language';

export interface LanguagesTableRowModel {
  language: Language;

  canEdit: boolean;
  canDelete: boolean;
}
