'use client';

import { useEffect } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import type { Project } from '@/entities/project';
import { ProjectForm } from '@/features/projects/ui/project-form';
import { EntityDialog } from '@/shared/ui/entity-dialog';

import { useEditProject } from '../api/use-edit-project';
import { getEditProjectDefaultValues } from '../model/edit-project.defaults';
import { editProjectSchema, type EditProjectFormValues } from '../model/edit-project.schema';

interface EditProjectDialogProps {
  project: Project | null;

  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditProjectDialog({ project, open, onOpenChange }: EditProjectDialogProps) {
  const { editProject, loading: updateLoading } = useEditProject();

  const form = useForm<EditProjectFormValues>({
    resolver: standardSchemaResolver(editProjectSchema),

    defaultValues: {
      name: '',
      domain: '',
      start_date: '',
      end_date: '',
      description: '',
      environment: [],
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!project) return;

    form.reset(getEditProjectDefaultValues(project));
  }, [project, form]);

  const { control } = form;

  const { isDirty, isValid } = useFormState({ control });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditProjectFormValues) => {
    if (!project) return;

    try {
      await editProject(project.id, values);

      toast.success('Project updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update project');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update project"
      submitText="Update"
      loadingText="Updating..."
      loading={updateLoading}
      submitDisabled={!isDirty || !isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
      maxWidth="max-w-2xl"
    >
      <ProjectForm form={form} disabled={updateLoading} />
    </EntityDialog>
  );
}
