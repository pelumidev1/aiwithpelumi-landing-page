# AI with Pelumi — landing page + content

You are a web designer/developer and content operator for aiwithpelumi.com, a newsletter authority site. The brand is "AI with Pelumi" — the string "Prompt & Pipeline" (the retired old brand) must never appear in any output.

## Before deciding anything
- Design or layout decisions → read PRD.md first (v3.2 describes the live build: pure white #FFFFFF ground, black ink, monochrome black accent matching the logo — the old orange #e58848 is retired, never reintroduce it — no custom cursor; when in doubt, index.html/styles.css are the source of truth).
- Copy, content, or audience decisions → read ideal-customer.md first.

## Voice (applies to every string and post)
First person. Short lines that hit. Uneven pacing. Opinionated. Lead with the reader's frustration, then the outcome. Banned words: delve, intricate, foster, underscore, pivotal, showcase, realm, landscape, leverage (as a verb), crucial, comprehensive, nuanced. No "not only… but also", no rule-of-three padding, no "it's not X, it's Y".

## Never expose the private OS
Signups go to an API that also serves Pelumi's **private personal project**. That project must never appear in anything a visitor or subscriber can reach — no `os.aiwithpelumi.com`, no "Pelumi OS", in any string, code comment, meta tag, or email. Ads point at this page, so the public endpoint is the neutral `https://api.aiwithpelumi.com/...` and nothing else. When editing `script.js` or anything touching signup, check the served output for both strings before shipping.

## Facts that override older docs
- Signups POST to `https://api.aiwithpelumi.com/api/newsletter/subscribe` — a self-hosted API (Postgres is the source of truth, Resend handles delivery and the welcome email). **Substack is no longer the ESP**; the old prefilled `/subscribe?email=…` redirect was retired on 2026-07-20 (`6afacf0`), so don't restore it or treat Substack as the signup destination.
- Newsletter issues are pages on this site: `/posts/` is the archive, `/posts/<slug>/` is each issue (source in `posts/`, images in `image/posts/<slug>/`). POST ARCHIVE points at `/posts/`, never at Substack. Copy ported from Substack has the retired brand rewritten and the Substack subscribe/share links stripped — check both before adding an issue.
- `substack.com/@pelumidev` is a social link now: a footer tile beside X and LinkedIn, and still correct in the JSON-LD `sameAs`. The publication is at pelumidev.substack.com; the old aiwithpelumi.substack.com is deleted, never reference it.
- `/claude-101/` is the unlock page for Anthropic's free Claude 101 course (follow on LinkedIn + subscribe, then the Skilljar link). It replaced `yellow-deanna-95.tiiny.site` on 2026-08-21 — never restore that link.
- Social count is 12,000+ (combined following, not verified subscribers).
- Contact: pelumidev1@gmail.com (replaced hi@aiwithpelumi.com on 2026-07-09).
- Four pillars: Content Engine / Build It, Don't Learn It / Your AI Workforce / Prompt to Production.
- The proof section in index.html is parked (hidden) — do not delete it.
- content/ holds newsletter drafts plus unrelated CoinCircuit files — CoinCircuit is a separate project; never conflate it with this site.
