'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { useAddCvSkill } from '@/entities/cv/api/use-cv-skill-mutations';
import { MASTERY_OPTIONS, type Mastery, type Skill } from '@/entities/skill';
import { EntityDialog } from '@/shared/ui/entity-dialog';
import { FloatingSelect } from '@/shared/ui/floating-select';

interface AddCvSkillProps {
  cvId: string;
  availableSkills: Skill[];
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function AddCvSkill({ cvId, availableSkills, open, onOpenChange }: AddCvSkillProps) {
  const { addCvSkill, loading } = useAddCvSkill();
  const [skillId, setSkillId] = useState('');
  const [mastery, setMastery] = useState('');

  const handleClose = () => {
    setSkillId('');
    setMastery('');
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    const skill = availableSkills.find((item) => item.id === skillId);
    if (!skill) return;

    try {
      await addCvSkill({
        cvId,
        name: skill.name,
        categoryId: skill.category?.id ?? null,
        mastery: mastery as Mastery,
      });
      toast.success('Skill added successfully');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add skill');
    }
  };

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add skill"
      submitText="Add"
      loadingText="Adding..."
      loading={loading}
      submitDisabled={!skillId || !mastery}
      onSubmit={handleSubmit}
      onCancel={handleClose}
    >
      <div className="flex flex-col gap-4 py-2">
        <FloatingSelect
          label="Skill"
          value={skillId}
          onValueChange={setSkillId}
          options={availableSkills.map((skill) => ({ id: skill.id, name: skill.name }))}
        />
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
