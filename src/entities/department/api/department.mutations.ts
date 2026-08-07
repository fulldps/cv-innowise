import { graphql } from '@/shared/api/graphql';

export const CREATE_DEPARTMENT_MUTATION = graphql(`
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`);

export const UPDATE_DEPARTMENT_MUTATION = graphql(`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`);

export const DELETE_DEPARTMENT_MUTATION = graphql(`
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department) {
      affected
    }
  }
`);
