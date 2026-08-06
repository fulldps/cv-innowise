'use client';

import { useForm, useFormState } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { toast } from 'sonner';

import { PROFICIENCY_OPTIONS, Language } from '@/entities/language';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { SelectFieldsForm } from '@/shared/ui/two-select-form';

import { useAddLanguage } from '../api/use-add-language';
import { addLanguageSchema, type AddLanguageFormValues } from '../model/add-language.schema';
import { getAddLanguageDefaultValues } from '../model/add-language.defaults';

interface AddLanguageDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  userId: string;

  availableLanguages: Language[];
}

export function AddLanguageDialog({
  open,
  onOpenChange,
  userId,
  availableLanguages,
}: AddLanguageDialogProps) {
  const { addLanguage, loading } = useAddLanguage(userId, availableLanguages);

  const form = useForm<AddLanguageFormValues>({
    resolver: standardSchemaResolver(addLanguageSchema),

    defaultValues: getAddLanguageDefaultValues(),

    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  const handleClose = () => {
    form.reset(getAddLanguageDefaultValues());

    onOpenChange(false);
  };

  const onSubmit = async (values: AddLanguageFormValues) => {
    try {
      await addLanguage(values);

      toast.success('Language added successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to add language');
    }
  };

  const availableLanguageOptions = availableLanguages.map((language) => ({
    id: language.id,
    name: language.name,
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
          <DialogTitle className="text-[20px] font-semibold">Add language</DialogTitle>
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
            firstOptions={availableLanguageOptions}

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
