import { UserCvs } from '@/widgets/user-cvs';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserCvsPage({ params }: PageProps) {
  const { userId } = await params;

  return <UserCvs userId={userId} />;
}
