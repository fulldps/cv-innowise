'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import { useProjectsList } from '@/entities/project/api/use-projects-list';
import { useUpdateCvProject } from '@/entities/project/api/use-update-cv-project';
import { projectSchema, type ProjectFormValues } from '@/entities/project/model/schema';
import { ProjectForm } from '@/entities/project/ui/project-form';
import { EntityDialog } from '@/shared/ui/entity-dialog';

export interface EditableProject {
  projectId: string;
  name: string;
  start_date: string;
  end_date?: string | null;
  roles: string[];
  responsibilities: string[];
}

const toLines = (value?: string) =>
  value
    ? value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

const toDateInput = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
};

interface EditProjectProps {
  cvId: string;
  project: EditableProject;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditProject({ cvId, project, open, onOpenChange }: EditProjectProps) {
  const { projects } = useProjectsList();
  const [updateCvProject, { loading }] = useUpdateCvProject();

  const form = useForm<ProjectFormValues>({
    resolver: standardSchemaResolver(projectSchema),
    defaultValues: {
      projectId: project.projectId,
      start_date: toDateInput(project.start_date),
      end_date: toDateInput(project.end_date),
      roles: project.roles.join('\n'),
      responsibilities: project.responsibilities.join('\n'),
    },
    mode: 'onChange',
  });

  const { isValid } = useFormState({ control: form.control });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      await updateCvProject({
        variables: {
          project: {
            cvId,
            projectId: project.projectId,
            start_date: values.start_date,
            end_date: values.end_date || null,
            roles: toLines(values.roles),
            responsibilities: toLines(values.responsibilities),
          },
        },
      });
      toast.success('Project updated successfully');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update project');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit project"
      submitText="Save"
      loadingText="Saving..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={() => onOpenChange(false)}
    >
      <ProjectForm form={form} projects={projects} disabled={loading} projectLocked />
    </EntityDialog>
  );
}
