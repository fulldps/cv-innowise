import { redirect } from 'next/navigation';

export default async function CvPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/cvs/${id}/details`);
}
