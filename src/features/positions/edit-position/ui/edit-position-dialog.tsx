'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import type { Position } from '@/entities/position';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { PositionForm } from '@/shared/ui/position-form';

import { useEditPosition } from '../api/use-edit-position';
import { editPositionSchema, type EditPositionFormValues } from '../model/edit-position.schema';
import { getEditPositionDefaultValues } from '../model/edit-position.defaults';

interface EditPositionDialogProps {
  position: Position | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditPositionDialog({ position, open, onOpenChange }: EditPositionDialogProps) {
  const { editPosition, loading: updateLoading } = useEditPosition();

  const form = useForm<EditPositionFormValues>({
    resolver: standardSchemaResolver(editPositionSchema),

    defaultValues: {
      name: '',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!position) return;

    form.reset(getEditPositionDefaultValues(position));
  }, [position, form]);

  const { control } = form;

  const { isDirty } = useFormState({
    control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditPositionFormValues) => {
    if (!position) return;

    try {
      await editPosition(position.id, values);

      toast.success('Position updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update position');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update position"
      submitText="Update"
      loadingText="Updating..."
      loading={updateLoading}
      submitDisabled={!isDirty}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-xl"
    >
      <PositionForm form={form} disabled={updateLoading} />
    </EntityDialog>
  );
}
