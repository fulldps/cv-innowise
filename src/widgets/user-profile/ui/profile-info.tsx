import type { User } from '@/entities/user';

interface ProfileInfoProps {
  user: User;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const createdAt = user.profile.created_at
    ? new Date(Number(user.profile.created_at))
        .toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        .replaceAll(',', '')
    : '—';

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[28px] leading-none text-primary">{user.profile.full_name}</h1>

      <p className="mt-4 text-base leading-none text-muted-foreground">{user.email}</p>

      <p className="mt-2 text-base leading-none text-primary">A member since {createdAt}</p>
    </div>
  );
}
