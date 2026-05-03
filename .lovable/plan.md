## Make Review Cards Clickable with Direct & Video Links

The testimonials section on the Home page already fetches `link`, `photo_url`, and `video_url` from the database, but the cards themselves aren't clickable as a whole. This plan makes them fully interactive.

### Changes

**File: `src/pages/Home.tsx`**

1. Wrap each testimonial card in an `<a>` tag linking to `t.link` (when available), so clicking anywhere on the card opens the review source.
2. Make the video link button more prominent — larger icon, styled as a small pill/badge (e.g., gold-colored "Watch Video" button) so it's clearly visible and tappable.
3. Use `e.stopPropagation()` on the video link so it navigates to the video URL independently of the card's main link.
4. Cards without a `link` remain non-clickable but still show video buttons if `video_url` exists.
