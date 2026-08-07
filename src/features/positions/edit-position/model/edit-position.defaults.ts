import type { Position } from '@/entities/position';

import type { EditPositionFormValues } from './edit-position.schema';

export function getEditPositionDefaultValues(position: Position): EditPositionFormValues {
  return {
    name: position.name ?? '',
  };
}
