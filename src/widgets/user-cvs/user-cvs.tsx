'use client';

import { useUser } from '@/entities/user';

import { UserProfileTabs } from '@/widgets/user-profile-tabs';
import { UserCvsList } from '@/widgets/user-cvs-list';

interface UserCvsProps {
  userId: string;
}

export function UserCvs({ userId }: UserCvsProps) {
  const { data, loading, error } = useUser(userId);

  if (loading && !data?.user) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data?.user) {
    if (loading) return <div>Loading...</div>;

    return <div>User not found</div>;
  }

  return (
    <section className="space-y-5">
      <UserProfileTabs userId={userId} />

      <UserCvsList userId={userId} />
    </section>
  );
}
