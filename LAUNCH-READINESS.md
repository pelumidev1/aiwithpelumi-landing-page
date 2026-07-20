# Launch readiness — aiwithpelumi.com

Audit run **2026-07-20**, ahead of taking the site to market and scaling the
list toward 1,000 subscribers. Covers the landing page, the signup API in
`ai-os`, Supabase, and Resend.

**Verdict: the signup pipeline works and the security model is sound. Four
things should be fixed before you spend money driving traffic** — one of them
silently loses subscribers at exactly the moment a campaign succeeds.

---

## 1. Does capture actually work?

Yes. Verified end to end against production, not locally.

A real POST to `https://os.aiwithpelumi.com/api/newsletter/subscribe` with
`pelumidev1+launchtest@gmail.com` produced all three of:

| Stage | Result |
|---|---|
| Supabase `subscribers` row | created, `status=confirmed`, `source=aiwithpelumi_landing`, consent IP + user agent recorded |
| Resend audience contact | created, `resend_contact_id` stored on the row |
| Welcome email | **delivered** (confirmed in Resend's event log) |

The live site was also driven in a real browser (headless Chromium):

- Page loads clean — no JavaScript errors, no failed requests.
- All three signup forms POST to the correct OS endpoint with the honeypot
  field included and empty.
- The signup popup opens normally, and no longer opens over a form someone is
  filling in (the fix shipped in `13af789`).
- Mobile at 390px: no horizontal overflow, form visible and usable.

**One piece of test data to clean up:** `pelumidev1+launchtest@gmail.com` is
now a real confirmed subscriber and sits in the Resend audience. It will
receive broadcasts. Current confirmed count is 50 (49 imported + this test).
Remove it when convenient.

---

## 2. Blockers before you drive traffic

### P0 — A traffic spike silently destroys signups — ✅ FIXED 2026-07-20

> **Fixed and verified.** The route now writes to Supabase first and treats
> the Resend mirror as best-effort, with `/api/cron/reconcile-contacts`
> sweeping any subscriber the mirror didn't place. Verification is in
> section 8. **Not yet deployed** — the change is committed in `ai-os` and
> needs a deploy to take effect.
>
> The original finding is kept below because it explains the ordering, and
> the reasoning matters if this code is ever refactored.

`app/api/newsletter/subscribe/route.ts` mirrored the new subscriber into
Resend **before** writing to its own database:

```
upsertContact(...)      ← Resend call
   ↓ throws?  →  return 502, nothing saved
insert into subscribers ← only reached if Resend succeeded
```

Any Resend failure means the signup is rejected with *"Something broke on my
end. Try again."* and **is never stored anywhere**. The visitor is gone.

This matters because of throughput. Resend rate-limits this account at
**10 requests/second**, and each new signup spends **two** of them
(`upsertContact` + the welcome `sendEmail`). So the ceiling is roughly:

> **~5 signups/second before Resend starts returning 429 — and every 429
> becomes a lost subscriber, not a retried one.**

A newsletter mention, a video that lands, or a post that runs will exceed 5
signups/second easily. The failure mode is backwards: success causes loss.

It also contradicts the stated architecture. `docs/NEWSLETTER.md` says the OS
is the source of truth and "if Resend disappeared tomorrow, the list lives in
`subscribers`". Today a Resend hiccup means the subscriber never reaches
`subscribers` at all.

**Fix:** write to Supabase first, then mirror to Resend. If the mirror fails,
still return success, leave `resend_contact_id` null, and reconcile later (a
cron sweep picking up unmirrored rows). The welcome email already degrades
this way correctly — its failure is logged, not fatal. The contact mirror
should behave the same.

### P0 — Confirm the Resend plan covers the volume

I could not read the plan tier through the API; check the dashboard.

The math for 1,000 subscribers:

| Load | Emails |
|---|---|
| Welcome emails, 1,000 signups | 1,000 (one per signup, at signup time) |
| One weekly broadcast to 1,000 | 1,000 per issue |
| Monthly total at 1,000 subs | ~4,300/month |

**Confirmed 2026-07-20: the account is on Resend's free tier** — 3,000
emails/month, **100 emails/day**, 1,000 marketing contacts.

The 3,000 is a *sending* allowance, not storage. Three separate ceilings bite,
and the daily one bites first:

| Limit | Value | What it caps |
|---|---|---|
| Emails/day | 100 | **~100 recipients per issue** |
| Emails/month | 3,000 | ~700 subscribers on a weekly send (4.3 × 700 ≈ 3,000) |
| Marketing contacts | 1,000 | a hard ceiling exactly at the 1,000 target |

**The binding constraint is 100/day, and it arrives at ~100 subscribers, not
1,000.** A broadcast to 150 people is 150 emails in one day and cannot
complete on this plan. At 49 real subscribers today, that ceiling is close.

The 1,000-contact cap also sits exactly on the stated goal, with no headroom
to grow past it.

Pro is $20/month: 50,000 emails and no daily limit. Confirm what contact
allowance Pro carries — the pricing page describes 5,000 contacts against the
$40 tier, so the marketing-contact ladder may differ from the sending ladder.

One mitigation is already in place: since the signup route now stores before
mirroring (section 8), hitting the daily cap costs the *welcome email*, not
the subscriber. The list keeps growing through a throttle; those people just
don't get greeted.

### P1 — The rate limit will block real subscribers on mobile networks

The endpoint allows **5 attempts per IP per 10 minutes**. Verified live: the
5th request returned `429 Too many attempts`.

Nigerian mobile carriers (MTN, Glo, Airtel) route large numbers of users
through carrier-grade NAT, meaning many people share one public IP. If your
campaign lands with a mobile audience, the 6th person on a shared carrier IP
inside 10 minutes gets turned away — and the front end shows them only "Try
again", with no reason.

**Fix:** raise the per-IP limit substantially (50–100/10min still stops abuse
while clearing NAT), or rate-limit on a hash of IP + email so repeat attempts
by one person are caught without penalising their neighbours.

### P1 — Social shares show a blank card — ✅ FIXED 2026-07-20

`og-image.png` returned **404**, so every share on X, LinkedIn, WhatsApp or
Slack rendered with no preview image — while `twitter:card` promised the
large-image format.

Shipped in `03c53f2`: a 1200×630 card built from the live design tokens
(white ground, chrome-gradient headline, Inter + Geist Mono), 64KB, serving
at `https://www.aiwithpelumi.com/og-image.png`. Both image URLs now point at
`www` rather than the apex, because the apex 308s and some scrapers don't
follow redirects when fetching previews. `og:image:width/height/alt` added.

Platforms cache previews, so anything already posted needs a manual
re-scrape (X card validator, LinkedIn Post Inspector, Facebook debugger —
the last also refreshes WhatsApp).

---

## 3. Worth fixing early

**No analytics.** Nothing on the page — no GA, Plausible, Vercel Analytics,
or anything else. You will not be able to tell which channel produced
signups, what the conversion rate is, or whether the campaign worked. Add
something before spending on traffic, not after.

**~~No privacy policy~~ — ✅ published 2026-07-20** at `/privacy.html`,
linked from the footer (`0a9f649`). Built from the draft in `pelumi-os`, with
three corrections after checking live behaviour: Vercel was unnamed as a
processor, Google Fonts sends every visitor's IP to Google on page load, and
the site genuinely sets no cookies or local storage — which is worth stating,
and means no cookie banner is needed. `PRD.md` updated to record the reversal
of the earlier "no privacy-policy link" decision.

**The front end throws away the API's error message.** `script.js` reduces
the response to `res.ok`, so a rate-limited user (429), a server error (502),
and a network failure all show the same "Try again". The API returns useful
text in `error` — surfacing it costs a few lines and turns a dead end into an
instruction.

**Canonical URL points at a redirect.** The page canonical and `og:url` say
`https://aiwithpelumi.com/`, but the apex 308-redirects to
`https://www.aiwithpelumi.com/`. Search engines resolve this, but pointing
both at the `www` form is tidier and avoids diluting signals during a link
push.

**No security headers beyond HSTS.** The landing page sends only
`Strict-Transport-Security` — no `X-Frame-Options`, `X-Content-Type-Options`,
or CSP. Low risk for a static page, but it does carry a form; a
`vercel.json` headers block closes it cheaply.

---

## 4. Security review

The newsletter system is well built. No changes needed here.

| Area | Finding |
|---|---|
| **Secrets in git** | Clean. `.env*` is gitignored, `.env.local` was never committed, and a scan of all history found only a `sk-ant-...` placeholder in docs. |
| **Database access** | RLS enabled on all four newsletter tables **with no policies**, so anon and authenticated roles get nothing. Only the service-role key on the server can read or write. Correct approach. |
| **Confirmation tokens** | 32 random bytes from `crypto.randomBytes`; only the SHA-256 hash is stored. A database leak cannot be replayed into confirmations. Compared with `timingSafeEqual`. |
| **Webhook authentication** | Resend/svix signatures verified by HMAC-SHA256 over `id.timestamp.body`, with a 5-minute replay window and constant-time comparison. Delivery IDs are stored unique, so replays are idempotent. |
| **Unsubscribe safety** | GET only renders a confirm page; POST performs the change. Inbox link-scanners that prefetch GETs can't unsubscribe readers. Tokens are regex-validated before ever reaching HTML, so nothing reflects. |
| **Email enumeration** | Every success path returns an identical response, so the endpoint can't be used to test whether an address is subscribed. |
| **Bot protection** | Hidden `website` honeypot present on all three live forms; filled submissions are accepted and discarded silently. |
| **Input handling** | Email normalized and length-bounded (local ≤64, total ≤254); free-text fields stripped of control characters and truncated before storage. |
| **IP handling** | Rate limiting stores only a SHA-256 of the IP. The raw IP is kept on the subscriber row as consent evidence — legitimate, but it is personal data, which is part of why the privacy policy matters. |

One note rather than a flaw: the Resend API key in use has **full account
access** (it can list API keys and domains, not just send). If Resend supports
a sending-plus-contacts scoped key for your plan, that limits the blast radius
if the Vercel environment is ever exposed.

---

## 5. Scalability at 1,000 subscribers

**Data volume is a non-issue.** 1,000 rows is nothing for Postgres. The
`subscribers` table is indexed on `status` and on `confirm_token_hash`, and
`email` is unique. The rate-limit table is indexed on `(ip_hash,
attempted_at desc)` and self-prunes on ~5% of requests, holding it near the
size of the 10-minute window (currently 11 rows).

**Throughput is the constraint**, per the P0 above: ~5 signups/second, with
losses beyond it.

**Latency is high.** Measured 1.3–3.0 seconds per request on the path that
does *no* Resend work. A brand-new signup adds two Resend round trips on top.
Each request makes 2 sequential Supabase calls just for rate limiting
(insert, then count) before any real work starts. Users will feel a
multi-second wait after pressing the button. The button does disable during
the request, so double-submits are prevented.

**Broadcast sending is fine.** Weekly issues go out through Resend
Broadcasts, which delivers server-side to the audience — the 10 req/s API
limit does not apply per-recipient there. Only `confirmed` contacts receive
them, and bounced/complained/unsubscribed contacts are suppressed on both
sides via the webhook.

**Supabase tier:** confirm the project isn't on a plan that pauses on
inactivity. A live site with traffic won't idle, but check it before launch.

---

## 6. Suggested order

1. ~~Reorder the subscribe route~~ — **done, needs deploying.**
2. Upgrade Resend off the free tier — 100 emails/day caps you at ~100 recipients per issue.
3. Create `og-image.png` (1200×630) at the site root.
4. Raise the per-IP rate limit, or key it on IP + email.
5. Add analytics.
6. Publish a privacy policy and link it in the footer.
7. Surface the API's error text in the form.
8. Remove the `+launchtest` test subscriber.

Items 1–3 are the ones that change launch outcomes. The rest are cheap and
can follow within the first week.

---

## 7. Reproducing these checks

The browser tests live in the session scratchpad and can be re-run with
`node live-test.mjs` (drives production, no signups created — the form POST is
intercepted) and `node popup-test.mjs` (drives the local `index.html`).

The rate-limit probe is safe to repeat because it uses an already-confirmed
address, which returns early before any Resend call or database write:

```bash
curl -s -X POST https://os.aiwithpelumi.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" -H "Origin: https://aiwithpelumi.com" \
  -d '{"email":"<an-already-confirmed-address>"}'
```

To test the *full* signup path without polluting the list, use a Gmail
plus-alias — it is a distinct address to the API and lands in your normal
inbox. Testing with an address that is already confirmed will appear to do
nothing, because that path deliberately sends no email.

---

## 8. Verification of the P0 fix

Proven against a local dev server pointed at the production Supabase and
Resend, by sabotaging the Resend API key to force the exact failure a 429
would cause.

**Step 1 — signup with Resend broken.** `RESEND_API_KEY` replaced with a
junk value, then a real POST:

```
POST /api/newsletter/subscribe  {"email":"pelumidev1+failtest@gmail.com"}
→ 200 {"ok":true,"message":"You're in. The welcome email is on its way."}
```

Database immediately after:

```json
{"email":"pelumidev1+failtest@gmail.com","status":"confirmed","resend_contact_id":null}
```

The subscriber survived a total Resend outage. Under the previous ordering
this same request returned 502 and stored nothing.

**Step 2 — reconcile sweep.** Real key restored, then the cron endpoint:

```
GET /api/cron/reconcile-contacts            → 401 (no auth — correct)
GET /api/cron/reconcile-contacts  (Bearer)  → 200 {"ok":true,"examined":1,"mirrored":1,"failed":0}
```

Database and Resend after the sweep:

```json
{"email":"pelumidev1+failtest@gmail.com","resend_contact_id":"84ee887b-…"}
```
Audience membership confirmed, 51 contacts total.

The gap closes on its own within 15 minutes, with no lost address and no
manual step.

**Also checked:** `tsc --noEmit` clean, eslint clean, 42/42 tests passing,
`next build` succeeds and registers `/api/cron/reconcile-contacts`. The
`.env.local` key was restored and verified byte-identical to the original.

**Test data left behind:** `pelumidev1+launchtest@gmail.com` and
`pelumidev1+failtest@gmail.com` are both real confirmed subscribers in the
audience (51 contacts, of which 49 are the genuine Substack import). Remove
both before counting your list.
