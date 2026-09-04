# Sight of Anshul on the website - what changed and why

Implements `Assets/brand/sightofanshul/BRAND-BRIEF.md`.
Written 2026-09-04.

The brief is deliberately conceptual: pages, sections, components, stack and copy were left
open, and the positioning, voice and honesty rules were not. This records the calls made on
the open half and the enforcement of the closed half.

---

## 1. The visual system (§10)

The amber system, settled 2026-08-17, is now the site's palette. The mint / terracotta /
cream theme it replaced is gone.

| Role | Hex | Token |
|---|---|---|
| Ink | `#16181C` | `220 12% 10%` |
| Amber | `#F5B642` | `39 90% 61%` |
| Deep amber | `#8A5A00` | `39 100% 27%` |
| Paper | `#F6F7F5` | `90 11% 96%` |
| Border | `#DCDFD9` | `90 9% 86%` |

Type is Clash Display for display and Inter for body, both already in `index.html` -
Fontshare was serving Cabinet Grotesk from the same host, so Clash Display cost no new
connection. JetBrains Mono stays for labels, which is what the brand folder specifies.

**The one addition the brief did not anticipate: a `--brand-text` token.** Amber at 61%
lightness is a button fill and an icon on a dark plate. As *type on paper* it clears about
1.9:1, which fails every contrast bar there is, and the brief's most important promise is
that nobody leaves the site feeling stupid - which starts with being able to read it. So
`--brand-text` is deep amber on paper and full amber on plate, `.text-gradient` and the new
`text-brand` utility both route through it, and every piece of amber type on the site was
moved onto it. `--primary` keeps the true amber for fills, borders and rings, where ink sits
on top of it at full contrast. Nothing was recoloured away from the system; one token was
added so the system could survive a light background.

**The marks** are in `public/brand/` and wrapped in `src/components/Brand.tsx`, which exists
to enforce the three gotchas so no caller has to remember them:

- `Wordmark` caps its own width at the 512px source. The letterforms are an image model's
  imitation of Clash Display, not the real font, so it fringes when scaled up.
- `Wordmark` swaps to `soa-wordmark-reversed-*` on dark. The wordmark is a single dark ink
  and vanishes on plate otherwise.
- `EyeMark` is the lit eye - amber outline, white interior, black pupil, white catchlight.
  It is the personal-brand eye and it is the favicon. It is not the flat AI Sight eye.
- `Lockup` is used in the nav instead of the wordmark PNG, deliberately: at nav height the
  two-line raster lockup is either illegible or upscaled. The eye is the real mark and the
  name beside it is set in actual Clash Display, which is what `lockup-ref.html` specifies.

**The vector rebuild is still open.** Everything shipped here is raster. Until that is done,
do not scale the wordmark up and do not recolour it.

---

## 2. The honesty rules (§7) - what came off the site

Every one of these was live on a public page.

| Removed | Where it was | Why |
|---|---|---|
| "₹50K MRR" | home meta, hero, ventures, timeline, About, Services stat strip | Never claim current revenue. Income ended June 2026. |
| "7,000+ students", "₹2L+ revenue", "team of 25+" for BunkToBrains | data, home, About, timeline, achievements | Contradicts the settled fact that it was postponed for lack of student interest. |
| "1,240+ subscribers", "48 issues", "62% open rate", "Join 1,240+ builders" | Newsletter page, home footer CTA | Invented. The list is new and has sent nothing. |
| Issue numbers "#048" counting down over blog posts | Newsletter page | Those posts were never newsletter issues. |
| "Free AI Builder's Starter Kit" | Newsletter hero | Does not exist. |
| Five gold stars on every testimonial | Home, Reviews, ReviewDetail | Nobody ever gave a rating. This is the same class of thing as the fabricated "4.8/5 from 150 reviews" that had to be removed once already. |
| "3× Faster Content", "50% Higher Engagement", "10× More Leads", "5hrs Saved Weekly" | Socioverse product page, under a heading reading "Real growth." | Invented outcome metrics for a product with zero paying subscribers. |
| "Most popular" badge on a pricing tier | Socioverse product page | A claim about what other customers chose. There are none. |
| "100 / 100 / 50 projects" per craft | Skills, Home | Not traceable to anything. |
| Proficiency bars - React 95%, TypeScript 92%, and so on | Skills | Nobody measured them. Replaced with a list of the tools. |
| "14× faster than manual" | AI Proposal Generator | Invented. |
| "Implementation slots open this week" | Services CTA banner | Never true, and the agency is closed. |
| "Book a free strategy call" | Services, Contact | Advertising something not on offer. |
| "I take on one client engagement per quarter" | Skills CTA | Invented, and contradicts the above. |
| "Digital products, templates, and a few pieces of merch" | Shop | None of those exist. |
| "Check out BunkToBrains for our full catalog" | Courses | It was postponed. |
| "Launching Jan 2026" for Socioverse | Ventures | It launched. Describe systems as they run today. |
| "Response time: within 48 hours" | Contact | An SLA nobody committed to. Now "a couple of days". |

**What was added in their place**, and it is not a smaller page: a `RECEIPTS` block of
dated, checkable facts including the losses - the Shopify try-on that shipped, reached users
and got rejected on garment accuracy; BunkToBrains postponed on demand; AI Sight priced at
Rs 999 and sold zero. Per §5, the failures are the reason the wins are believable.

The header stat strip is now four countables that are all checkable: **20** (his age - the
strongest built-in hook the brand has, so it leads), **15** lectures, **3** things shipped,
**2** the market turned down.

Also settled per §12: Up N Running is "not taking new clients right now", not dead and not
dormant. Socioverse is "live, real users, no paying subscribers yet - product risk retired,
willingness to pay untested". BunkToBrains is a demand failure, not an unfinished build.
Claude, not ChatGPT, is in the tool marquee.

---

## 3. Voice (§6)

Hedges are in and were not edited out for punch: "I suspect that is where a lot of how I
build came from, though I might be reading that backwards." Aphoristic closers are out - the
three values were rewritten from poster lines ("The lie is always more expensive than the
moment of discomfort") into first-person, hedged versions. English throughout, no Hinglish.
**No em dash characters anywhere in the site's copy** - checked, and only the pre-2026-09
SQL seed migrations still contain them, which are historical applied files and were left
alone. `blog_posts` and `testimonials` are both empty in the database today, so nothing with
an em dash renders.

He is never positioned as an Instagram growth guru: the Socioverse page describes the
system, not audience growth, and the analytics feature no longer promises "follower growth".

---

## 4. The funnel (§8) - the site's single job

The nav carried fourteen links and a "Let's talk" button pointing at an agency that is not
taking clients. It now carries five links and the button is **Free workbook**. Everything
else still exists and is still reachable under More; it just no longer competes with the one
thing the site is for.

Home now runs in the order §9's table asks for: do not waste my time → he is twenty? → these
are real → genuinely free, what is the catch → obviously, I want the next one.

`/workbook` renders with no site chrome at all - see `BARE_ROUTES` in `Layout.tsx` - because
its spec is explicit that a capture page cannot offer eight other places to go.

Newsletter, footer and workbook all write to **one** consent-bearing contact table through
one endpoint. Two capture paths writing to two tables is the same mistake handoff 05 warns
about for capture-vs-send.

---

## 5. §13, the open question - and the answer this build assumes

The brief leaves one thing undecided: the relationship between `sightofai.space` and the
personal site.

**This build assumes option 3: they stay separate with a shared visual system, and the
newsletter lives only on the personal site.** That is not a preference, it is what handoff
06 forces - sightofai.space stops selling the course and becomes the page for the Rs 799
one-to-one, while the course itself is free on YouTube and the workbook gate is here. So:

- The course lives on YouTube. This site links to the playlist.
- The workbook, the email capture and the newsletter live here, and only here.
- `sightofai.space` is linked once, from `/coaching`, as the place the paid session is
  booked, after the page has already said the lectures are free.
- The palette is shared on purpose, so the two read as one system.

**If you wanted option 1 or 2 instead, say so** - it changes `/coaching`, the footer and
whether `/courses` should exist at all. Everything else in this build holds either way.

---

## Still open

- **The vector rebuild of the marks.** Blocking anything that needs the wordmark large,
  recoloured, or set alongside real Clash Display.
- **§13 above**, if option 3 is not what you wanted.
- `_shared/brand.md` still records the retired PorcelainBlue / Anton system for the YouTube
  thumbnail and whiteboard layer. This site no longer uses it, but two palettes for one
  person is still a live conflict on the video side.
