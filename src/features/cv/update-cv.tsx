'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useUpdateCv } from '@/entities/cv/api/use-update-cv';
import { cvSchema, type CvFormValues } from '@/entities/cv/model/schema';
import { CvForm } from '@/entities/cv/ui/cv-form';
import { USER_ROLE, useCurrentUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';

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

  const form = useForm<CvFormValues>({
    resolver: standardSchemaResolver(cvSchema),
    defaultValues: { name: cv.name, description: cv.description, education: cv.education ?? '' },
  });

  const canManage = cv.user?.id === currentUser.id || currentUser.role === USER_ROLE.Admin;

  if (!canManage) return null;

  const onSubmit = async (values: CvFormValues) => {
    try {
      await updateCv({ variables: { cv: { cvId: cv.id, ...values } } });
      toast.success('CV updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update CV');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <CvForm form={form} disabled={loading} />

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-100 self-end text-[14px] rounded-4xl bg-destructive text-white"
      >
        UPDATE
      </Button>
    </form>
  );
}
