import { UserProfile } from '@/widgets/user-profile';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { userId } = await params;

  return <UserProfile userId={userId} />;
}
