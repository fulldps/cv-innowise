'use client';

import { useState } from 'react';

import { EllipsisVertical } from 'lucide-react';

import { useDeleteCv } from '@/entities/cv/api/use-delete-cv';
import { useCurrentUser, UserRole } from '@/entities/user';
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

type DeleteCvProps = {
  cv: { id: string; name: string; user: { id: string } | null };
};

export function DeleteCv({ cv }: DeleteCvProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteCv, { loading }] = useDeleteCv();
  const currentUser = useCurrentUser();

  const canManage = cv.user?.id === currentUser.id || currentUser.role === UserRole.Admin;

  if (!canManage) return null;

  const handleDelete = async () => {
    await deleteCv({ variables: { cv: { cvId: cv.id } } });
    setConfirmOpen(false);
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
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Delete CV</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete CV</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete CV <b>{cv.name}</b>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button variant="destructive" disabled={loading} onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
