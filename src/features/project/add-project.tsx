'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import { useAddCvProject } from '@/entities/project/api/use-add-cv-project';
import { useProjectsList } from '@/entities/project/api/use-projects-list';
import { projectSchema, type ProjectFormValues } from '@/entities/project/model/schema';
import { ProjectForm } from '@/entities/project/ui/project-form';
import { EntityDialog } from '@/shared/ui/entity-dialog';

const defaultValues: ProjectFormValues = {
  projectId: '',
  start_date: '',
  end_date: '',
  roles: '',
  responsibilities: '',
};

const toLines = (value?: string) =>
  value
    ? value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

interface AddProjectProps {
  cvId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function AddProject({ cvId, open, onOpenChange }: AddProjectProps) {
  const { projects } = useProjectsList();
  const [addCvProject, { loading }] = useAddCvProject();

  const form = useForm<ProjectFormValues>({
    resolver: standardSchemaResolver(projectSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { isValid } = useFormState({ control: form.control });

  const handleClose = () => {
    form.reset(defaultValues);
    onOpenChange(false);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      await addCvProject({
        variables: {
          project: {
            cvId,
            projectId: values.projectId,
            start_date: values.start_date,
            end_date: values.end_date || null,
            roles: toLines(values.roles),
            responsibilities: toLines(values.responsibilities),
          },
        },
      });
      toast.success('Project added successfully');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add project');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add project"
      submitText="Add"
      loadingText="Adding..."
      loading={loading}
      submitDisabled={!isValid}
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={handleClose}
    >
      <ProjectForm form={form} projects={projects} disabled={loading} />
    </EntityDialog>
  );
}
