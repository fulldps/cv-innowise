'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateCv } from '@/entities/cv/api/use-create-cv';
import { cvSchema, type CvFormValues } from '@/entities/cv/model/schema';
import { CvForm } from '@/entities/cv/ui/cv-form';
import { useCurrentUser } from '@/entities/user';
import { EntityDialog } from '@/shared/ui/entity-dialog';

const defaultValues: CvFormValues = { name: '', description: '', education: '' };

interface CreateCvProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateCv({ open, onOpenChange }: CreateCvProps) {
  const currentUser = useCurrentUser();
  const [createCv, { loading }] = useCreateCv();

  const form = useForm<CvFormValues>({
    resolver: standardSchemaResolver(cvSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { isValid } = useFormState({ control: form.control });

  const handleClose = () => {
    form.reset(defaultValues);
    onOpenChange(false);
  };

  const onSubmit = async (values: CvFormValues) => {
    try {
      await createCv({ variables: { cv: { ...values, userId: currentUser.id } } });
      toast.success('CV created successfully');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create CV');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create CV"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
    >
      <CvForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
