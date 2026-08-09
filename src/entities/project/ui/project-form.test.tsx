import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import { ProjectForm } from './project-form';
import type { ProjectFormValues } from '../model/schema';

function TestForm({ disabled = false }: { disabled?: boolean }) {
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      projectId: '',
      start_date: '',
      end_date: '',
      roles: '',
      responsibilities: '',
    },
  });

  return (
    <ProjectForm
      form={form}
      projects={[
        { id: 'project-1', name: 'HRM System' },
        { id: 'project-2', name: 'E-commerce' },
      ]}
      disabled={disabled}
    />
  );
}

describe('ProjectForm', () => {
  it('renders all project fields', () => {
    render(<TestForm />);

    expect(screen.getByRole('combobox', { name: 'Project' })).toBeInTheDocument();
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Roles (one per line)')).toBeInTheDocument();
  });

  it('renders available projects in the project select', async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const projectSelect = screen.getByRole('combobox', { name: 'Project' });

    await user.click(projectSelect);

    expect(screen.getByText('HRM System')).toBeInTheDocument();
    expect(screen.getByText('E-commerce')).toBeInTheDocument();
  });

  it('allows the user to enter project data', async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const projectSelect = screen.getByRole('combobox', { name: 'Project' });
    const startDateInput = screen.getByLabelText('Start date');
    const endDateInput = screen.getByLabelText('End date');
    const responsibilitiesInput = screen.getByPlaceholderText('Responsibilities (one per line)');
    const rolesInput = screen.getByPlaceholderText('Roles (one per line)');

    await user.click(projectSelect);
    await user.click(screen.getByText('HRM System'));

    await user.type(startDateInput, '2026-01-01');
    await user.type(endDateInput, '2026-06-01');
    await user.type(responsibilitiesInput, 'Develop frontend\nFix bugs');
    await user.type(rolesInput, 'Frontend developer\nReact developer');

    expect(projectSelect).toHaveTextContent('HRM System');
    expect(startDateInput).toHaveValue('2026-01-01');
    expect(endDateInput).toHaveValue('2026-06-01');
    expect(responsibilitiesInput).toHaveValue('Develop frontend\nFix bugs');
    expect(rolesInput).toHaveValue('Frontend developer\nReact developer');
  });

  it('allows the end date to remain empty', async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const startDateInput = screen.getByLabelText('Start date');
    const endDateInput = screen.getByLabelText('End date');

    await user.type(startDateInput, '2026-01-01');

    expect(startDateInput).toHaveValue('2026-01-01');
    expect(endDateInput).toHaveValue('');
  });

  it('disables all fields when disabled is true', () => {
    render(<TestForm disabled />);

    expect(screen.getByRole('combobox', { name: 'Project' })).toBeDisabled();
    expect(screen.getByLabelText('Start date')).toBeDisabled();
    expect(screen.getByLabelText('End date')).toBeDisabled();
    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toBeDisabled();
    expect(screen.getByPlaceholderText('Roles (one per line)')).toBeDisabled();
  });
});
