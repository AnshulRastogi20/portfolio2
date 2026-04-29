
# Anshul's Portfolio → Personal Brand Platform v2

Evolve the existing dark/mint portfolio into a premium, animated personal brand site. **Every existing page stays.** New sections layer on top to grow your audience for future courses, products, and services.

## Visual System

### Themes (dual, dark default)
- **Dark (default):** deep near-black background `#0A0F0D`, elevated card `#0F1815`, mint primary `#9FE8C4` (refined from current), soft cream text `#F4F1EA`, muted `#8B9A93`, gold accent `#D4B896` for premium highlights.
- **Light (warm):** cream `#F7F3EC`, deep brown text `#2A1F1A`, terracotta accent `#C97B5B`, mint secondary preserved for continuity.
- Glassmorphism cards (`backdrop-blur` + 1px border + subtle inner glow), gradient mesh backgrounds, fine grid overlay on hero (kept from current), noise/grain texture for premium feel.

### Typography
- **Display:** Cabinet Grotesk (or Satoshi) — large, tight tracking, used for hero, page titles, section headers.
- **Body:** Inter — clean, readable.
- **Accent/labels:** JetBrains Mono for tags, timestamps, code badges.
- Generous line-height, large headings (clamp 3rem–6rem on hero), refined letter-spacing.

### Motion (heavy interactive)
- Custom magnetic cursor (subtle, dot + ring).
- Framer Motion page transitions (fade + slight scale).
- Scroll-triggered reveals (fade-up, stagger) on every section.
- Animated gradient mesh + parallax grid in hero.
- Text scramble effect on hero title rotation ("I Build AI" → "I Ship Systems" → "I Teach Builders").
- Hover: magnetic buttons, project card tilt (3D), image zoom-on-hover.
- Smooth scroll (Lenis), animated number counters on stats, marquee strip for tech logos.
- Respects `prefers-reduced-motion`.

## Site Map

```text
Existing (kept + redesigned)
/                Home
/about           About
/skills          Skills & Projects
/achievements    Achievements
/blog            Blog list
/blog/[slug]     Blog post
/contact         Contact
/resume          Resume download (existing)

New
/newsletter      Newsletter landing + archive + lead magnet
/courses         Course catalog (Coming Soon + waitlists)
/courses/[slug]  Individual course detail + waitlist
/shop            Digital products + merch (waitlist)
/shop/[slug]     Product detail + notify-me
/coaching        1:1 services + booking CTA
/now             What I'm currently working on
/uses            Gear, stack, software, setup
/admin           Protected dashboard (blog, subscribers, waitlists)
/admin/login     Admin auth
```

## Page-by-Page

### Home (rebuilt premium)
- Animated grid + gradient mesh hero, rotating headline (text scramble), dual CTA "View My Work" / "Join Newsletter".
- **New:** stats strip (subscribers, projects shipped, hackathons won) with count-up animation.
- **New:** featured newsletter signup card (glass).
- Kept: My Projects (Web Dev / Video / Graphic) — redesigned with 3D tilt cards.
- **New:** Latest from the blog (3 cards).
- **New:** "Building Next" teaser → courses/products waitlist.
- **New:** Marquee of tech logos / brands worked with.
- **New:** Testimonials carousel.
- **New:** Final newsletter CTA (full-width gradient block).

### About (kept + enhanced)
- Same photo, name, role, mission text — kept.
- Kept: 4 value cards (Depth Over Hacks, Authenticity, Value-First, Offer-Centric) — restyled with glass + animated icons.
- Kept: 3 venture cards (Socioverse, Up N Running, BunkToBrains) — restyled with hover animation.
- **New:** Animated timeline of journey.
- **New:** Photo strip / behind-the-scenes gallery.
- **New:** Press & features logo strip.

### Skills & Projects (kept + expanded)
- Kept: Web Development / Video Editing / Graphic Design category cards.
- **New:** Tabbed sub-view per category showing actual project cards with cover, description, tech stack, live/repo links.
- **New:** Filterable skill grid (Languages, AI/ML, Frameworks, Tools) with proficiency indicators.
- **New:** Individual project detail pages (problem → approach → outcome → lessons).

### Achievements (kept, polished)
- Kept: featured certificate carousel + filter tabs (All / Certifications / Awards / Recognition).
- Kept: all current cards (Data Structures, Programming in Java, HackKRMU 4.0, District Chess Champion).
- **New:** scroll-snap horizontal carousel with smooth nav, certificate lightbox on click.
- **New:** counters for "X certifications, Y awards".

### Blog (kept + upgraded)
- Kept: search bar, all category tags, all 4 existing posts, date stamps, card layout.
- **New:** featured post hero at top, reading time, author chip, view count.
- **New:** Individual blog post reader page (was missing — currently cards don't open) with cover, rich content, table of contents, inline newsletter CTA, related posts.
- **New:** RSS feed link.

### Newsletter (new)
- What you write about, frequency, who it's for.
- Big signup with lead-magnet promise ("Get my AI Builder's Starter Kit free").
- Past issues archive.
- Reader testimonials.
- Subscriber count social proof.

### Courses (new, waitlist mode)
- Catalog grid with "Coming Soon" badges + estimated launch.
- Per-course detail page: outline preview, who it's for, instructor bio, early-bird pricing teaser, **waitlist signup**.

### Shop (new, waitlist mode)
- Tabs: Digital Products (ebooks, templates, prompts) + Merch.
- Each product card: cover, teaser price, "Notify me when live" → captures email + product interest.

### Coaching (new)
- Service tiers (1:1 call, code review, project consulting).
- What's included, pricing range, process steps, FAQ.
- Booking CTA → contact form pre-filled with service.

### /now & /uses (new)
- `/now`: short, frequently-updated note on current focus + what you're learning.
- `/uses`: hardware, software, dev setup, browser extensions, fonts — community-loved SEO page.

### Contact (kept + improved)
- Kept: Name / Email / Message form, dark card, mint Send button — restyled premium.
- **New:** topic dropdown (General / Coaching / Speaking / Press), social links row, response-time note, success animation on submit, **email actually sends** to your inbox.

### Admin (new, protected)
- Login (email + password, role-gated).
- Dashboard: subscriber count, recent waitlist signups, contact submissions.
- Blog editor: create/edit/delete posts (rich text), manage tags.
- CSV export for newsletter subscribers and each waitlist.

## Global Elements

- **Top nav (kept logo + structure):** Home · About · Skills · Achievements · Blog · Newsletter · Courses · Shop · Contact · theme toggle · Resume.
- Mobile: slide-in sheet menu with stagger animation.
- **Footer (new):** sitemap columns, mini newsletter signup, social icons (X, GitHub, LinkedIn, YouTube), copyright.
- Sticky scroll-progress bar at top.
- Floating "Back to top" (kept).
- Custom 404 with personality.

## Audience-Building Mechanics

1. Newsletter signup in 4 places: hero, after every blog post, footer, dedicated page.
2. Waitlist capture on every Course and Shop item before launch.
3. Lead magnet (free download) gates newsletter signup → high conversion.
4. Social proof everywhere: subscriber count, testimonials, brand logos, hackathon wins.
5. SEO surface area: blog, /uses, /now, individual project pages.

## Technical Notes

- React + Vite + Tailwind + shadcn/ui (existing stack preserved).
- **Framer Motion** for all motion, **Lenis** for smooth scroll, **GSAP** only if needed for text scramble.
- Premium fonts loaded via Fontshare or self-hosted.
- **Lovable Cloud** backend for: `subscribers`, `waitlist_entries` (course/product), `blog_posts`, `contact_submissions`, `admin_users` (role-based RLS).
- Admin auth with email/password + `user_roles` table (roles in separate table per security best practice).
- Contact form + lead magnet send transactional email via Lovable's built-in email system.
- Payments NOT wired in this build — waitlists capture demand now; enable Stripe/Paddle when first product is ready.
- Full responsive (mobile-first), `prefers-reduced-motion` honored, semantic HTML, accessible focus states.

## What's NOT in this build (intentional)

- Actual course player / video hosting (waitlist only).
- Checkout / payments (added when first product is ready).
- Comments on blog (link to social discussion instead).

After this ships, natural next steps: write 2–3 blog posts, design your lead-magnet PDF, then enable payments when your first course/product is launch-ready.
