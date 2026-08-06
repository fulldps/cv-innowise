'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { type Skill } from '@/entities/skill';
import { useSkillCategories } from '@/entities/skill-category';

import { EntityDialog } from '@/shared/ui/entity-dialog';

import { useEditSkill } from '../api/use-edit-skill';
import { editSkillSchema, type EditSkillFormValues } from '../model/edit-skill.schema';
import { getEditSkillDefaultValues } from '../model/edit-skill.defaults';
import { SkillForm } from '@/shared/ui/skill-form';

interface EditSkillDialogProps {
  skill: Skill | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditSkillDialog({ skill, open, onOpenChange }: EditSkillDialogProps) {
  const { data: categoriesData } = useSkillCategories();

  const { editSkill, loading: updateLoading } = useEditSkill();

  const categories =
    categoriesData?.skillCategories
      .filter((category) => category.parent !== null)
      .map((category) => ({
        id: category.id,
        name: category.name,
      })) ?? [];

  const form = useForm<EditSkillFormValues>({
    resolver: standardSchemaResolver(editSkillSchema),

    defaultValues: {
      name: '',
      categoryId: '',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!skill) return;

    form.reset(getEditSkillDefaultValues(skill));
  }, [skill, form]);

  const { control } = form;

  const { isDirty } = useFormState({
    control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditSkillFormValues) => {
    if (!skill) return;

    try {
      await editSkill(skill.id, values);

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

      submitText="Update"

      loadingText="Updating..."

      loading={updateLoading}

      submitDisabled={!isDirty}

      onSubmit={form.handleSubmit(onSubmit)}

      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SkillForm form={form} categories={categories} disabled={updateLoading} />
    </EntityDialog>
  );
}
