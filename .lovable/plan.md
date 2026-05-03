## Plan

### 1. Remove all em dashes (—)

Replace every `—` across the codebase with alternatives like `:`, `,`, `.`, or `-` depending on context. Key files affected:

- `src/lib/data.ts` (~30 instances) - project descriptions, testimonials, timeline, FAQ
- `src/pages/Home.tsx` - section headers and venture descriptions
- `src/pages/About.tsx` - bio text
- `src/pages/Contact.tsx` - form copy
- `src/pages/Skills.tsx`, `src/pages/Shop.tsx`, `src/pages/Careers.tsx`, `src/pages/BlogPost.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/Services.tsx`
- `src/index.css` - CSS comments
- `src/components/TextScramble.tsx` - scramble character set
- `src/components/SignupForm.tsx`, `src/pages/AdminLogin.tsx`

### 2. Make all cards open within the website (no external redirects)

Currently, project cards, testimonial cards, venture links, and achievement cards open external URLs in new tabs. Changes:

- **Project cards** (`src/pages/Skills.tsx`, `src/pages/Home.tsx`): Replace `<a href={demoUrl} target="_blank">` with internal routing using `<Link to={/projects/${slug}}>` or render project details inline
- **Testimonial cards** (`src/pages/Home.tsx`): Remove `target="_blank"` from card links and `window.open` from video buttons - instead open links within the same tab or show content in a modal
- **Venture cards** (`src/pages/Home.tsx`): Change external venture URLs to same-tab navigation (`window.location.href` or remove target)
- **Achievement cards** (`src/pages/Achievements.tsx`): Remove `target="_blank"` so links open in the same tab
- **About page** (`src/pages/About.tsx`): Change venture links to open in same tab
- **GitHub links** (`src/pages/Skills.tsx`): Open in same tab instead of `window.open(..., '_blank')`

All `target="_blank"` / `target="n"` attributes and `window.open(..., '_blank')` calls on cards will be changed to open in the current tab (same window navigation).
