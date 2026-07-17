import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-32 h-screen items-center">
      <header className="flex">
        <div>Login</div>
        <div>Sign up</div>
      </header>
      <main>
        <div>
          <h1>Welcome back</h1>
          <span>Hello again! Login to continue</span>
        </div>
        <div>
          <input type="text" />
          <input type="text" />
        </div>
        <div>
          <button>Login</button>
          <Link href={'/'}>Forget password</Link>
        </div>
      </main>
    </div>
  );
}
