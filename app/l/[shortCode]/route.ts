import { getLinkByShortCode } from '@/data/links';
import { redirect, notFound } from 'next/navigation';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    notFound();
  }

  redirect(link.url);
}
