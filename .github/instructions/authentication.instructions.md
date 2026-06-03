---
description: Read this beafore implementing or modifying authentication in the project.
---

# Authentication

## Clerk-only authentication
- All authentication in this app is handled by Clerk.
- Do not add any other auth methods, providers, or custom session mechanisms.
- Keep auth logic isolated to Clerk hooks, Clerk server SDK calls, and Clerk modal UI.

## Protected route: `/dashboard`
- The `/dashboard` route is a protected page.
- Users must be signed in to access `/dashboard`.
- If a user is not authenticated, redirect them to the sign-in flow.

### Server-side protection pattern
```ts
'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  // Render dashboard for authenticated users.
}
```

## Homepage redirect behavior
- The public homepage should not be the authenticated landing page.
- Authenticated users should be redirected to `/dashboard` when they visit the root homepage.
- Use the same `auth()` pattern in `app/page.tsx` to detect an authenticated session and redirect.

## Clerk modal sign-in and sign-up
- Sign-in and sign-up flows must always launch as Clerk modals.
- Do not replace Clerk modal behavior with custom page-only forms.
- Use Clerk's `useSignIn`, `useSignUp`, or modal helpers from `@clerk/nextjs`.

### Example modal flow
```tsx
'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function AuthActions() {
  const { openSignIn, openSignUp } = useSignIn();

  return (
    <div>
      <Button onClick={() => openSignIn()}>Sign in</Button>
      <Button onClick={() => openSignUp()}>Sign up</Button>
    </div>
  );
}
```

## Key rules for agents
- Always use Clerk for any auth-related feature.
- Always protect `/dashboard` with a server-side auth check.
- Always redirect authenticated users from the homepage to `/dashboard`.
- Always use Clerk modal sign-in/sign-up instead of custom auth pages.