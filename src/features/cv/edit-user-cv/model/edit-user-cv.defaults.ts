import type { EditUserCvFormValues } from './edit-user-cv.schema';

interface CvDefaults {
  name: string;
  description: string;
}

export function getEditUserCvDefaultValues(cv: CvDefaults): EditUserCvFormValues {
  return {
    name: cv.name ?? '',
    description: cv.description ?? '',
  };
}
