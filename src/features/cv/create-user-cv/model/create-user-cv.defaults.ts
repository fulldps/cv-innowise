import type { CreateUserCvFormValues } from './create-user-cv.schema';

export function getCreateUserCvDefaultValues(): CreateUserCvFormValues {
  return {
    name: '',
    description: '',
  };
}
