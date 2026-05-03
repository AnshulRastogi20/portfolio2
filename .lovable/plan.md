## What's Missing & What We'll Fix

### 1. Missing Projects (from your old portfolio)

Your current site has 12 projects but is missing these 4 with real demo/GitHub links:


| Project                      | Demo Link                       | GitHub                                            |
| ---------------------------- | ------------------------------- | ------------------------------------------------- |
| Decentralized Uptime Monitor | maintenance-iota-ten.vercel.app | github.com/AnshulRastogi20/Website-Uptime-Check   |
| Waste Segregator             | recyclopedia-xi.vercel.app      | github.com/AnshulRastogi20/waste-segregator       |
| Attendance Tracker           | attendit.tech                   | github.com/AnshulRastogi20/self-attendence-system |
| AMA App                      | maintenance-iota-ten.vercel.app | github.com/AnshulRastogi20/full-stack-ama-app     |


Also missing proper links on existing projects (Socioverse, BunkToBrains, etc.) and video/graphic projects (DJKC Studios YouTube, Canva designs).

### 2. Direct Clickable Links Everywhere

Currently projects and achievements have NO external links. We'll add `demoUrl`, `githubUrl`, and `link` fields to:

- **PROJECTS** in data.ts -- each project gets a demo link + GitHub link
- **ACHIEVEMENTS** in data.ts -- each certificate/award gets a verification link
- **TESTIMONIALS** -- already have `link` field in DB, will ensure it renders as clickable
- **Resume** -- already has download/open links (working)

All links open in new tabs with proper icons (ExternalLink, GitHub icons).

### 3. Real Blog Content

Your 4 blog posts currently exist only as stubs in data.ts. The full content from your old portfolio will be inserted into the Supabase `blog_posts` table with proper markdown content, real dates, and tags.

### 5. Fix Achievement Details

- District Chess Champion date: 2018 (not 2022)
- Hackathon date: February 2025
- Add descriptions from migration data to each achievement

### 6. Vercel SPA Routing Config

Add `vercel.json` to project root with SPA rewrites:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 7. Admin Panel Access

You access admin at: `**/admin/login**`

Steps:

1. Go to `yoursite.com/admin/login`
2. Create an account (sign up with email + password)
3. Click "Claim admin" (first user becomes admin automatically)
4. You'll be redirected to `/admin` dashboard

From there you can manage: Blog posts, Testimonials, Courses, Contact submissions, Subscribers.

---

## Images You Need to Provide

For an image-rich site, here's every image slot:


| Where                        | What to Upload                                                                                                                      | Current State                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Profile**                  | Your headshot                                                                                                                       | Done (profile.png)            |
| **OG Image**                 | Social share preview (1200x630)                                                                                                     | Missing - use branded graphic |
| **Certificate: DSA Java**    | `/certificates/dsa.png` from old site                                                                                               | Not uploaded                  |
| **Certificate: Java**        | `/certificates/java.png` from old site                                                                                              | Not uploaded                  |
| **Certificate: Hackathon**   | `/certificates/hackathon.jpg` from old site                                                                                         | Not uploaded                  |
| **Certificate: Chess**       | `/certificates/chess.jpg` from old site                                                                                             | Not uploaded                  |
| **Project covers**           | Screenshots of each project (Socioverse, Up N Running, BunkToBrains, Uptime Monitor, Waste Segregator, Attendance Tracker, AMA App) | Using gradient placeholders   |
| **Video project thumbnails** | DJKC channel screenshots                                                                                                            | Using gradient placeholders   |
| **Graphic design samples**   | Thumbnail/logo design images                                                                                                        | Using gradient placeholders   |
| **Blog cover images**        | Header images for 4 blog posts                                                                                                      | None                          |
| **Testimonial photos**       | Photos of reviewers (via admin panel upload)                                                                                        | None                          |


Upload these images in your next message and I'll place them all.

---

## Technical Changes

### Files to edit:

- `**src/lib/data.ts**` -- Add `demoUrl`, `githubUrl` to PROJECTS; add `link` and `description` to ACHIEVEMENTS; add missing 4 projects; fix dates; update bio
- `**src/pages/Achievements.tsx**` -- Render clickable links on certificates/awards, add image display for certificates
- `**src/pages/Skills.tsx**` or project pages -- Add demo/GitHub link buttons to project cards
- `**src/pages/Home.tsx**` -- Ensure testimonial links are clickable
- `**src/pages/Shop.tsx**` / project listing pages -- Add external link buttons
- `**vercel.json**` -- New file for SPA routing
- **Supabase insert** -- Seed 4 real blog posts with full markdown content into `blog_posts` table

### New fields in data types:

```
PROJECTS: + demoUrl?: string, githubUrl?: string
ACHIEVEMENTS: + link?: string, description?: string, imageUrl?: string
```