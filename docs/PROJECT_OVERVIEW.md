# Project Overview

## What This App Does

YodhaMedia Web is the public website and admin workspace for a digital growth agency.

The public side covers:

- Homepage
- About page
- Service pages
- Blog index and article pages
- Contact form
- Consultation booking flow

The private side covers:

- Admin dashboard
- Blog post creation and editing
- Blog library management
- Lead inbox for contact and consultation submissions

This repository is now database-backed with Prisma so the same codebase can run
with persistent blog content, lead tracking, and Cloudinary image metadata.

## Architecture

The app uses the Next.js App Router with server components for most pages and client components for interactive widgets.

Important layers:

- `app/` - route entry points and layouts
- `components/` - reusable UI primitives, forms, admin tools, and layout pieces
- `lib/` - server logic, Prisma access, auth helpers, constants, and utilities
- `prisma/` - schema, config, and seed fixtures
- `content/` - legacy repo assets and examples, not the live datastore

## Current Data Model

The current implementation is Prisma based:

- Blog posts are stored in Postgres
- Contact leads are stored in Postgres
- Consultation leads are stored in Postgres
- Cloudinary image URLs and public IDs are stored alongside the blog post data

`lib/blog/store.ts` is the abstraction boundary for that storage.

## Admin Design System

The admin workspace follows a design direction we called "Digital Sovereignty".

Design rules:

- Use deep charcoal backgrounds
- Keep surfaces transparent or lightly frosted
- Prefer hairline borders over heavy cards
- Use muted gold only for emphasis, focus, and state indicators
- Keep metadata in monospace, small caps styling
- Let headings breathe with generous spacing

Implementation details:

- `app/admin/layout.tsx` contains the shared admin shell
- `app/globals.css` defines admin-specific CSS variables and utility classes
- `components/auth/AdminLogin.tsx` handles private sign-in
- `components/admin/BlogEditor.tsx` handles create/edit flows

## Route Map

- `/admin` - dashboard and entry point
- `/admin/blogs` - content library
- `/admin/blogs/new` - create form
- `/admin/blogs/[slug]/edit` - edit form
- `/admin/leads` - lead review screen

## Documentation Map

- `docs/ARCHITECTURE.md` - how the app is layered
- `docs/API_REFERENCE.md` - request and response contracts
- `docs/DATA_FLOW.md` - Prisma storage and database behavior
- `docs/ADMIN_WORKFLOW.md` - admin screen flow
- `docs/SEED_DATA.md` - seeded content and runtime data rules
- `docs/ERROR_FALLBACKS.md` - graceful failure behavior

## Environment

Required production env values:

- `AUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_SHA256`
- `ADMIN_NAME`

Operational env values:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_TO`

Media and booking env values:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- `NEXT_PUBLIC_BOOKING_URL`

Operational DB value:

- `DATABASE_URL`

## Fallback Notes

- The blog list should always render with either real content or seeded
  content from Prisma.
- Public visitors should get a polished 404 page, not a technical error.

## Maintenance Notes

- Keep `README.md` current whenever routes or env vars change.
- Keep this file current whenever data flow or admin structure changes.
- Avoid mixing public-site UI patterns into admin routes unless there is a strong reason.
- When changing blog schema, update the types in `lib/blog/types.ts` and the editor form together.
