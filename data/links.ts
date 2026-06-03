import { db } from '@/db';
import { links, SelectLink, InsertLink } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function createLink(data: InsertLink): Promise<SelectLink> {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function getLinksByUserId(userId: string): Promise<SelectLink[]> {
  return db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, userId),
    orderBy: (links, { desc }) => [desc(links.createdAt)],
  });
}

export async function updateLink(
  id: number,
  userId: string,
  data: { url: string; shortCode: string }
): Promise<SelectLink | null> {
  const [updated] = await db
    .update(links)
    .set({ url: data.url, shortCode: data.shortCode, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return updated ?? null;
}

export async function deleteLink(id: number, userId: string): Promise<boolean> {
  const result = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning({ id: links.id });
  return result.length > 0;
}

export async function getLinkByShortCode(shortCode: string): Promise<SelectLink | null> {
  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortCode, shortCode),
  });
  return link ?? null;
}
