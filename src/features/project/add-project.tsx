'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { useAddCvProject } from '@/entities/project/api/use-add-cv-project';
import { useProjectsList } from '@/entities/project/api/use-projects-list';
import { ProjectForm } from '@/entities/project/ui/project-form';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

const toLines = (value?: string) =>
  value
    ? value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

export function AddProject({ cvId }: { cvId: string }) {
  const [open, setOpen] = useState(false);
  const { projects } = useProjectsList();
  const [addCvProject, { loading }] = useAddCvProject();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="gap-1.5 text-[#c72f31] hover:text-[#c72f31] max-lg:size-10 max-lg:rounded-full max-lg:bg-[#c72f31]/10 max-lg:p-0"
          >
            <Plus className="size-4" />
            <span className="max-lg:hidden">ADD PROJECT</span>
          </Button>
        }
      />
      <DialogContent className="max-w-xl rounded-sm px-6 pt-4 pb-2">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          projects={projects}
          defaultValues={{
            projectId: '',
            start_date: '',
            end_date: '',
            roles: '',
            responsibilities: '',
          }}
          submitLabel="Add"
          submitting={loading}
          onSubmit={async (values) => {
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
              setOpen(false);
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
