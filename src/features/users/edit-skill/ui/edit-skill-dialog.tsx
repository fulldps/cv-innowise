'use client';

import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { MASTERY_OPTIONS } from '@/entities/skill';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useEditSkill } from '../api/use-edit-skill';
import { editSkillSchema, type EditSkillFormValues } from '../model/edit-skill.schema';
import { getEditSkillDefaultValues } from '../model/edit-skill.defaults';

import type { EditingSkill } from '../model/edit-skill.types';

interface EditSkillDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  editingSkill: EditingSkill | null;
}

export function EditSkillDialog({
  open,
  onOpenChange,
  userId,
  editingSkill,
}: EditSkillDialogProps) {
  const { editSkill, loading } = useEditSkill(userId);

  const form = useForm<EditSkillFormValues>({
    resolver: standardSchemaResolver(editSkillSchema),

    defaultValues: {
      skillId: '',
      mastery: 'Novice',
    },

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!editingSkill) return;

    form.reset(getEditSkillDefaultValues(editingSkill));
  }, [editingSkill, form]);

  const { isDirty } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (values: EditSkillFormValues) => {
    if (!editingSkill) return;

    try {
      await editSkill(values, editingSkill);

      toast.success('Skill updated successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to update skill');
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
          <DialogTitle className="text-[20px] font-semibold">Update skill</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, async () => {
            await form.trigger();
          })}
          className="flex flex-col gap-2"
        >
          <SelectFieldsForm
            form={form}
            firstField="skillId"
            firstLabel="Skill"
            firstDisabled
            firstOptions={[
              {
                id: editingSkill?.id ?? '',
                name: editingSkill?.name ?? '',
              },
            ]}

            secondField="mastery"
            secondLabel="Skill mastery"
            secondOptions={MASTERY_OPTIONS}
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
