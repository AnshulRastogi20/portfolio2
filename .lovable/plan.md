
## Plan

### 1. Make achievement cards clickable
Currently achievement cards show a small "View" link at the bottom. We'll wrap the entire card (both in the featured carousel and the grid) in an `<a>` tag so clicking anywhere on the card opens its `link` URL. Cards without a `link` will remain non-clickable.

**File:** `src/pages/Achievements.tsx`

### 2. Make project cards clickable  
Project cards on the Skills page show small icon buttons for demo/GitHub. We'll wrap each card so clicking it opens the `demoUrl` (primary action). The GitHub icon button will remain separate via `stopPropagation`.

**File:** `src/pages/Skills.tsx`

### 3. Make blog post cards clickable
Blog cards already link to `/blog/:slug` via `<Link>`. We'll verify this works correctly and ensure the featured post card is also fully clickable.

**File:** `src/pages/Blog.tsx` (verify, likely already working)

### 4. Change favicon to profile.png
- Copy `src/assets/profile.png` to `public/favicon.png`
- Delete `public/favicon.ico`
- Update `index.html` to reference `/favicon.png`
