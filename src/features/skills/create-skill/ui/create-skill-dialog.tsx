'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { useSkillCategories } from '@/entities/skill-category';

import { EntityDialog } from '@/shared/ui/entity-dialog';
import { SkillForm } from '@/features/skills/ui/skill-form';

import { useCreateSkill } from '../api/use-create-skill';
import { createSkillSchema, type CreateSkillFormValues } from '../model/create-skill.schema';
import { getCreateSkillDefaultValues } from '../model/create-skill.defaults';

interface CreateSkillDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateSkillDialog({ open, onOpenChange }: CreateSkillDialogProps) {
  const { data: categoriesData } = useSkillCategories();

  const { createSkill, loading } = useCreateSkill();

  const categories =
    categoriesData?.skillCategories
      .filter((category) => category.parent !== null)
      .map((category) => ({
        id: category.id,
        name: category.name,
      })) ?? [];

  const form = useForm<CreateSkillFormValues>({
    resolver: standardSchemaResolver(createSkillSchema),

    defaultValues: getCreateSkillDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({ control });

  const handleClose = () => {
    form.reset(getCreateSkillDefaultValues());
    onOpenChange(false);
  };

  const onSubmit = async (values: CreateSkillFormValues) => {
    try {
      await createSkill(values);

      toast.success('Skill created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create skill');
    }
  };

  return (
    <EntityDialog
      open={open}

      onOpenChange={onOpenChange}

      title="Create skill"

      submitText="Create"

      loadingText="Creating..."

      loading={loading}

      submitDisabled={!isValid}

      onSubmit={form.handleSubmit(onSubmit)}

      onCancel={handleClose}

      maxWidth="max-w-xl"
    >
      <SkillForm
        form={form}

        categories={categories}

        disabled={loading}
      />
    </EntityDialog>
  );
}
