## Goal

Replace placeholder copy with real content pulled from your three live sites:

- **upnrunning.in** → company / studio (services, products, stats, testimonials, CTA)
- **anshulrastogi.xyz** → personal portfolio history (skills triad, project categories, client testimonials)
- **socioverse.io** → flagship product detail (features, how it works, pricing, audience)

Everything funnels into the existing site structure; no new routes are needed except a Ventures detail page and a Services page.

---

## What changes

### 1. `src/lib/data.ts` — full rewrite of the seed data

| Constant | New content |
|---|---|
| `SITE` | Real name "Anshul Rastogi", bio from upnrunning ("Building AI products that make Indian businesses Up N Running"), location India, real socials (placeholders flagged for you to fill) |
| `STATS` | Pulled from upnrunning: 50%+ lower workload, 3–10× more leads, 30–60% faster response, 20–40% higher retention. Plus a "10K+ creators on Socioverse" stat. |
| `VALUES` | Keep current 4 values — they're on-brand. |
| `VENTURES` | Three real ventures with full descriptions, taglines, URLs, tags, and feature bullets (Socioverse, Up N Running, BunkToBrains) |
| `SERVICES` (new) | The 6 Up N Running products: OTO Engine, Instagram RAG, Voice AI Assistant, LinkedIn Agent, Creative Studio AI, AI Proposal Generator — each with bullets and "What it does" copy |
| `PROJECT_CATEGORIES` | Web Dev / Video Editing / Graphic Design with the exact tool stacks from anshulrastogi.xyz (React/TS/Tailwind/Node; Premiere/After Effects/DaVinci/FCP; Photoshop/Illustrator/Figma/InDesign) |
| `PROJECTS` | Real entries: Socioverse, Up N Running platform, OTO Engine, Instagram RAG, Voice AI, plus the legacy Attendance/Editing/Graphic items from the old portfolio |
| `TESTIMONIALS` | Real quotes: Ankur Warikoo + Mradul Sharma (Socioverse), Sarah Johnson / Mike Chen / Jennifer Davis (upnrunning), Karan Bhadauria + Utkarsh Bhatia (old portfolio) — 7 total |
| `COURSES` | Keep waitlist structure; retitle one as "Build Your Own OTO Engine" sourced from upnrunning playbook |
| `TIMELINE` (About) | Add "Founded Up N Running", "Launched Socioverse", "Old portfolio site shipped" entries |

### 2. New page: `src/pages/Services.tsx` + route `/services`

A dedicated page rendering the 6 Up N Running products with: stat hero (the 4 outcome metrics), product grid (each card = name, one-liner, 3 bullets, "Book a call" CTA), CTA banner ("Book a free strategy call · 30-day automation wins") linking to your Calendly. Add `/services` to nav (replace "Coaching" position; coaching stays accessible from footer).

### 3. Rewrite `src/pages/ProductDetail.tsx` for `/shop/socioverse` (Socioverse showcase)

Repurpose the existing product detail page so visiting Socioverse renders a real product page:
- Hero: "AI-Powered Instagram Growth Engine" + Warikoo/Mradul testimonial chips
- Problems block: Creative Burnout, Lead Leakage, DM Overwhelm
- 4 modules: Content Studio, DM Automation, Analytics, Lead Bank (each with bullets)
- "How it works" 4-step: Connect → Analyze → Generate → Automate
- Stats: 3× faster content, 50% engagement, 10× leads, 5hrs saved/week
- Audience: Creators / Agencies / D2C / Coaches
- Pricing tiers: Free / Starter $18 / Creator $48 / Agency $88
- FAQ block (8 questions from socioverse)
- CTA → socioverse.io/signup

### 4. Refresh existing pages with the new copy

- **Home**: hero subtitle uses real bio, stats use upnrunning numbers, ventures section pulls from new VENTURES, testimonials section pulls 4 of the 7 real ones.
- **About**: hero copy "Builder. Engineer. Storyteller." stays, but body copy uses real positioning ("I run Up N Running, build Socioverse, and ship side projects in public"). Timeline gets real entries.
- **Skills (`/skills`)**: 3 categories with the real tool stacks; project list uses new PROJECTS array.
- **Coaching**: keep page, but tighten copy to position it as "1:1 with the Up N Running founder" and add the 4 outcome stats.
- **Contact**: add Calendly link `https://calendly.com/upnrunning0/30min` as a third option alongside the form. Pre-fills topic from `?service=` (already wired).
- **Footer**: add Up N Running, Socioverse, BunkToBrains under "Ventures" column; real socials.

### 5. Image guidance (no uploads yet — placeholders documented)

Where to drop your photos when you have them — comments will mark each spot:

```text
src/assets/profile.jpg      → About page hero (replaces giant "A")
src/assets/upnrunning.jpg   → Services page hero
src/assets/socioverse-*.png → Socioverse product detail (4 module screenshots)
public/og-image.jpg         → social share image
public/resume.pdf           → already wired to /resume
```

Each component will have an `// IMAGE: <path>` comment + commented-out `<img>` so you swap in 5 seconds.

---

## Out of scope (intentional)

- No backend/schema changes — all content lives in `src/lib/data.ts` (you can later move blog posts to Supabase via the existing admin).
- No image uploads — I'll leave clearly marked spots and the existing gradient placeholders.
- No payment integration for Socioverse pricing display (it links out to socioverse.io/signup).
- No scraping of live socials follower counts.

---

## Files touched

```text
NEW   src/pages/Services.tsx
EDIT  src/lib/data.ts              (full rewrite of constants)
EDIT  src/App.tsx                  (add /services route)
EDIT  src/components/Nav.tsx       (swap Coaching → Services in primary nav)
EDIT  src/components/Footer.tsx    (real ventures + socials)
EDIT  src/pages/Home.tsx           (real stats + testimonials wiring)
EDIT  src/pages/About.tsx          (real bio + timeline + photo slot)
EDIT  src/pages/Skills.tsx         (real categories + projects)
EDIT  src/pages/ProductDetail.tsx  (Socioverse-specific layout)
EDIT  src/pages/Coaching.tsx       (tightened positioning)
EDIT  src/pages/Contact.tsx        (Calendly link)
```

After approval I'll ship it in one pass.
