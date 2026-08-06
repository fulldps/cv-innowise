'use client';

import { useState } from 'react';

import { EllipsisVertical } from 'lucide-react';

import { useRemoveCvProject } from '@/entities/project/api/use-remove-cv-project';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
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
      setConfirmOpen(false);
    } catch (e) {
      console.error(e);
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

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-xl rounded-sm px-6 pt-4 pb-2">
          <DialogHeader>
            <DialogTitle>Remove project</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove project <b>{name}</b>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button variant="destructive" disabled={loading} onClick={handleRemove}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
