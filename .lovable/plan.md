# Full Integration Plan: Images, Business Data & Missing Content

## Uploaded Assets to Integrate


| File          | Purpose                               | Destination                       |
| ------------- | ------------------------------------- | --------------------------------- |
| `karan.jpg`   | Testimonial photo for Karan Bhadauria | `src/assets/karan.jpg`            |
| `utkarsh.jpg` | Testimonial photo for Utkarsh Bhatia  | `src/assets/utkarsh.jpg`          |
| `dsa.png`     | NPTEL DSA certificate image           | `public/certificates/dsa.png`     |
| `java.png`    | NPTEL Java certificate image          | `public/certificates/java.png`    |
| `web.jpg`     | Udemy Web Dev certificate image       | `public/certificates/web.jpg`     |
| `design.png`  | Graphic design portfolio showcase     | `src/assets/design-portfolio.png` |
| `OG_Img.png`  | Open Graph social share image         | `public/og-image.png`             |


## Changes

### 1. Place all uploaded images into the project

Copy each file to its destination as listed above.

### 2. Update `index.html` with real OG/meta tags

- Description: real bio text
- OG image: `/og-image.png`
- Twitter card: update site to `@AnshulR20`

### 3. Update testimonials in Supabase with real photos

- Karan Bhadauria: set `photo_url` to the hosted karan.jpg path
- Utkarsh Bhatia: set `photo_url` to the hosted utkarsh.jpg path
- Rohit Iyyer: set `video_url` to `https://www.youtube.com/shorts/Y5Vcfa5hk7E`

### 4. Update `Home.tsx` testimonial cards to show photos

- Display `photo_url` as an avatar next to the author name
- Fetch `photo_url` and `video_url` from Supabase (already in schema)
- Show a small play icon/link if `video_url` exists

### 5. Add certificate images to Achievements page

- Update `ACHIEVEMENTS` in `data.ts` to include `imageUrl` for DSA, Java, and Web Dev certificates pointing to `/certificates/dsa.png`, `/certificates/java.png`, `/certificates/web.jpg`
- Add a new "Complete Web Development" certification entry (Udemy, March 2025, 77.5 hours)
- Update `Achievements.tsx` featured cards and grid cards to display the certificate image instead of the gradient placeholder when `imageUrl` is set

### 6. Add graphic design portfolio image to Skills/Projects

- Use the uploaded `design.png` as the cover for the "Thumbnails & Logos" project card or as a dedicated graphic design showcase section

### 7. Add missing testimonial details from migration data

- Update the static `TESTIMONIALS` fallback and Supabase records with full details (company names, detailed quotes) from the migration data
- Norton Wong: add full review text as expandable content
- Rohit Iyyer: add video link

### 8. Add Careers/Hiring section (from migration data)

- Create a new `/careers` page with the 3 intern roles (Growth Lead, Brand Lead, Tech Lead) from the migration data
- Each role card shows: title, department, location, description, requirements, benefits, and a Tally form link for applications
- Add route in `App.tsx` and nav link

### 9. Add Up N Running company story to About page

- Add the "Company Story" verbatim text from migration data to the About page or a dedicated section
- Add the project timeline milestones (OTO Engine launch, LinkedIn Agent, Instagram RAG) to the TIMELINE array

### 10. Update SERVICES with demo video links

- OTO Engine: add `videoUrl: "https://www.youtube.com/embed/wkQnv6027gM"`
- Instagram RAG: add `videoUrl: "https://www.youtube.com/embed/dDf7CsJ6ilA"`
- Update Services page to embed/link these videos

## Technical Details

**Database migration:** Update testimonials with photo_url and video_url values for Karan, Utkarsh, and Rohit.

**Files modified:**

- `index.html` (meta tags)
- `src/lib/data.ts` (achievements, services, timeline)
- `src/pages/Home.tsx` (testimonial avatars)
- `src/pages/Achievements.tsx` (certificate images)
- `src/pages/About.tsx` (company story)
- `src/pages/Skills.tsx` (design portfolio image)
- `src/App.tsx` (careers route)

**Files created:**

- `src/pages/Careers.tsx`
- `public/certificates/` directory with 3 certificate images
- `public/og-image.png`
- `src/assets/karan.jpg`, `src/assets/utkarsh.jpg`, `src/assets/design-portfolio.png`