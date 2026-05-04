# Architecture

YodhaMedia Web is a Next.js App Router project that splits the public site and
the admin workspace into separate route trees while sharing the same content
store.

## What lives where

- `app/` contains route entries, layouts, metadata, and server actions/API
  routes.
- `components/` contains reusable UI, forms, admin tools, and section blocks.
- `lib/` contains server-only logic, content storage, auth helpers, utilities,
  and constants.
- `prisma/` and Postgres store the live data for posts and leads, while `content/`
  remains only as a legacy example and seed asset folder.

## Core design idea

The public site should keep working even if the admin side is unavailable. We
do that by:

- Reading public blog content directly from the content store.
- Keeping admin writes behind authentication and route protection.
- Falling back to seeded content if the JSON store is empty or partially broken.
- Showing graceful empty states and 404 pages instead of raw failures.

## Route layers

- Public pages: homepage, services, blog, contact, booking, and work pages.
- Admin pages: dashboard, blog library, editor, and lead inbox.
- API routes: contact, consultation, and admin blog CRUD.

## Important boundaries

- `lib/blog/store.ts` is the persistence boundary.
- `app/admin/layout.tsx` is the admin shell boundary.
- `app/globals.css` contains the shared design tokens plus admin-specific
  variables.

## Why this matters

Keeping these layers separate means the marketing site can evolve independently
from the admin workspace and database migration can happen later without a
rewrite.
