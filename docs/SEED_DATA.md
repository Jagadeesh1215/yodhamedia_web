# Seed Data

The repository now uses Prisma seed fixtures as the initial source of truth.

## Current seeded content

The seed script at [`prisma/seed.cjs`](../prisma/seed.cjs) inserts:

- 10 sample blog posts
- 5 contact leads
- 5 consultation leads
- Cloudinary cover image URLs plus public IDs for the seeded posts

## Why seed data exists

- It keeps the public blog usable on a fresh clone.
- It gives the admin editor and inbox real data to work with immediately.
- It documents the database shape for future contributors.

## What to update when adding new content

- Update the Prisma seed script
- Keep the payloads aligned with `lib/blog/types.ts`
- Run `pnpm exec prisma db seed` after changing the fixtures

## Lead seed notes

The seed script now adds demo inbox entries on purpose so the admin dashboard
has something to display in development.

## Recommendation

Use Prisma seed fixtures for demo data, and use the admin UI for live content.
