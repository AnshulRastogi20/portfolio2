
## Add Visible Direct Links to All Cards

The cards are already clickable/linked, but the user wants each card to have a clearly visible, directly accessible link indicator. Here's what will be updated:

### 1. Blog Post Cards (`src/pages/Blog.tsx` and `src/pages/Home.tsx`)

- Add an `ExternalLink` icon with "Read" label at the bottom of each blog card in the grid on the Blog page
- Add the same to the 3 blog cards shown on the Home page
- These link to the internal blog post page (`/blog/{slug}`)

### 2. Project Cards (`src/pages/Skills.tsx` and `src/pages/Home.tsx`)

- Already have ExternalLink and GitHub icons — no changes needed on the Skills page
- On the Home page, the project category cards link to `/skills` — add an arrow/link indicator to make it more obvious they're clickable

### 3. Review/Testimonial Cards (`src/pages/Home.tsx`)

- Already implemented with clickable cards, "View" link badge, and "Watch Video" pill
- No changes needed — these were just updated in the previous session

### Summary of Changes

| Section | File | Change |
|---------|------|--------|
| Blog grid cards | `src/pages/Blog.tsx` | Add `ExternalLink` icon + "Read" label |
| Blog cards on Home | `src/pages/Home.tsx` | Add `ExternalLink` icon + "Read" label |
| Project categories on Home | `src/pages/Home.tsx` | Already has arrow — keep as-is |
| Testimonials | `src/pages/Home.tsx` | Already done — no change |
| Achievements | `src/pages/Achievements.tsx` | Already done — no change |
| Projects | `src/pages/Skills.tsx` | Already done — no change |

This is a small UI polish — adding visible link indicators to blog cards so every card type consistently shows it's directly openable.
