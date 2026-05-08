## Goal

Build a real Reviews page where each client review has its own openable, shareable link. Leave the navbar as it is.

---

## Reviews page

**New routes:**
- `/reviews` (list of all reviews)
- `/reviews/:id` (single review detail)

**Data source:** existing `testimonials` Supabase table (`id`, `author`, `role`, `quote`, `photo_url`, `video_url`, `link`, `featured`, `display_order`). Falls back to static `TESTIMONIALS` from `src/lib/data.ts` when DB is empty (same pattern Home already uses).

**`/reviews` (list page):**
- Page header: "Kind Words" / "What clients say".
- Grid of all reviews using the same visual language as the Home testimonials cards (glass card, 5 stars, quote, avatar, name/role).
- Whole card is a `<Link to={`/reviews/${id}`}>` so it opens the dedicated in-site detail page (no external redirect, per the existing site rule).
- Small "Copy link" icon on each card that copies `window.location.origin + /reviews/{id}` to the clipboard.
- Optional filter chip row: All / Featured.

**`/reviews/:id` (single review page):**
- Large quote, author photo, name, role, 5 stars.
- If `video_url` is present, embed the player inline on the page (no external redirect).
- If `link` is present, render it as plain text plus a copy button (kept on-site per existing rule).
- "Back to all reviews" link.
- "Copy shareable link" button.
- Sets document title to `"{author} on Anshul"` for SEO.
- If id not found, redirect to `/reviews`.

**Home page change:**
- Keep the testimonials section, but make each card link to `/reviews/{id}` instead of the external `t.link`.
- Add a "See all reviews" CTA below the grid pointing to `/reviews`.

**Static data compatibility:**
- Static `TESTIMONIALS` in `src/lib/data.ts` has no stable id today. Add a `slug` (kebab-case of author) per static entry so the fallback path also works for `/reviews/:id`. DB-backed reviews use the row `id`.

---

## Files

- **New:** `src/pages/Reviews.tsx`, `src/pages/ReviewDetail.tsx`
- **Edit:** `src/App.tsx` (register `/reviews` and `/reviews/:id`)
- **Edit:** `src/pages/Home.tsx` (link testimonial cards to `/reviews/:id`, add "See all reviews" CTA)
- **Edit:** `src/lib/data.ts` (add `slug` to static `TESTIMONIALS` fallback)

No navbar changes. No DB schema changes. No external redirects.
