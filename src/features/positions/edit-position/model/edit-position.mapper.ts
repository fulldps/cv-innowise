import type { UpdatePositionInput } from '@/entities/position';

import type { EditPositionFormValues } from './edit-position.schema';

export function mapUpdatePositionInput(
  positionId: string,
  values: EditPositionFormValues,
): UpdatePositionInput {
  return {
    positionId,

    name: values.name,
  };
}
