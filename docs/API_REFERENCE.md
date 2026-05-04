# API Reference

This project uses a small set of Next.js route handlers. They are intentionally
simple so the public site can stay stable while the admin tooling changes.

## `POST /api/contact`

Used by the public contact form.

### Request body

- `name` - required
- `email` - required
- `phone` - required
- `company` - optional
- `service` - optional
- `budget` - optional
- `message` - required
- `website` - honeypot field, should stay empty
- `source` - optional tracking string
- `pageUrl` - optional tracking string

### Success response

```json
{
  "ok": true,
  "message": "We received your request and will reply shortly."
}
```

### Failure responses

- `400` when required fields are missing
- `500` when the lead cannot be stored or emailed

## `POST /api/consultation`

Used by the consultation flow.

### Request body

- `name` - required
- `email` - required
- `phone` - required
- `preferredDate` - optional
- `timezone` - optional
- `notes` - optional
- `bookingUrl` - optional
- `service` - optional
- `source` - optional

### Success response

```json
{
  "ok": true,
  "message": "Thanks, we received your consultation request. You can also pick a free slot on the booking page."
}
```

### Failure responses

- `400` when required fields are missing
- `500` when the lead cannot be stored or emailed

## `POST /api/admin/posts`

Creates a new blog post.

### Auth

Requires an authenticated admin session.

### Request body

The blog editor sends:

- `slug`
- `category`
- `title`
- `excerpt`
- `date`
- `readTime`
- `icon`
- `tags`
- `takeaway`
- `author`
- `coverImage`
- `status`
- `featured`
- `publishedAt`
- `seoTitle`
- `seoDescription`
- `content`

### Success response

```json
{
  "ok": true,
  "post": { "...": "saved blog record" }
}
```

### Failure responses

- `401` when the user is not an admin
- `400` when required blog fields are missing
- `409` when the slug already exists
- `500` when the save fails

## `PATCH /api/admin/posts/[slug]`

Updates an existing blog post. It accepts the same shape as the create route.

### Success response

```json
{
  "ok": true,
  "post": { "...": "updated blog record" }
}
```

### Failure responses

- `401` when the user is not an admin
- `404` when the post does not exist
- `409` when the new slug collides with another post
- `500` when the update fails

## `DELETE /api/admin/posts/[slug]`

Deletes a blog post.

### Success response

```json
{
  "ok": true
}
```

### Failure responses

- `401` when the user is not an admin
- `500` when the delete fails

## Design note

All public forms and content pages should tolerate these route handlers being
temporarily unavailable. The app should degrade to helpful messages, not blank
screens.
