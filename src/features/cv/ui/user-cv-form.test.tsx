import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { UserCvForm } from './user-cv-form';
import type { UserCvFormValues } from '../model/user-cv-form.types';

function TestForm({ disabled = false }: { disabled?: boolean }) {
  const form = useForm<UserCvFormValues>({
    defaultValues: {
      name: 'My CV',
      description: 'Frontend developer',
    },
  });

  return <UserCvForm form={form} disabled={disabled} />;
}

describe('UserCvForm', () => {
  it('renders CV fields with current values', () => {
    render(<TestForm />);

    expect(screen.getByDisplayValue('My CV')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Frontend developer')).toBeInTheDocument();
    expect(screen.getByText('CV name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('disables fields when disabled is true', () => {
    render(<TestForm disabled />);

    expect(screen.getByDisplayValue('My CV')).toBeDisabled();
    expect(screen.getByDisplayValue('Frontend developer')).toBeDisabled();
  });
});
