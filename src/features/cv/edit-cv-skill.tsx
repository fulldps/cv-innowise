'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { useUpdateCvSkill } from '@/entities/cv/api/use-cv-skill-mutations';
import { MASTERY_OPTIONS, type Mastery } from '@/entities/skill';
import { EntityDialog } from '@/shared/ui/entity-dialog';
import { FloatingSelect } from '@/shared/ui/floating-select';

export interface EditingCvSkill {
  name: string;
  categoryId: string | null;
  mastery: Mastery;
}

interface EditCvSkillProps {
  cvId: string;
  skill: EditingCvSkill | null;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function EditCvSkill({ cvId, skill, open, onOpenChange }: EditCvSkillProps) {
  const { updateCvSkill, loading } = useUpdateCvSkill();
  const [mastery, setMastery] = useState(skill?.mastery ?? '');

  if (!skill) return null;

  const handleSubmit = async () => {
    try {
      await updateCvSkill({
        cvId,
        name: skill.name,
        categoryId: skill.categoryId,
        mastery: mastery as Mastery,
      });
      toast.success('Skill updated successfully');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update skill');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${skill.name}`}
      submitText="Update"
      loadingText="Updating..."
      loading={loading}
      submitDisabled={!mastery}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
    >
      <div className="flex flex-col gap-4 py-2">
        <FloatingSelect
          label="Mastery"
          value={mastery}
          onValueChange={setMastery}
          options={MASTERY_OPTIONS}
        />
      </div>
    </EntityDialog>
  );
}
