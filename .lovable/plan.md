
## What changes

This is a large update touching data, images, pages, database schema, and admin features. Here's everything:

### 1. Add uploaded images to the project

- Copy `Photo.png` to `src/assets/profile.jpg` -- used on About page hero (replaces the big "A" letter)
- Copy `new-logo.png` to `public/upnrunning-logo.png` -- Up N Running logo, shown on ventures/footer
- Copy `Symbol_Transparent.png` to `public/socioverse-logo.png` -- Socioverse logo, shown on ventures/product detail

### 2. Update `src/lib/data.ts` with confirmed real data

**SITE**: email `upnrunning0@gmail.com`, socials (Twitter, GitHub, LinkedIn, YouTube with provided URLs)

**STATS**: Fix Socioverse stat to "100 signups" instead of "10K+ creators". Remove "Grew audience 10x" and "Increased revenue 3x". Keep "Saved 5+ hrs/week".

**VENTURES**: Update BunkToBrains with real description ("EdTech startup with 25+ team members and 7000+ students in WhatsApp community"), URL `www.bunktobrains.com`

**PROJECT_CATEGORIES**: Web 100+, Video 100+, Graphic 50+

**ACHIEVEMENTS** (from CV):
- AI Automation Expert (Udemy)
- Won Hack-KRMU Hackathon
- DSA using Java + Programming in Java (NPTEL -- not Coursera)
- Former District Chess Champion
- Remove "Full-Stack Web Dev (Meta)" and "AI for Everyone (DeepLearning.AI)" -- not in CV
- Add: VP Career Development Cell, VIPS TC
- Add: Co-Founded BunkToBrains (May 2025)

**TIMELINE**: Fix dates -- Up N Running June 2025 (not 2024), Socioverse Jan 2026 (not 2025). Add BunkToBrains Feb 2025.

**TESTIMONIALS**: Remove Sarah Johnson, Mike Chen, Jennifer Davis (not real). Keep Ankur Warikoo, Mradul Sharma, Karan Bhadauria, Utkarsh Bhatia. Add Norton Wong and Rohit Iyyer from upnrunning.in/reviews with real quotes.

**NOW page**: Focus on Socioverse as the main current work.

**COURSES**: Repurpose to link to BunkToBrains skill courses. Mark as editable from admin.

**COACHING**: Mark as "Coming Soon"

**Socioverse references**: Change "10K+ creators" to "100+ signups" everywhere

### 3. Remove Uses page

Delete `/uses` route from `App.tsx` and remove from nav/footer. The `Uses.tsx` file stays but is unreachable.

### 4. About page -- real headshot

Replace the gradient "A" placeholder with the uploaded `Photo.png` image.

### 5. Testimonials with links and admin management

**Database**: Create a `testimonials` table with columns: `id`, `author`, `role`, `quote`, `link` (URL to original review), `photo_url`, `video_url`, `featured`, `order`, `created_at`. Seed with the 6 real testimonials. Add RLS (public read, admin manage).

**Admin panel**: Add a "Testimonials" tab to the admin dashboard where you can:
- Add/edit/delete testimonials
- Upload photo and video for each testimonial
- Set a direct link (opens in new tab)
- Reorder and feature/unfeature

**Frontend**: Home page and Newsletter page pull testimonials from Supabase instead of static data. Each testimonial card gets a clickable link icon if `link` is set.

### 6. Courses admin management

**Database**: Create a `courses` table with: `id`, `title`, `slug`, `summary`, `level`, `category`, `external_link`, `price`, `bullets` (text[]), `active`, `order`, `created_at`. Seed with BunkToBrains courses placeholder. Add RLS.

**Admin panel**: Add a "Courses" tab to manage course entries -- add, edit, delete, categorize, set external links.

**Frontend**: Courses page reads from Supabase. Each course card links externally to BunkToBrains (or wherever the admin sets).

### 7. Storage bucket for testimonial media

Create a Supabase storage bucket `testimonial-media` (public) for photo and video uploads from the admin panel.

### 8. OG image explanation

An OG (Open Graph) image is the preview thumbnail shown when your site URL is shared on social media (Twitter, LinkedIn, WhatsApp). Currently `public/og-image.jpg` is referenced in `index.html`. You can replace it with any image you'd like as the social share preview -- your headshot, logo, or a branded graphic.

---

## Files touched

```
COPY  user-uploads://Photo.png        -> src/assets/profile.jpg
COPY  user-uploads://new-logo.png     -> public/upnrunning-logo.png
COPY  user-uploads://Symbol_Transparent.png -> public/socioverse-logo.png
EDIT  src/lib/data.ts                 (all confirmed data updates)
EDIT  src/pages/About.tsx             (headshot image)
EDIT  src/pages/Home.tsx              (testimonials from DB)
EDIT  src/pages/Newsletter.tsx        (testimonials from DB)
EDIT  src/pages/Courses.tsx           (DB-driven, external links)
EDIT  src/pages/CourseDetail.tsx       (redirect to external link)
EDIT  src/pages/Coaching.tsx          (coming soon state)
EDIT  src/pages/Now.tsx               (Socioverse focus)
EDIT  src/pages/Admin.tsx             (add Testimonials + Courses tabs)
EDIT  src/App.tsx                     (remove /uses route)
EDIT  src/components/Nav.tsx          (remove Uses link)
EDIT  src/components/Footer.tsx       (remove Uses link)
NEW   supabase migration              (testimonials + courses tables + storage bucket)
```
