export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-full flex-col bg-background auth-layout">{children}</div>;
}
