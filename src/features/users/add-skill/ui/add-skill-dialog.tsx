'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { MASTERY_OPTIONS, Skill } from '@/entities/skill';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useAddSkill } from '../api/use-add-skill';
import { addSkillSchema, type AddSkillFormValues } from '../model/add-skill.schema';
import { getAddSkillDefaultValues } from '../model/add-skill.defaults';

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  availableSkills: Skill[];
}

export function AddSkillDialog({
  open,
  onOpenChange,
  userId,
  availableSkills,
}: AddSkillDialogProps) {
  const { addSkill, loading } = useAddSkill(userId, availableSkills);

  const form = useForm<AddSkillFormValues>({
    resolver: standardSchemaResolver(addSkillSchema),

    defaultValues: getAddSkillDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    form.reset(getAddSkillDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: AddSkillFormValues) => {
    try {
      await addSkill(values);

      toast.success('Skill added successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to add skill');
    }
  };

  const availableSkillOptions = availableSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

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
          <DialogTitle className="text-[20px] font-semibold">Add skill</DialogTitle>
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
            firstOptions={availableSkillOptions}

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
              disabled={loading || !isValid}
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
