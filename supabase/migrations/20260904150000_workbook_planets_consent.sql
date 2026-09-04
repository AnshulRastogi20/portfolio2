-- /workbook moves to Socioverse Planets for capture AND delivery.
--
-- The page no longer has a form of its own. It shows the consent boxes, the
-- visitor clicks Continue, and the Planets zero-price digital product takes
-- over: its billing email IS the lead email, and its order confirmation is what
-- delivers the PDF. Socioverse is the single list.
--
-- Two consequences for this schema:
--
-- 1. Consent is now recorded BEFORE the email is known. `email` becomes
--    nullable and `consent_token` becomes the handle - a uuid minted on the
--    page, recorded here, and handed to Planets so the resulting order can be
--    matched back to the consent that preceded it. Until that match happens the
--    row is an unattributed consent event, which is honest: it says somebody at
--    this IP, at this time, was shown this wording and ticked or did not tick.
--
-- 2. `marketing_contacts` and `marketing_list` are dropped. Socioverse `leads`
--    is the contact database now, and keeping a second one here is precisely
--    the "two databases and a sync you own forever" trap that handoff 05 warns
--    about. Both are empty - they were created earlier today and never used.

alter table public.workbook_signups
  alter column email drop not null;

alter table public.workbook_signups
  add column if not exists consent_token uuid,
  add column if not exists socioverse_order_id uuid,
  add column if not exists reconciled_at timestamptz;

create unique index if not exists workbook_signups_consent_token_idx
  on public.workbook_signups (consent_token)
  where consent_token is not null;

comment on column public.workbook_signups.consent_token is
  'Minted on the page before the email exists. Handed to Planets so the order it produces can be matched back to this consent event.';
comment on column public.workbook_signups.socioverse_order_id is
  'Filled in on reconciliation against Socioverse orders. Null means this consent event has not been matched to a buyer yet.';

drop view if exists public.marketing_list;
drop table if exists public.marketing_contacts;

-- Consent events still waiting to be matched to a Planets order. If this grows
-- and never drains, reconciliation is broken and the marketing list is silently
-- not being built.
create or replace view public.workbook_unreconciled_consent
  with (security_invoker = true) as
  select id, consent_token, marketing_consent, ip, created_at
  from public.workbook_signups
  where consent_token is not null
    and socioverse_order_id is null
  order by created_at desc;
