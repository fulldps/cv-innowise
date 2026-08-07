import { redirect } from 'next/navigation';

import { ResetPasswordForm } from '@/features/auth/reset-password/ui/reset-password-form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <main className="flex flex-col items-center gap-15">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl">Reset password</h1>
          <span className="text-sm text-muted-foreground">Enter your new password</span>
        </div>
        <ResetPasswordForm token={token} />
      </main>
    </div>
  );
}
