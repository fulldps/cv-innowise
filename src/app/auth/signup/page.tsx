import { SignupForm } from '@/features/auth/signup/ui/signup-form';
import { AuthTabs } from '@/widgets/auth-tabs/ui/auth-tabs';

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-32 h-screen items-center text-white">
      <AuthTabs />
      <main className="flex flex-col gap-15 items-center">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl">Create account</h1>
          <span className="text-xs">Sign up to get started</span>
        </div>
        <SignupForm />
      </main>
    </div>
  );
}
