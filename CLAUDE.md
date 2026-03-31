# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000, Studio at /studio)
npm run build        # Production build
npm run lint         # ESLint (flat config, Next.js core web vitals + a11y)
npm run seed         # Seed Sanity with demo content (requires .env.local)
```

No test runner is configured.

## Architecture

**Stack:** Next.js 16 (App Router) + Sanity CMS v5 + TypeScript strict + Tailwind CSS v4

### Page Builder System

The core architecture is a modular page builder. Pages in Sanity have a `modules` field (union type) that maps to React components via `src/components/PageBuilder.tsx`:

- Sanity object schemas in `src/sanity/schemas/objects/` define module structure
- React components in `src/components/modules/` render each module type
- `moduleMap` in `PageBuilder.tsx` connects Sanity `_type` to component
- `fullBleedModules` set controls which modules skip the `py-section` wrapper

To add a new module: create Sanity schema object, create component directory, register in `moduleMap`, add to `pageBuilder.ts` array.

### Data Fetching

- All fetching happens server-side via `sanityFetch()` from `@/sanity/lib/client`
- GROQ queries live in `src/sanity/lib/queries.ts`
- ISR caching uses `tags` param on `sanityFetch()`, invalidated via `/api/revalidate` webhook
- Never fetch in client components — pass data as props

### Routing

- `(site)/` route group: public pages with shared layout (Nav + Footer)
- `(site)/[slug]/page.tsx`: dynamic pages from Sanity `page` documents
- `(site)/blog/[slug]/page.tsx`: blog posts from `blogPost` documents
- `studio/[[...tool]]/page.tsx`: embedded Sanity Studio

### Design Tokens

All brand values defined in `src/app/globals.css` via Tailwind v4 `@theme inline` block. Components reference tokens like `text-brand-primary`, `bg-brand-surface`, `py-section`. Never hardcode colors or spacing.

### Sanity Schemas

- Documents: `src/sanity/schemas/documents/` — page, blogPost, globalSettings (singleton), navigation, footer, teamMember, formSubmission
- Objects: `src/sanity/schemas/objects/` — 12 page builder modules + seo, link
- Use `defineType`, `defineField`, `defineArrayMember` from `sanity`
- All image fields must include a required `alt` string field
- All slugs use `isUnique` validator from `@/sanity/lib/isUnique`

## Conventions

- **Components:** one directory per component with `index.tsx` + optional `types.ts`, default exports, props interface named `[ComponentName]Props`
- **Styling:** Tailwind utilities only, mobile-first responsive (`sm:`, `md:`, `lg:`), use `cn()` from `@/lib/utils` for conditional classes
- **Images:** always use `SanityImage` component, not `next/image` directly
- **TypeScript:** strict mode, no `any`, prefer `interface` over `type` for object shapes
- **Client components:** only use `"use client"` when genuinely needed for interactivity
- **Accessibility:** semantic HTML, ARIA on custom widgets, keyboard navigable, skip link in root layout
- **Avoid:** Pages Router, CSS modules, fetching in client components, hardcoded strings, installing packages without checking if current stack covers it
