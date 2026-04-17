# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

# Next.js Theme on Sanity CMS

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

### React List Keys and Sanity Live Preview

Sanity's stega encoding embeds invisible Unicode characters into every string prop when Live Preview is active. If a Sanity string field is used as a React `key`, the key changes on every content update — causing React to unmount and remount list items. This breaks GSAP animations (elements snap to their hidden initial state and don't re-animate because their ScrollTrigger threshold has already been passed).

**Rules:**
- Always use `_key` for Sanity array items: `key={item._key}` or `key={item._key ?? i}` as a fallback for hardcoded defaults
- Use `_id` for Sanity document references (blog posts, team members, etc.)
- Never use string fields (`name`, `title`, `label`, `url`, `platform`, `slug`) as `key`
- Index (`i`) is only acceptable for `string[]` primitive arrays, string splits, and positional UI elements (e.g. carousel dots)
- When writing explicit GROQ array projections, always include `_key`: `items[] { _key, name, ... }` — `...` spread includes it automatically

### String Comparisons with Sanity Values

Stega encoding also corrupts string comparisons (`=== "right"`, `=== "dark"`, etc.). Any Sanity string field used in a conditional must be cleaned first.

**Rule:** Always call `stegaClean()` from `@sanity/client/stega` before comparing a Sanity string to a literal value:

```ts
import { stegaClean } from "@sanity/client/stega";

const placement = stegaClean(imagePlacement); // then use `placement === "right"`
const scheme = stegaClean(colorScheme);       // then use `scheme === "dark"`
```

This applies to any prop sourced from Sanity: color schemes, placement options, variant flags, status fields, etc.

## Conventions

- **Components:** one directory per component with `index.tsx` + optional `types.ts`, default exports, props interface named `[ComponentName]Props`
- **Styling:** Tailwind utilities only, mobile-first responsive (`sm:`, `md:`, `lg:`), use `cn()` from `@/lib/utils` for conditional classes
- **Images:** always use `SanityImage` component, not `next/image` directly
- **TypeScript:** strict mode, no `any`, prefer `interface` over `type` for object shapes
- **Client components:** only use `"use client"` when genuinely needed for interactivity
- **Accessibility:** semantic HTML, ARIA on custom widgets, keyboard navigable, skip link in root layout
- **Avoid:** Pages Router, CSS modules, fetching in client components, hardcoded strings, installing packages without checking if current stack covers it
