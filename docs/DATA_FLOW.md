# Data Flow

The app is now database-backed through Prisma.

## Blog content

- Stored in Postgres through `lib/blog/store.ts`
- Served to the public blog and the homepage
- Editable from the admin blog editor
- Includes Cloudinary image URLs and public IDs for cover art

## Leads

- Contact submissions are stored in the `Lead` table
- Consultation submissions are stored in the same `Lead` table with a type flag
- Both are also emailed when SMTP is configured

## Failure handling

The store now depends on Prisma and the database instead of JSON file reads.
That means the live content follows the database state and not the repository
filesystem.
