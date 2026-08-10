import { graphql } from '@/shared/api/graphql';

export const CREATE_POSITION_MUTATION = graphql(`
  mutation CreatePosition($position: CreatePositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`);

export const UPDATE_POSITION_MUTATION = graphql(`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
      name
    }
  }
`);

export const DELETE_POSITION_MUTATION = graphql(`
  mutation DeletePosition($position: DeletePositionInput!) {
    deletePosition(position: $position) {
      affected
    }
  }
`);
