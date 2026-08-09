import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import { CvForm } from './cv-form';
import { type CvFormValues } from '../model/schema';

function TestForm({ disabled = false }: { disabled?: boolean }) {
  const form = useForm<CvFormValues>({
    defaultValues: {
      name: '',
      description: '',
      education: '',
    },
  });

  return <CvForm form={form} disabled={disabled} />;
}

describe('CvForm', () => {
  it('renders all CV fields', () => {
    render(<TestForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Education')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('allows the user to enter CV data', async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const nameInput = screen.getByLabelText('Name');
    const educationInput = screen.getByLabelText('Education');
    const descriptionInput = screen.getByLabelText('Description');

    await user.type(nameInput, 'My CV');
    await user.type(educationInput, 'BSUIR');
    await user.type(descriptionInput, 'Frontend developer');

    expect(nameInput).toHaveValue('My CV');
    expect(educationInput).toHaveValue('BSUIR');
    expect(descriptionInput).toHaveValue('Frontend developer');
  });

  it('disables all fields when disabled is true', () => {
    render(<TestForm disabled />);

    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Education')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
  });
});
