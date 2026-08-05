import { UserSkills } from '@/widgets/user-skills';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserSkillsPage({ params }: PageProps) {
  const { userId } = await params;

  return <UserSkills userId={userId} />;
}
