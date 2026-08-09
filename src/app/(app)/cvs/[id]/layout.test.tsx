import { render, screen } from '@testing-library/react';

import { useParams, usePathname } from 'next/navigation';

import CvsLayout from './layout';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('CvsLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useParams).mockReturnValue({
      id: 'cv-123',
    });

    jest.mocked(usePathname).mockReturnValue('/cvs/cv-123/details');
  });

  it('renders all CV navigation tabs', () => {
    render(
      <CvsLayout>
        <div>Page content</div>
      </CvsLayout>,
    );

    expect(screen.getByRole('link', { name: 'DETAILS' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'SKILLS' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'PROJECTS' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'PREVIEW' })).toBeInTheDocument();
  });

  it('generates correct links for the current CV', () => {
    render(
      <CvsLayout>
        <div>Page content</div>
      </CvsLayout>,
    );

    expect(screen.getByRole('link', { name: 'DETAILS' })).toHaveAttribute(
      'href',
      '/cvs/cv-123/details',
    );

    expect(screen.getByRole('link', { name: 'SKILLS' })).toHaveAttribute(
      'href',
      '/cvs/cv-123/skills',
    );

    expect(screen.getByRole('link', { name: 'PROJECTS' })).toHaveAttribute(
      'href',
      '/cvs/cv-123/projects',
    );

    expect(screen.getByRole('link', { name: 'PREVIEW' })).toHaveAttribute(
      'href',
      '/cvs/cv-123/preview',
    );
  });

  it('marks the current tab as active', () => {
    render(
      <CvsLayout>
        <div>Page content</div>
      </CvsLayout>,
    );

    const detailsLink = screen.getByRole('link', { name: 'DETAILS' });

    expect(detailsLink.className).toContain('border-destructive');
    expect(detailsLink.className).toContain('text-destructive');
  });

  it('does not mark inactive tabs as active', () => {
    render(
      <CvsLayout>
        <div>Page content</div>
      </CvsLayout>,
    );

    const skillsLink = screen.getByRole('link', { name: 'SKILLS' });

    expect(skillsLink.className).not.toContain('border-destructive');
    expect(skillsLink.className).not.toContain('text-destructive');
  });

  it('renders page children', () => {
    render(
      <CvsLayout>
        <div>Page content</div>
      </CvsLayout>,
    );

    expect(screen.getByText('Page content')).toBeInTheDocument();
  });
});
