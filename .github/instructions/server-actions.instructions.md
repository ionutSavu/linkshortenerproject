---
description: Read this before creating or modifying server actions, data mutations, or mutation flows from client components.
---

# Server Actions

## Core mutation rule
- All data mutations in this app must be implemented in Server Actions.
- Server Actions must be invoked from Client Components.

## File naming and placement
- Server Action files must be named `actions.ts`.
- Each `actions.ts` file must be colocated with the component directory that calls it.

## Input typing
- Every Server Action input must use explicit, appropriate TypeScript types.
- Do not use `FormData` as a Server Action input type.

## Validation
- Validate all Server Action inputs with Zod before any business logic or database operation.

## Authentication-first flow
- Every Server Action must check authentication first.
- For authenticated mutations, resolve `userId` and fail fast if no logged-in user is present.

## Error handling contract
- Server Actions must not throw errors.
- Server Actions must return a typed object with either a `success` property or an `error` property.

## Database access pattern
- Server Actions must not execute Drizzle queries directly.
- All database operations must go through helper functions in `/data` that wrap Drizzle.

## Agent rules
- Always create mutations in `actions.ts` files.
- Always type and validate inputs with TypeScript + Zod.
- Always perform auth checks before database work.
- Always return structured `{ success }` or `{ error }` results from Server Actions instead of throwing.
- Always call `/data` helpers for DB operations instead of querying Drizzle from Server Actions.
