'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { DepartmentForm } from '@/shared/ui/department-form';

import { useCreateDepartment } from '../api/use-create-department';
import {
  createDepartmentSchema,
  type CreateDepartmentFormValues,
} from '../model/create-department.schema';
import { getCreateDepartmentDefaultValues } from '../model/create-department.defaults';

interface CreateDepartmentDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateDepartmentDialog({ open, onOpenChange }: CreateDepartmentDialogProps) {
  const { createDepartment, loading } = useCreateDepartment();

  const form = useForm<CreateDepartmentFormValues>({
    resolver: standardSchemaResolver(createDepartmentSchema),

    defaultValues: getCreateDepartmentDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({
    control,
  });

  const handleClose = () => {
    form.reset(getCreateDepartmentDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: CreateDepartmentFormValues) => {
    try {
      await createDepartment(values);

      toast.success('Department created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create department');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create department"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <DepartmentForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
