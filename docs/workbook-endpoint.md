# /workbook - what was built, and what is still on you

Implements `Socials/ai-sight-free-release/02-website-endpoint.md`.
Rewritten 2026-09-04, after the capture-vs-send decision was actually made.

---

## The decision, and the two wrong turns before it

Handoff 02 points at Socioverse lead-forms. Handoff 05 makes it conditional: Socioverse for
**both** capture and send if it passes a four-point check, MailerLite for **both** if it does
not. The first build ran neither branch - it used Supabase plus Resend, a third option nobody
chose, and its sending half was never real: no account, no key, no authenticated domain.

The second reading of the check was also wrong, in Socioverse's favour. Both errors are
recorded here so they are not repeated:

- *"No bounce handling."* Wrong. `email_log.status` carries `sent | delivered | failed |
  bounced`.
- *"No domain authentication."* Too harsh. Socioverse sends from
  `notifications.socioverse.io` and mail lands as `delivered` - receipts, refunds, weekly
  reports, and 343 campaign sends. The accurate, narrower finding: there is no way to
  authenticate `sightofanshul.com` as a sending domain, so the workbook email arrives from
  the Socioverse domain. A branding choice, not a deliverability failure.

**Settled: Socioverse for both.** Specifically Socioverse **Planets**, the digital-product
feature - because Socioverse cannot auto-deliver a file on form submit, but it can deliver
one on a zero-price order, which is a path already proven in production.

---

## How the page works

The page has **no form of its own**. That is the point.

1. `/workbook` shows what the workbook is, and one optional, unticked consent box.
2. The visitor presses **Continue**. The consent event is recorded server-side: IP, UTC
   timestamp, the exact wording that was on screen, and a random `consent_token`. There is
   no email yet, and that is expected.
3. The **Planets checkout for the zero-price DOWNLOAD product** appears inline. Its billing
   email **is** the lead. Planets creates the order and sends the PDF.

Handing the email to Planets and only Planets is what keeps this out of the trap handoff 05
describes. There is one contact database - Socioverse `leads` - and this site keeps only the
consent evidence, never a second copy of the contacts. It also means nobody types their
address twice, so the consent record and the delivery address cannot end up different.

`Continue` is enabled from page load. Ticking the box is never a condition of the download.

---

## What exists

| Piece | Where |
|---|---|
| The page | `src/pages/Workbook.tsx`, route `/workbook` |
| No nav above the fold | `src/components/Layout.tsx` - `BARE_ROUTES` |
| Consent audit trail | `public.workbook_signups` (append-only, email nullable) |
| Reconciliation queue | `public.workbook_unreconciled_consent` |
| Funnel counts | `public.workbook_events` + `public.workbook_funnel` |
| Consent write path | edge function `workbook-signup` (deployed, v3) |
| Newsletter box → Socioverse `leads` | same function, email branch |
| Privacy policy | `src/pages/Privacy.tsx` |
| Contract tests | `src/test/workbook.test.tsx` (8 tests) |

Migrations `20260904120000_workbook_capture.sql` then
`20260904150000_workbook_planets_consent.sql`, both applied.

`marketing_contacts` and `marketing_list` were **dropped** - Socioverse `leads` replaced
them, and a second contact table is exactly the sync you would own forever. Both were empty.

---

## Verified live on 2026-09-04

- Consent with a `consentToken` and no email returned
  `{"ok":true, ..., "leadSkippedReason":"no email yet"}`.
- The row landed with a null email, the token, the real client IP and a UTC timestamp.
- `workbook_unreconciled_consent` showed it waiting, which is the queue working as intended.
- A request with neither an email nor a token returned 400.
- Test rows deleted afterwards; all tables back at zero.
- `tsc --noEmit`, `npm run build` and `npm test` (13 tests) all pass.

---

## Still on you

### 1. ~~Create the Planets product, then set one env var~~ - DONE 2026-09-06

The product exists: `ai-sight-workbook` on the `anshulrastogi` storefront, type `file`,
price 0 USD, published, `downloads_disabled: false`, one 2.1 MB PDF in the
`creator-products` bucket.

No env var is needed any more. `WORKBOOK.planetsUrl` in `src/lib/data.ts` now defaults to
the live product URL, because this URL goes into 15 video descriptions and must not depend
on somebody remembering a Vercel setting. `VITE_WORKBOOK_PLANETS_URL` still overrides it if
the product ever moves.

Note `price_cents_inr` is **null**, not 0. That is fine at zero - every guard in
`create-checkout` that would reject a half-priced product tests `> 0` - but do not set a USD
price without setting the INR one, or the rail guard at line 249 starts rejecting checkouts.

### 2. Does a zero-price order actually send? Half answered.

**The free order path is confirmed in production.** `create-checkout` line 283: when
`finalPriceCents === 0` it inserts a `status: paid, provider: free` order and calls
`fulfillPaidOrder` synchronously - no Razorpay, no Dodo, no webhook round trip. Five
zero-amount orders exist on the tenant and every receipt shows `delivered` in `email_log`,
about one second after the order. So the order will be created and mail will go out.

**The file half is still unexercised.** Before 2026-09-06 no product on the entire platform
had ever been type `file`/`download` or had anything in `files[]`, so
`files[] -> get-download -> signed URL` has never run for a real buyer. The workbook is the
first. Place one real order from a phone before the announcement.

### 2b. Delivery is two emails and a six-digit code, not one email with a link

Found while tracing `get-download`, and it changes what the page can promise.

`get-download` requires a verified device session in `enrollment_access_sessions`. The
emailed `access_token` alone is deliberately not enough - it is forwardable and never
expires, so on its own it would hand the creator's files to anyone holding the link.
Sessions are only ever minted by `get-enrollment` on `action: verify_code`.

So the real path is:

1. Email into the embed -> order created -> receipt email, "Access order details".
2. That button opens `/purchases/<access_token>`.
3. The buyer requests a code -> **second email**, "NNNNNN is your purchase access code".
4. Code entered -> device session -> download works.

The live free orders show exactly this timing: receipt at 17:20:33, access code at 17:20:52,
a second code at 17:21:52.

For a paid course that is correct security. For a free lead magnet it is real friction, and
it breaks the "the email arrives inside a minute and they have the PDF" acceptance line -
the *first* email arrives inside a minute, the PDF takes a code round-trip. Decide before
15 September whether that is acceptable; if it is not, the fix is on the Socioverse side,
not here.

Related: the receipt copy reads "Payment received.", "Your files are ready." and
"Amount paid: $0.00" on a free order. Worth a pass in `_shared/fulfillment.ts`.

### 2c. Planets does NOT write to `leads`

The premise this whole design rests on - "the billing email IS the lead, Socioverse `leads`
is the single contact database" - is **not true today**. Neither `create-checkout` nor
`_shared/fulfillment.ts` references `leads` at all, and none of the existing free-order
buyer emails appear in that table. Buyers land in `orders` and stop there.

That is survivable for delivery, which does not care. It is not survivable for the list. If
the marketing list matters, something has to bridge order -> lead on the Socioverse side.

### 3. Reconcile consent to email

The consent event and the Planets order are joined by `consent_token`. Getting that token
into the checkout needs one of:

- Planets accepting a query parameter that lands in `orders.metadata` - **best, and exact**;
- an order webhook this site can receive; or
- a periodic job matching on IP and time window - workable, but weak as evidence.

Checked 2026-09-06: **the first option does not exist.** `create-checkout` accepts exactly
four fields - `product_id`, `buyer_email`, `buyer_name`, `discount_code` - and builds
`orders.metadata` from a fixed set of server-side keys. There is no passthrough to carry a
`consent_token` in. It needs a Socioverse code change, not a URL parameter.

Until one exists, `workbook_unreconciled_consent` grows and never drains. **If that view is
not empty and not shrinking, the marketing list is silently not being built.** The workbook
itself is unaffected either way, which is the right way round.

### 4. ~~If the iframe is refused~~ - RESOLVED, but only on the right route

Measured 2026-09-06:

```
https://www.socioverse.io/anshulrastogi/ai-sight       ->  X-Frame-Options: SAMEORIGIN
https://www.socioverse.io/d/anshulrastogi/ai-sight-workbook?embed=1
                                                        ->  Content-Security-Policy: frame-ancestors *
```

The storefront routes refuse to be framed. The dedicated `/d/` embed route is explicitly
open, and posts `{ type: "socioverse:embed-height", height }` back to the parent so the
frame resizes instead of scrolling inside a fixed box.

`Checkout` in `Workbook.tsx` appends `?embed=1` for the frame and keeps the bare URL for the
"open it in a new tab" link. The height listener checks both the origin and that the message
came from this frame - without the source check any page could drive the checkout's height.
A contract test pins both URLs, so someone dropping `?embed=1` gets a red test and not a
blank box on the one page the whole release funnels into.

Still check it on a real phone before the announcement.

### 5. Housekeeping

- The `workbook-unsubscribe` edge function is **orphaned** - it wrote to `marketing_contacts`,
  which no longer exists. Delete it from the Supabase dashboard; nothing calls it.
- `/unsubscribe` no longer unsubscribes anyone. Socioverse owns the list and its emails carry
  the real one-click header. The page says so and routes to you, rather than pretending.
- Optional, so the newsletter box elsewhere on the site writes into Socioverse `leads`: set
  `SOCIOVERSE_SUPABASE_URL`, `SOCIOVERSE_SERVICE_KEY` and `SOCIOVERSE_TENANT_ID`
  (`b67b61a3-9ae2-45d4-9481-43f74b8add12`) as Supabase function secrets. Unset, consent is
  still recorded and the response says the lead was not synced.

### 6. DNS and the domain redirects - read this before re-adding them

**The redirects are not in `vercel.json` right now, on purpose.** They were, and they took
the live site down for as long as it took to notice.

What happened: a redirect written as `source: "/:path*"` with a host condition matches
**every path, assets included**. `sightofanshul.com` was still on registrar parking
(162.255.119.77), so `/assets/index-*.js` and the stylesheet both 301'd to a host that
served nothing. The HTML was still in the edge cache, so the site answered 200 and rendered
a blank white page - which looks exactly like a JS crash and is not one.

The rules are correct. Shipping them before the target existed was the mistake. So the order
matters:

1. Add `sightofanshul.com` and `www.sightofanshul.com` to this Vercel project and make
   **sightofanshul.com** primary. Take the apex A record or nameserver values from the
   Vercel dashboard, never from a doc - they change and a stale one fails silently.
2. **Confirm it actually serves before going further:** `curl -I https://sightofanshul.com`
   must return 200 from `Server: Vercel`. If it returns nothing, or anything from another
   server, stop here.
3. Only then add the redirects back to `vercel.json`, one host per rule, 301 explicitly
   (Vercel's `permanent: true` emits a 308):

   ```json
   "redirects": [
     { "source": "/:path*", "has": [{ "type": "host", "value": "anshulrastogi.com" }],
       "destination": "https://sightofanshul.com/:path*", "statusCode": 301 },
     { "source": "/:path*", "has": [{ "type": "host", "value": "www.anshulrastogi.com" }],
       "destination": "https://sightofanshul.com/:path*", "statusCode": 301 },
     { "source": "/:path*", "has": [{ "type": "host", "value": "anshulrastogi.xyz" }],
       "destination": "https://sightofanshul.com/:path*", "statusCode": 301 },
     { "source": "/:path*", "has": [{ "type": "host", "value": "www.anshulrastogi.xyz" }],
       "destination": "https://sightofanshul.com/:path*", "statusCode": 301 },
     { "source": "/:path*", "has": [{ "type": "host", "value": "www.sightofanshul.com" }],
       "destination": "https://sightofanshul.com/:path*", "statusCode": 301 }
   ]
   ```
4. After deploying, check an **asset** and not just the homepage - the homepage can answer
   from cache while every asset underneath it is redirecting:

   ```
   curl -I https://www.anshulrastogi.com/assets/  ->  expect 301 to sightofanshul.com
   curl -I https://sightofanshul.com             ->  expect 200
   ```
   Then load the site in a browser and confirm it renders, not just that it returns 200.

---

## Acceptance list from the handoff

- [x] `/workbook` loads with no nav above the fold
- [x] Marketing checkbox present, unticked, separate from delivery, never gates it
- [x] Consent record stores wording + UTC timestamp + IP
- [x] Privacy policy linked, and accurate to what the code does
- [x] Capture and send are the same system, decision recorded here with the reason
- [x] Redirect rules written and documented, 301 not 308 - **held back until sightofanshul.com serves, see (6)**
- [x] Planets product created, priced 0, PDF uploaded, page wired to it
- [x] The embed actually renders cross-origin - `/d/...?embed=1`, `frame-ancestors *`
- [ ] Download shown AND the email arrives inside a minute - **first email yes, the PDF
      needs a six-digit code round-trip, see (2b)**
- [x] PDF URL stable and public - 2.1 MB in `creator-products`, served by signed URL
- [ ] Both domains resolve; anshulrastogi.com 301s to sightofanshul.com - **needs DNS**
- [ ] Marketing list contains only opted-in contacts - **needs reconciliation (3), and
      Planets does not write to `leads` at all, see (2c)**
- [ ] Tested end to end with a real address on a phone - **after the above**
