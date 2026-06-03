'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, updateLink, deleteLink } from '@/data/links';
import { revalidatePath } from 'next/cache';

const createLinkSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  shortCode: z
    .string()
    .min(2, { message: 'Short code must be at least 2 characters.' })
    .max(32, { message: 'Short code must be at most 32 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Short code may only contain letters, numbers, hyphens, and underscores.',
    }),
});

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  shortCode: z
    .string()
    .min(2, { message: 'Short code must be at least 2 characters.' })
    .max(32, { message: 'Short code must be at most 32 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Short code may only contain letters, numbers, hyphens, and underscores.',
    }),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function createLinkAction(
  input: CreateLinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: 'You must be signed in to create a link.' };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await createLink({
      userId,
      url: parsed.data.url,
      shortCode: parsed.data.shortCode,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('unique') || message.includes('duplicate')) {
      return { error: 'That short code is already taken. Please choose another.' };
    }
    return { error: 'Failed to create link. Please try again.' };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: 'You must be signed in to edit a link.' };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const updated = await updateLink(parsed.data.id, userId, {
      url: parsed.data.url,
      shortCode: parsed.data.shortCode,
    });
    if (!updated) return { error: 'Link not found or you do not have permission to edit it.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('unique') || message.includes('duplicate')) {
      return { error: 'That short code is already taken. Please choose another.' };
    }
    return { error: 'Failed to update link. Please try again.' };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteLinkAction(
  id: number
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: 'You must be signed in to delete a link.' };

  if (!Number.isInteger(id) || id <= 0) {
    return { error: 'Invalid link ID.' };
  }

  try {
    const deleted = await deleteLink(id, userId);
    if (!deleted) return { error: 'Link not found or you do not have permission to delete it.' };
  } catch {
    return { error: 'Failed to delete link. Please try again.' };
  }

  revalidatePath('/dashboard');
  return { success: true };
}
