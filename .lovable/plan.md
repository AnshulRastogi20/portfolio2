
# Update Website to Match Brand Deck

After comparing your "Sight of Anshul" brand deck with the current website, here are the key mismatches and proposed updates:

## 1. Update Core Brand Data (`src/lib/data.ts`)

**Tagline**: Add "Perspective is Everything" as the brand tagline.
Currently: `"Systems Architect · Founder, Up N Running · Builder of Socioverse"`
Brand deck: Should incorporate "Perspective is Everything"

**Location**: Change from `"India"` to `"Delhi, India"`

**Email**: Change from `upnrunning0@gmail.com` to `anshulrastogi020@gmail.com` (personal brand email from deck)

**Stats**: Replace current generic stats with real receipts from the brand deck:
- ₹50K MRR (Up N Running, 6 months solo)
- 7,000+ Students (BunkToBrains)
- 3 Client systems live in production
- 1,000+ Students under CDC ops at VIPS

## 2. Replace Values Section

Current (4 values): Depth Over Hacks, Authenticity, Value-First, Offer-Centric
Brand deck (3 values): **Honesty**, **Ownership**, **Change** - with the descriptions from the deck.

Update `VALUES` array in `data.ts` and the About page heading ("Three things I live by" instead of "Four things I live by").

## 3. Rewrite Timeline with Brand Deck Story

Replace current timeline entries with the real chronological story from the brand deck:
- 2018: District Chess Champion
- 2021-2023: JEE wake-up, CBSE 94%
- 2023: Joined VIPS AIML, DSA grind
- Early 2024: Pivot from DSA to building
- Oct 2023 - Oct 2024: DJ KC Studios era
- Jan 2025: VP CDC at VIPS
- May 2025: Co-founded BunkToBrains
- Jul 2025: Founded Up N Running (₹50K MRR)
- Late 2025: Started building Socioverse

## 4. Update Hero Section & Bio

- Add "Perspective is Everything" as a subtle tagline
- Update the text scramble phrases to include brand-aligned language
- Update bio text to match brand deck tone: "Receipt first. Opinion second."

## 5. Add VP CDC VIPS Role

Currently missing from achievements. Add: "Vice President, Career Development Cell" with "Placement ops for 1,000+ students" - update both `ACHIEVEMENTS` array and relevant page mentions.

## 6. Update Marquee Tech Stack

Add missing tools from brand deck: `n8n`, `Python`, `Java`, `Gemini`, `DaVinci Resolve`, `Remotion`. Remove any that don't match.

## 7. Update Venture Descriptions

Align venture card descriptions with brand deck:
- Up N Running: "Solo Founder, AI Automation Agency, productized services, ₹50K MRR"
- Socioverse: "Sole Architect, Instagram AI SaaS, Emotional DNA engine"
- BunkToBrains: "Co-Founder (~40%), EdTech, 7,000+ students, ₹2L+ revenue"

---

### Files to Edit
- `src/lib/data.ts` (main data updates)
- `src/pages/Home.tsx` (hero, stats, marquee)
- `src/pages/About.tsx` (values heading, bio text)
- `index.html` (meta description update)
