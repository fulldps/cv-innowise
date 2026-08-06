import { UserLanguages } from '@/widgets/user-languages';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserLanguagesPage({ params }: PageProps) {
  const { userId } = await params;

  return <UserLanguages userId={userId} />;
}
