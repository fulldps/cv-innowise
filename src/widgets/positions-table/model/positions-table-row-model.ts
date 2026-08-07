import type { Position } from '@/entities/position';

export interface PositionsTableRowModel {
  position: Position;

  canEdit: boolean;
  canDelete: boolean;
}
