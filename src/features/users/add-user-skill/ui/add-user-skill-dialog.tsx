'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { MASTERY_OPTIONS, Skill } from '@/entities/skill';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useAddUserSkill } from '../api/use-add-user-skill';
import { addUserSkillSchema, type AddUserSkillFormValues } from '../model/add-user-skill.schema';
import { getAddUserSkillDefaultValues } from '../model/add-user-skill.defaults';

interface AddUserSkillDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  availableSkills: Skill[];
}

export function AddUserSkillDialog({
  open,
  onOpenChange,
  userId,
  availableSkills,
}: AddUserSkillDialogProps) {
  const { addUserSkill, loading } = useAddUserSkill(userId, availableSkills);

  const form = useForm<AddUserSkillFormValues>({
    resolver: standardSchemaResolver(addUserSkillSchema),

    defaultValues: getAddUserSkillDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    form.reset(getAddUserSkillDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: AddUserSkillFormValues) => {
    try {
      await addUserSkill(values);

      toast.success('Skill added successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to add skill');
    }
  };

  const availableSkillOptions = availableSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}

      title="Add skill"

      submitText="Confirm"
      loadingText="Confirming..."

      loading={loading}
      submitDisabled={!isValid}

      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SelectFieldsForm
        form={form}
        firstField="skillId"
        firstLabel="Skill"
        firstOptions={availableSkillOptions}

        secondField="mastery"
        secondLabel="Skill mastery"
        secondOptions={MASTERY_OPTIONS}

        disabled={loading}
      />
    </EntityDialog>
  );
}
