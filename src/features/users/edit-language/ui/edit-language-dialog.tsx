'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { PROFICIENCY_OPTIONS } from '@/entities/language';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useEditLanguage } from '../api/use-edit-language';
import { editLanguageSchema, type EditLanguageFormValues } from '../model/edit-language.schema';
import { getEditLanguageDefaultValues } from '../model/edit-language.defaults';

import type { EditingLanguage } from '../model/edit-language.types';

interface EditLanguageDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  editingLanguage: EditingLanguage | null;
}

export function EditLanguageDialog({
  open,
  onOpenChange,
  userId,
  editingLanguage,
}: EditLanguageDialogProps) {
  const { editLanguage, loading } = useEditLanguage(userId);

  const form = useForm<EditLanguageFormValues>({
    resolver: standardSchemaResolver(editLanguageSchema),

    defaultValues: {
      languageId: '',
      proficiency: 'A1',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!editingLanguage) return;

    form.reset(getEditLanguageDefaultValues(editingLanguage));
  }, [editingLanguage, form]);

  const { isDirty } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditLanguageFormValues) => {
    if (!editingLanguage) return;

    try {
      await editLanguage(values, editingLanguage);

      toast.success('Language updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update language');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }

        onOpenChange(true);
      }}
    >
      <DialogContent className="max-w-xl rounded-sm px-6 pb-2 pt-4">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[20px] font-semibold">Update language</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, async () => {
            await form.trigger();
          })}
          className="flex flex-col gap-2"
        >
          <SelectFieldsForm
            form={form}
            firstField="languageId"
            firstLabel="Language"
            firstDisabled
            firstOptions={[
              {
                id: editingLanguage?.name ?? '',
                name: editingLanguage?.name ?? '',
              },
            ]}

            secondField="proficiency"
            secondLabel="Language proficiency"
            secondOptions={PROFICIENCY_OPTIONS}
          />

          <DialogFooter className="flex justify-end gap-2 pt-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading || !isDirty}
              className="h-12 w-52 rounded-full uppercase tracking-wide"
            >
              {loading ? 'Confirming...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
