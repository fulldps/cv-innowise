'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import type { Department } from '@/entities/department';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { DepartmentForm } from '@/features/departments/ui/department-form';

import { useEditDepartment } from '../api/use-edit-department';
import {
  editDepartmentSchema,
  type EditDepartmentFormValues,
} from '../model/edit-department.schema';
import { getEditDepartmentDefaultValues } from '../model/edit-department.defaults';

interface EditDepartmentDialogProps {
  department: Department | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditDepartmentDialog({
  department,
  open,
  onOpenChange,
}: EditDepartmentDialogProps) {
  const { editDepartment, loading: updateLoading } = useEditDepartment();

  const form = useForm<EditDepartmentFormValues>({
    resolver: standardSchemaResolver(editDepartmentSchema),

    defaultValues: {
      name: '',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!department) return;

    form.reset(getEditDepartmentDefaultValues(department));
  }, [department, form]);

  const { control } = form;

  const { isDirty } = useFormState({
    control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditDepartmentFormValues) => {
    if (!department) return;

    try {
      await editDepartment(department.id, values);

      toast.success('Department updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update department');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update department"
      submitText="Update"
      loadingText="Updating..."
      loading={updateLoading}
      submitDisabled={!isDirty}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <DepartmentForm form={form} disabled={updateLoading} />
    </EntityDialog>
  );
}
