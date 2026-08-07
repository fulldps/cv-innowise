import { ForgotPasswordForm } from '@/features/auth/forgot-password/ui/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <main className="flex flex-col items-center gap-15">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl">Forgot password</h1>
          <span className="text-sm text-muted-foreground">
            We will send you an email with further instructions
          </span>
        </div>
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
