'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateCv } from '@/entities/cv/api/use-create-cv';
import { useCurrentUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

const createCvSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  education: z.string().optional(),
});

type CreateCvValues = z.infer<typeof createCvSchema>;

export function CreateCv() {
  const [open, setOpen] = useState(false);
  const currentUser = useCurrentUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateCvValues>({
    resolver: standardSchemaResolver(createCvSchema),
    defaultValues: { name: '', description: '', education: '' },
  });

  const [createCv, { loading }] = useCreateCv();
  const onSubmit = async (values: CreateCvValues) => {
    try {
      await createCv({ variables: { cv: { ...values, userId: currentUser.id } } });
      setOpen(false);
    } catch (e) {
      setError('root', { message: e instanceof Error ? e.message : 'Something went wrong...' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-[#c72f31]">Create CV</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create CV</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
            {errors.name && <p className="text-sm text-[#c72f31]">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Controller
              control={control}
              name="description"
              render={({ field }) => <Input {...field} placeholder="Description" />}
            />
            {errors.description && (
              <p className="text-sm text-[#c72f31]">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Controller
              control={control}
              name="education"
              render={({ field }) => <Input {...field} placeholder="Education" />}
            />
          </div>

          {errors.root && <p className="text-sm text-[#c72f31]">{errors.root.message}</p>}

          <Button type="submit" disabled={loading} className="bg-[#c72f31]">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
