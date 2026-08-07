import { LoginForm } from '@/features/auth/login/ui/login-form';
import { AuthTabs } from '@/widgets/auth-tabs/ui/auth-tabs';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-32 h-screen items-center">
      <AuthTabs />
      <main className="flex flex-col gap-15 items-center">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-3xl">Welcome back</h1>
          <span className="text-sm text-muted-foreground">Hello again! Login to continue</span>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
