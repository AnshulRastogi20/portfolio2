## Goal

Three small fixes:
1. Remove em dashes (—) and en dashes (–) from all user-facing text on the site.
2. Add Reviews to the navbar.
3. Ensure every blog post has its own unique, shareable link (with a visible share button).

---

## 1. Remove em / en dashes

A scan of the codebase shows dash characters in user-visible content only in `src/lib/data.ts` (e.g. `"Jan 2025 – Present"`). Replace `—` and `–` with a regular hyphen `-` (or rephrase where it reads better, e.g. " to ").

- **Edit:** `src/lib/data.ts` — replace dashes in strings (only the `–` in the `"Jan 2025 – Present"` line was found, but I will sweep the whole file again at edit time to catch anything missed).
- Re-grep `src/`, `index.html` after the edit to confirm zero remaining `—` / `–` in source strings.

Code identifiers, math, and JSX comments are not affected (the scan already filtered those out).

## 2. Reviews link in the navbar

`src/components/Nav.tsx` currently has `mainLinks` (Home, About, Work, Awards, Blog, Services, Contact) and a `moreLinks` dropdown. Reviews is in neither.

- **Edit:** `src/components/Nav.tsx` — add `{ to: "/reviews", label: "Reviews" }` to `mainLinks`, inserted between `Awards` and `Blog` so it sits with the other primary destinations. No other navbar changes (per the user's earlier instruction to keep the navbar as-is otherwise).

## 3. Unique shareable link per blog post

Routing already exists: `src/App.tsx` registers `/blog/:slug`, `Blog.tsx` links each card via `<Link to={`/blog/${p.slug}`}>`, and `BlogPost.tsx` renders the post. So every post already has a unique URL like `/blog/my-post-slug`.

What is missing is a visible way to share that URL from the post page. Add a share/copy-link affordance:

- **Edit:** `src/pages/BlogPost.tsx`
  - Add a "Copy link" button near the post title/header that copies `window.location.origin + /blog/{slug}` to the clipboard and shows a toast ("Link copied").
  - If `navigator.share` is available (mobile), use the native share sheet; otherwise fall back to clipboard copy.
  - Set `document.title` to the post title for cleaner shared previews (if not already set).

- **Edit:** `src/pages/Blog.tsx` (optional, light touch)
  - Add the same small "Copy link" icon button on each card in the list, mirroring the pattern already used on the Reviews list page, so users can grab a shareable link without opening the post.

No DB changes, no routing changes, no new pages.

---

## Files

- **Edit:** `src/lib/data.ts` (strip em/en dashes from strings)
- **Edit:** `src/components/Nav.tsx` (add Reviews to `mainLinks`)
- **Edit:** `src/pages/BlogPost.tsx` (Copy link / Share button + document title)
- **Edit:** `src/pages/Blog.tsx` (small Copy link icon on each card)
