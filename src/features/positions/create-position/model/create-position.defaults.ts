import type { CreatePositionFormValues } from './create-position.schema';

export function getCreatePositionDefaultValues(): CreatePositionFormValues {
  return {
    name: '',
  };
}
