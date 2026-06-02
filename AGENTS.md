# Agent Instructions for Link Shortener Project

> **⚠️ CRITICAL**: This is NOT standard Next.js. Next.js 16.2.6+ has breaking changes. Always check `node_modules/next/dist/docs/` for patterns before writing code. Deprecation notices are binding.

## Project Identity

This is the **Link Shortener** application:
- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Authentication**: Clerk (production-ready)
- **Database**: Drizzle ORM + Neon PostgreSQL
- **UI**: shadcn/ui + Tailwind CSS 4
- **Status**: Development (ready for feature implementation)

## Quick Navigation

All detailed guidelines are in the `/docs` directory. It is incredibly important to ALWAYS read the relevant individual `.md` file in `/docs` BEFORE generating any code:

- Auth guidelines → `AUTHENTICATION.md`
- UI guidelines → `UI_STYLING.md`

## Core Principles for Agents

### 1. Type Safety
- **No `any` types** without explicit justification
- Use `type` or `interface` for all data structures
- Leverage TypeScript inference with Drizzle's `InferSelectModel`
- Validate data at boundaries (user input, API responses)

### 2. Authentication First
- Every data operation must verify `userId` via `await auth()`
- Queries must filter by user to prevent data leaks
- Use Server Actions for authenticated operations
- Never expose CLERK_SECRET_KEY in client code

### 3. Server-by-Default
- Use Server Components unless interactivity is required
- Data fetching happens on servers, not clients
- Client Components use Server Actions to mutate data
- Database queries are server-exclusive

### 4. Database Integrity
- All schema changes go through `db/schema.ts`
- Run `npx drizzle-kit generate && push` after schema edits
- Use transactions for multi-step operations
- Index frequently queried columns (userId, shortCode)

### 5. Consistency Over Features
- Follow existing code patterns (don't innovate syntax)
- Use shadcn Button, not custom button components
- Apply Tailwind CSS, not inline styles
- Keep component hierarchy shallow

## Implementation Checklist

Before implementing any feature:

- [ ] **Schema first**: Define database schema in `db/schema.ts`
- [ ] **Auth check**: Verify `userId` is retrieved and validated
- [ ] **Type safety**: All TypeScript types defined before logic
- [ ] **Server Action**: If mutating data, use `'use server'`
- [ ] **Error handling**: Try-catch with meaningful messages
- [ ] **UI components**: Use shadcn/ui + Tailwind
- [ ] **Testing**: Feature works locally at http://localhost:3000
- [ ] **Linting**: `npm run lint` passes
- [ ] **No secrets**: Verify no CLERK_SECRET_KEY in client code

## Common Patterns

### Protected Server Function
```typescript
// ✅ Use this pattern for all protected operations
'use server';

import { auth } from '@clerk/nextjs/server';

export async function protectedAction(input: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  // Perform operation with userId
}
```

### Fetching User Data
```typescript
// ✅ Server component
import { auth } from '@clerk/nextjs/server';

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const userLinks = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, userId),
  });
}
```

### Interactive UI with Server Actions
```typescript
// ✅ Client component calling server function
'use client';
import { deleteLink } from '@/app/actions';

export function DeleteButton({ linkId }: { linkId: number }) {
  async function handleDelete() {
    await deleteLink(linkId);
    // Revalidate or redirect
  }
  return <button onClick={handleDelete}>Delete</button>;
}
```

## What NOT to Do

- ❌ Use `useState` in Server Components
- ❌ Database queries in Client Components
- ❌ Hardcoded values (use env vars)
- ❌ Expose CLERK_SECRET_KEY to client
- ❌ CSS-in-JS (use Tailwind)
- ❌ Prop drilling (use React Context if needed)
- ❌ Inline event handlers (extract to functions)

## Debugging Workflow

1. **Check types**: Run `npx tsc --noEmit`
2. **Check linting**: `npm run lint`
3. **Check build**: `npm run build`
4. **Check runtime**: `npm run dev` and test at localhost:3000
5. **Check logs**: Review terminal and browser console
6. **Check database**: `npx drizzle-kit studio`

## Key File Locations

| What | Where |
|------|-------|
| Root layout with Clerk | `app/layout.tsx` |
| Clerk middleware | `proxy.ts` |
| Database schema | `db/schema.ts` |
| Database client | `db/index.ts` |
| UI components | `components/ui/` |
| Utilities | `lib/utils.ts` |
| Server Actions | `app/actions.ts` or per-feature |
| API routes | `app/api/` |
| Environment vars | `.env.local` |

## Environment Setup

Required in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=postgresql://...
```

Get keys from:
- **Clerk**: `clerk env pull`
- **Database**: Neon dashboard

## Resources

- **Next.js**: https://nextjs.org/docs
- **Clerk**: https://clerk.com/docs/nextjs
- **Drizzle**: https://orm.drizzle.team
- **Tailwind**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Project Docs**: `/docs` directory

## Before Committing

```bash
npm run lint        # Fix code style
npx tsc --noEmit    # Check types
npm run build       # Verify build succeeds
npm run dev         # Test locally
```

## Questions?

Refer to the detailed guides in `/docs/`:
- Architecture questions → `PROJECT_OVERVIEW.md`
- Code style questions → `CODE_STANDARDS.md`
- Auth questions → `AUTHENTICATION.md`
- Database questions → `DATABASE.md`
- UI questions → `UI_STYLING.md`
- Pattern questions → `NEXTJS_PATTERNS.md`
- Workflow questions → `DEVELOPMENT_GUIDE.md`

---

**Last Updated**: May 29, 2026 | **Version**: 1.0.0
