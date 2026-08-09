'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import { ProjectForm } from '@/features/projects/ui/project-form';
import { EntityDialog } from '@/shared/ui/entity-dialog';

import { useCreateProject } from '../api/use-create-project';
import { getCreateProjectDefaultValues } from '../model/create-project.defaults';
import { createProjectSchema, type CreateProjectFormValues } from '../model/create-project.schema';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const { createProject, loading } = useCreateProject();

  const form = useForm<CreateProjectFormValues>({
    resolver: standardSchemaResolver(createProjectSchema),

    defaultValues: getCreateProjectDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control } = form;

  const { isValid } = useFormState({ control });

  const handleClose = () => {
    form.reset(getCreateProjectDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: CreateProjectFormValues) => {
    try {
      await createProject(values);

      toast.success('Project created successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to create project');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create project"
      submitText="Create"
      loadingText="Creating..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-2xl"
    >
      <ProjectForm form={form} disabled={loading} />
    </EntityDialog>
  );
}
