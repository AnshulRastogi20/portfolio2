-- /workbook capture, consent record and funnel analytics.
--
-- Spec: Socials/ai-sight-free-release/02-website-endpoint.md
--   "Store, per submission: email, marketing-consent boolean, UTC timestamp,
--    IP, and the exact consent wording shown. That record is the audit trail."
--
-- Three tables, and the split between them is the point:
--
--   workbook_signups    append-only. One row per submission, forever. This is
--                       the audit trail, so nothing here is ever updated.
--   marketing_contacts  current state, one row per email. The marketing list is
--                       the opted-in subset of THIS table, never of the log.
--   workbook_events     page_view / form_view / submit, counted separately so
--                       the conversion rate on this page is a real number.
--
-- Neither of the first two accepts an anonymous insert. Consent and IP have to
-- come from the server or they are not evidence: a client that can write its
-- own consent row can write consent it was never shown, and an IP the browser
-- reports is whatever the browser felt like reporting. Both are written by the
-- workbook-signup edge function under the service role.

create table if not exists public.workbook_signups (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  first_name        text,
  marketing_consent boolean not null default false,
  -- The exact string rendered next to the checkbox at the moment of submit,
  -- copied from the page rather than referenced. If the wording changes later,
  -- old records still show what that person actually agreed to.
  consent_wording   text not null,
  consent_version   text not null default 'v1',
  ip                inet,
  user_agent        text,
  referrer          text,
  utm               jsonb not null default '{}'::jsonb,
  source            text not null default 'workbook',
  created_at        timestamptz not null default now()
);

comment on table public.workbook_signups is
  'Append-only consent audit trail. Never UPDATE or DELETE a row here.';

create index if not exists workbook_signups_email_idx
  on public.workbook_signups (lower(email));
create index if not exists workbook_signups_created_at_idx
  on public.workbook_signups (created_at desc);

alter table public.workbook_signups enable row level security;

-- No anon policy at all: RLS with no matching policy denies. The edge function
-- writes with the service role, which bypasses RLS by design.
create policy "Admins can read workbook signups"
  on public.workbook_signups for select to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

create table if not exists public.marketing_contacts (
  email               text primary key,
  first_name          text,
  marketing_consent   boolean not null default false,
  consent_wording     text,
  consent_recorded_at timestamptz,
  unsubscribe_token   uuid not null default gen_random_uuid(),
  unsubscribed_at     timestamptz,
  source              text not null default 'workbook',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.marketing_contacts is
  'Current consent state, one row per email. The weekly list is the rows where marketing_consent is true and unsubscribed_at is null.';

create unique index if not exists marketing_contacts_token_idx
  on public.marketing_contacts (unsubscribe_token);

alter table public.marketing_contacts enable row level security;

create policy "Admins can read marketing contacts"
  on public.marketing_contacts for select to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

-- The only list that should ever be exported for a send.
create or replace view public.marketing_list
  with (security_invoker = true) as
  select email, first_name, unsubscribe_token, consent_recorded_at
  from public.marketing_contacts
  where marketing_consent is true and unsubscribed_at is null;

create table if not exists public.workbook_events (
  id         bigint generated always as identity primary key,
  event      text not null,
  visitor_id uuid,
  path       text,
  referrer   text,
  utm        jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint workbook_events_event_check
    check (event in ('page_view', 'form_view', 'submit', 'download', 'submit_error'))
);

create index if not exists workbook_events_event_created_idx
  on public.workbook_events (event, created_at desc);

alter table public.workbook_events enable row level security;

-- Analytics beacons are fired from the browser, so anon inserts are allowed
-- here. The CHECK constraint above is what stops the table becoming a free
-- text dump: only the five funnel events are accepted.
create policy "Anyone can record a workbook event"
  on public.workbook_events for insert to anon, authenticated
  with check (true);

create policy "Admins can read workbook events"
  on public.workbook_events for select to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));

-- The number that says whether the whole plan is working.
create or replace view public.workbook_funnel
  with (security_invoker = true) as
  select
    date_trunc('day', created_at)::date            as day,
    count(*) filter (where event = 'page_view')    as page_views,
    count(*) filter (where event = 'form_view')    as form_views,
    count(*) filter (where event = 'submit')       as submits,
    round(
      100.0 * nullif(count(*) filter (where event = 'submit'), 0)
            / nullif(count(*) filter (where event = 'page_view'), 0)
    , 1)                                           as submit_rate_pct
  from public.workbook_events
  group by 1
  order by 1 desc;
