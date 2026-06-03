---
description: Read this before creating or modifying UI components in the project.
---
# UI Styling

## shadcn/ui only
- All UI elements in this app must use `shadcn/ui` components.
- Do not create custom components for buttons, forms, cards, layout elements, or any common UI primitives.
- Use existing `shadcn/ui` components and extend them through props, slots, or Tailwind utility classes when needed.

## No custom components
- Avoid inventing new component APIs for things `shadcn/ui` already covers.
- Do not build custom wrappers around `shadcn/ui` unless they are simple, reusable style abstractions that preserve the base component API.
- If a custom wrapper is required, keep it minimal and do not replace standard `shadcn/ui` behavior.

## Preferred patterns
- Use `Button`, `Input`, `Card`, `Label`, `Textarea`, `Badge`, `Dialog`, `Tabs`, and other existing shadcn/ui components.
- Apply styling via Tailwind classes and component variants, not by creating separate custom UI libraries.
- Keep markup consistent with the existing codebase patterns.

## Examples
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SearchForm() {
  return (
    <form className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" placeholder="Enter a link" />
      </div>
      <Button type="submit">Shorten link</Button>
    </form>
  );
}
```

## Agent rules
- Always use `shadcn/ui` components for UI work.
- Do not substitute custom components for standard UI patterns.
- Prefer built-in shadcn/ui components over any new component creation.
- If a UI need is not covered by shadcn/ui, choose the closest existing component and customize it using props and CSS classes rather than building a new component.
