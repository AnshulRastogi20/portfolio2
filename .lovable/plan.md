
# Finish Anshul's Personal Brand Platform

Two tracks: **(A) wire up the backend** for everything that's currently UI-only, and **(B) ship the missing pieces + fix bugs**.

## A. Backend: bring the forms to life

The project is connected to Supabase. We'll add 5 tables, RLS, an admin role system, an admin dashboard, and email sending.

### A1. Database (one migration)

```text
subscribers          (id, email UNIQUE, source, created_at)
waitlist_entries     (id, email, kind 'course'|'product', slug, created_at)
contact_submissions  (id, name, email, topic, message, created_at)
blog_posts           (id, slug UNIQUE, title, excerpt, content, category,
                      tags text[], cover_url, read_time, featured bool,
                      published bool, published_at, created_at, updated_at)
app_role             ENUM ('admin', 'editor')
user_roles           (id, user_id → auth.users, role app_role, UNIQUE(user_id, role))
```

RLS rules:
- **Public INSERT** allowed on `subscribers`, `waitlist_entries`, `contact_submissions` (anyone can sign up / write in)
- **No public SELECT** on those three (no email harvesting)
- `blog_posts` SELECT public when `published = true`; admin/editor can do everything
- `user_roles` readable by the owner; only admins can mutate (via `has_role()` security-definer fn to avoid recursion)

Plus `has_role(uuid, app_role)` security-definer function — used by every admin policy.

### A2. Wire the UI to the database

- `SignupForm` → insert into `subscribers` (when context is "newsletter") or `waitlist_entries` (otherwise). Handle duplicate-email gracefully.
- Footer signup → same as newsletter.
- Contact form → insert into `contact_submissions`, then invoke the email edge function.
- All inserts use the anon key + RLS-allowed insert policies — no auth required.

### A3. Email (Lovable Emails, built-in)

Two transactional templates:
1. **`contact-confirmation`** → sent to the visitor when they submit the contact form.
2. **`contact-notification`** → sent to **you** (Anshul) when a contact form is submitted, so you actually find out. (This is still a transactional email — single recipient, triggered by a specific event.)

Both fire from a single `supabase.functions.invoke('send-transactional-email', ...)` call site after the contact insert succeeds. Idempotency keys derived from the submission ID.

Newsletter "lead magnet" delivery is **not** done as bulk email — when someone subscribes we just show them a download link in the success toast / on a `/thank-you` page (a single PDF link). Sending newsletters is out of scope for transactional emails by design.

### A4. Admin dashboard

- `/admin/login` — Supabase email + password sign-in.
- `/admin` — protected route. Checks `has_role(user, 'admin')` before rendering. If not admin → redirects to `/`.
- Tabs:
  - **Subscribers** — table, search, count, **Export CSV**.
  - **Waitlists** — grouped by `kind:slug`, count per group, **Export CSV** per group.
  - **Contact submissions** — table, mark-as-read toggle (add `read_at` column), reply-to-email link.
  - **Blog posts** — list + create/edit/delete form (title, slug, excerpt, content as markdown textarea, category, tags, cover URL, featured, published toggle).
- Bootstrap: a small `useEffect` in admin login that, **only if zero admins exist**, allows the first signed-in user to claim admin (one-time). After that, admins must be granted via SQL or by another admin in the dashboard.

### A5. Make the public blog read from the DB

`Blog` and `BlogPost` pages read from `blog_posts` where `published = true`. Falls back to the static seed data if the table is empty (so the site keeps looking populated until you write your first post).

## B. Missing UI pieces + bug fixes

### B1. Bug fixes
- **Footer ref warning** — `FooterCol` is being given a ref by something in its tree. Wrap it with `React.forwardRef` (or inline its JSX into Footer). Fixes the React dev-mode warning currently in the console.
- **Custom cursor jitter** — the `useEffect` re-runs on every mouse move because `pos.x/pos.y` are in the dep array. Refactor to use refs so the animation loop is created once.
- **`/skills` Resume route** — nav has no link to a `/resume` page. Add a simple `/resume` page that opens a PDF in a new tab (placeholder PDF until you upload yours).

### B2. Floating "Back to top"
Small motion button, shows after 600px scroll, smooth-scrolls to top.

### B3. Project detail pages
`/skills/:slug` — problem → approach → outcome → lessons layout, links from the project cards.

### B4. About page additions
- Photo strip (4–6 placeholder images in a horizontal scrolling band).
- Press / featured-in logos marquee.

### B5. RSS feed
Static `/rss.xml` route generated from `blog_posts` (or seed data) — link in Blog page header.

### B6. /resume page
Page with a preview + download button. PDF lives in `public/resume.pdf` (placeholder, you replace it later).

## Implementation order

```text
1. DB migration (tables + RLS + has_role + first-admin trigger)
2. Generate Supabase types, create `useAuth` hook
3. Wire SignupForm + Footer + Contact form to DB
4. Set up email infrastructure + 2 templates + wire contact emails
5. /admin/login + /admin (subscribers, waitlists, contacts tabs first)
6. Blog CMS (read public from DB; admin editor)
7. Bug fixes (Footer ref, cursor)
8. /resume, project detail pages, back-to-top, RSS, About additions
```

## Out of scope (intentional — ask if you want them)

- Payments / checkout — wait until first product is launch-ready.
- Course player / video hosting — waitlist only for now.
- Comments on blog posts — direct to social instead.
- Marketing newsletter sending from inside Lovable — use Buttondown/Beehiiv/ConvertKit when you actually start sending. The DB will collect subscribers; you export the CSV and import.

## Notes

- One thing I'd recommend: I'll ask for **your email address** before wiring contact-notification emails so they actually go to you.
- Email setup will require enabling an email domain (you'll see a one-time setup dialog) — needed for the contact form confirmation. If you'd rather skip emails entirely for now and just collect submissions in the DB, say the word.
