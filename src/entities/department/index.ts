export { useDepartments } from './api/use-departments';
export {
  CREATE_DEPARTMENT_MUTATION,
  UPDATE_DEPARTMENT_MUTATION,
  DELETE_DEPARTMENT_MUTATION,
} from './api/department.mutations';

export type {
  Department,
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DeleteDepartmentInput,
} from './model/types';
export { DEPARTMENTS_QUERY } from './api/departments.query';
