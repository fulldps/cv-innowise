'use client';

import { useState } from 'react';

import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

import { useRemoveCvProject } from '@/entities/project/api/use-remove-cv-project';
import { Button } from '@/shared/ui/button';
import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { EditProject, type EditableProject } from './edit-project';

interface ProjectActionsProps {
  cvId: string;
  project: EditableProject;
}

export function ProjectActions({ cvId, project }: ProjectActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [removeCvProject, { loading }] = useRemoveCvProject();

  const handleRemove = async () => {
    try {
      await removeCvProject({ variables: { project: { cvId, projectId: project.projectId } } });
      toast.success('Project removed successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove project');
      throw error;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>Edit project</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Remove project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProject
        key={project.projectId}
        cvId={cvId}
        project={project}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <ConfirmDeleteDialog
        entityLabel="project"
        entityName={project.name}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onDelete={handleRemove}
        loading={loading}
      />
    </>
  );
}
