import type { CreatePositionInput } from '@/entities/position';

import type { CreatePositionFormValues } from './create-position.schema';

export function mapCreatePositionInput(values: CreatePositionFormValues): CreatePositionInput {
  return {
    name: values.name,
  };
}
