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

interface RemoveProjectProps {
  cvId: string;
  projectId: string;
  name: string;
}

export function RemoveProject({ cvId, projectId, name }: RemoveProjectProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removeCvProject, { loading }] = useRemoveCvProject();

  const handleRemove = async () => {
    try {
      await removeCvProject({ variables: { project: { cvId, projectId } } });
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
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Remove project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        entityLabel="project"
        entityName={name}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onDelete={handleRemove}
        loading={loading}
      />
    </>
  );
}
