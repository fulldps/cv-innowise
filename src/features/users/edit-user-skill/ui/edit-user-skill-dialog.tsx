'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { MASTERY_OPTIONS } from '@/entities/skill';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useEditUserSkill } from '../api/use-edit-user-skill';
import { editUserSkillSchema, type EditUserSkillFormValues } from '../model/edit-user-skill.schema';

import { getEditUserSkillDefaultValues } from '../model/edit-user-skill.defaults';

import type { EditingUserSkill } from '../model/edit-user-skill.types';

interface EditUserSkillDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  editingUserSkill: EditingUserSkill | null;
}

export function EditUserSkillDialog({
  open,
  onOpenChange,
  userId,
  editingUserSkill,
}: EditUserSkillDialogProps) {
  const { editUserSkill, loading } = useEditUserSkill(userId);

  const form = useForm<EditUserSkillFormValues>({
    resolver: standardSchemaResolver(editUserSkillSchema),

    defaultValues: {
      skillId: '',
      mastery: 'Novice',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!editingUserSkill) return;

    form.reset(getEditUserSkillDefaultValues(editingUserSkill));
  }, [editingUserSkill, form]);

  const { isDirty } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditUserSkillFormValues) => {
    if (!editingUserSkill) return;

    try {
      await editUserSkill(values, editingUserSkill);

      toast.success('Skill updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update skill');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Update skill"

      submitText="Confirm"
      loadingText="Confirming..."

      loading={loading}
      submitDisabled={!isDirty}

      onSubmit={form.handleSubmit(onSubmit)}

      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SelectFieldsForm
        form={form}
        firstField="skillId"
        firstLabel="Skill"
        firstDisabled
        firstOptions={[
          {
            id: editingUserSkill?.name ?? '',
            name: editingUserSkill?.name ?? '',
          },
        ]}

        secondField="mastery"
        secondLabel="Skill mastery"
        secondOptions={MASTERY_OPTIONS}

        disabled={loading}
      />
    </EntityDialog>
  );
}
