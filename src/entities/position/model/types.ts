import type { PositionsQuery } from '@/shared/api/graphql/graphql';

export type Position = PositionsQuery['positions'][number];
export type {
  CreatePositionInput,
  UpdatePositionInput,
  DeletePositionInput,
} from '@/shared/api/graphql/graphql';
