'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { PositionForm } from '@/shared/ui/position-form';

import { useCreatePosition } from '../api/use-create-position';
import {
  createPositionSchema,
  type CreatePositionFormValues,
} from '../model/create-position.schema';
import { getCreatePositionDefaultValues } from '../model/create-position.defaults';

interface CreatePositionDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreatePositionDialog({ open, onOpenChange }: CreatePositionDialogProps) {
  const { createPosition, loading } = useCreatePosition();

  const form = useForm<CreatePositionFormValues>({
    resolver: standardSchemaResolver(createPositionSchema),

    defaultValues: getCreatePositionDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({
    control,
  });

  const handleClose = () => {
    form.reset(getCreatePositionDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: CreatePositionFormValues) => {
    try {
      await createPosition(values);

      toast.success('Position created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create position');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create position"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <PositionForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
