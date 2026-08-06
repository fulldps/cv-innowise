'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { useCreateCv } from '@/entities/cv/api/use-create-cv';
import { CvForm } from '@/entities/cv/ui/cv-form';
import { useCurrentUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

export function CreateCv() {
  const [open, setOpen] = useState(false);
  const currentUser = useCurrentUser();
  const [createCv, { loading }] = useCreateCv();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-[#c72f31] max-lg:size-10 max-lg:rounded-full max-lg:bg-[#c72f31]/10 max-lg:p-0 max-lg:text-[#c72f31]">
            <Plus className="size-4 lg:hidden" />
            <span className="max-lg:hidden">Create CV</span>
          </Button>
        }
      />
      <DialogContent className="max-w-xl rounded-sm px-6 pt-4 pb-2">
        <DialogHeader>
          <DialogTitle>Create CV</DialogTitle>
        </DialogHeader>
        <CvForm
          defaultValues={{ name: '', description: '', education: '' }}
          submitLabel="Create"
          submitting={loading}
          onSubmit={async (values) => {
            try {
              await createCv({ variables: { cv: { ...values, userId: currentUser.id } } });
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
