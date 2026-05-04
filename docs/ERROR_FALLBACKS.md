# Error Fallbacks

The app should fail softly whenever possible.

## Public blog

- If the content store has no posts, the blog index shows a helpful empty state.
- If a single JSON file is broken, the store skips it and keeps the rest.
- If a slug does not exist, the post page can still use the global not-found
  page.

## Forms

- The contact form and consultation flow should return readable API errors.
- When the network or API is unavailable, the UI should show the failure and a
  safe next step instead of freezing.

## 404 behavior

- The root site uses a branded not-found page.
- The admin area uses an admin-specific not-found page.

## Why this matters

Users should never have to guess whether the site is broken or just waiting on
data. Good fallback states preserve trust.
