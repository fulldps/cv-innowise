'use client';

import { useState } from 'react';

import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

import { useDeleteCv } from '@/entities/cv/api/use-delete-cv';
import { USER_ROLE, useCurrentUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';
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

  const canManage = cv.user?.id === currentUser.id || currentUser.role === USER_ROLE.Admin;

  if (!canManage) return null;

  const handleDelete = async () => {
    try {
      await deleteCv({ variables: { cv: { cvId: cv.id } } });
      toast.success('CV deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete CV');
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
          <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Delete CV</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        entityLabel="CV"
        entityName={cv.name}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}
