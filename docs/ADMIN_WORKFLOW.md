# Admin Workflow

The admin area is a private workspace for managing blog content and reviewing
lead submissions.

## Entry point

- `/admin` shows the dashboard and login state.
- Unauthenticated users see the admin login form.
- Authenticated admin users see the control room dashboard.

## Main screens

- `/admin/blogs` - content library
- `/admin/blogs/new` - create article
- `/admin/blogs/[slug]/edit` - edit article
- `/admin/leads` - contact and consultation queue

## Blog flow

1. Open the library.
2. Create or edit a post in the editor.
3. Save through the admin API route.
4. The JSON content store updates immediately.
5. The public blog reflects the new content without a rebuild.

## Lead flow

1. A visitor submits the public contact or consultation form.
2. The form saves a JSON record in the lead folder.
3. The app sends email if SMTP is configured.
4. The admin lead inbox reads the same stored records.

## UI rules

- Keep the admin shell separate from the public marketing shell.
- Use the dark, high-contrast workspace styling already in `app/globals.css`.
- Show empty states when there are no posts or leads.
- Never expose admin controls on public routes.

## Recovery behavior

If an admin API write fails, the editor should show the error clearly and the
public site should continue to function with the last saved content.
