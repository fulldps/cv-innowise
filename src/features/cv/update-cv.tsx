'use client';

import { useUpdateCv } from '@/entities/cv/api/use-update-cv';
import { CvForm } from '@/entities/cv/ui/cv-form';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

interface UpdateCvProps {
  cv: {
    id: string;
    name: string;
    description: string;
    education: string | null;
    user: { id: string } | null;
  };
}

export function UpdateCv({ cv }: UpdateCvProps) {
  const currentUser = useCurrentUser();
  const [updateCv, { loading }] = useUpdateCv();

  const canManage = cv.user?.id === currentUser.id || currentUser.role === USER_ROLE.Admin;

  if (!canManage) return null;

  return (
    <CvForm
      defaultValues={{ name: cv.name, description: cv.description, education: cv.education ?? '' }}
      submitLabel="Update"
      submitting={loading}
      onSubmit={async (values) => {
        try {
          await updateCv({ variables: { cv: { cvId: cv.id, ...values } } });
        } catch (e) {
          console.error(e);
        }
      }}
    />
  );
}
