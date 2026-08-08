'use client';

import { useState } from 'react';

import { useCurrentUser, USER_ROLE, useUser } from '@/entities/user';

import { ProfileAvatar } from './profile-avatar';
import { ProfileInfo } from './profile-info';
import { ProfileForm } from './profile-form';
import { UserProfileTabs } from '@/widgets/user-profile-tabs';

import { ErrorState } from '@/shared/ui/states';

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data, loading, error } = useUser(userId);

  const [isBusy, setIsBusy] = useState(false);

  const currentUser = useCurrentUser();

  const isOwner = currentUser.id === userId;

  const canEdit = isOwner || currentUser.role === USER_ROLE.Admin;

  if (loading) return <div>Loading...</div>;

  if (error || !data?.user) return <ErrorState title="Failed to load profile" />;

  return (
    <section className="space-y-5">
      <UserProfileTabs userId={userId} />
      <div className="flex flex-col items-center">
        <ProfileAvatar
          user={data.user}
          canEdit={canEdit}
          disabled={loading || isBusy}
          setDisabled={setIsBusy}
        />

        <div className="mt-8">
          <ProfileInfo user={data.user} />
        </div>
      </div>

      <div className="mt-15">
        <ProfileForm
          user={data.user}
          canEdit={canEdit}
          disabled={loading || isBusy}
          setDisabled={setIsBusy}
        />
      </div>
    </section>
  );
}
