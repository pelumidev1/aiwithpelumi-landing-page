# AI with Pelumi — Landing Page Design Plan

**Working from:** PRD.md v3.0 + ideal-customer.md (repositioned) + the existing built page
**Deliverable:** Single static page (`index.html` + `styles.css` + `script.js`), no build step, wired to an ESP, plus root `robots.txt`, `sitemap.xml`, `llms.txt`.
**Status:** The page is already built as "Prompt & Pipeline." This plan covers the reskin of copy, structure, and SEO to "AI with Pelumi." The visual system stays; the positioning changes.

---

## 1. What stays and what changes

| Layer | Verdict |
|---|---|
| **Color, cursor, grid, spine, motion** | Keep as-is. The dark, quiet, high-craft look is the strongest signal that this person builds. Don't touch it. |
| **Type system** (General Sans + JetBrains Mono) | Keep. |
| **Section order** | Unchanged. No new sections — same five-section flow as the built page. |
| **Brand name** | Change everywhere. "Prompt & Pipeline" is dead. "AI with Pelumi" is the brand and the newsletter. |
| **Hero copy** | Rewrite. Lead with the universal "using AI wrong" frustration, not the marketer-only line. |
| **Section 2** | Rework from three "moves" to four named pillars that double as keyword surfaces. |
| **Metadata / schema / social cards** | Build from near-zero. This is the biggest lift and the biggest payoff. |

Build note (2026-07-03): per Pelumi's live direction, the pillar blocks use the vertical, centre-aligned layout (same rhythm as the hero), not the alternating two-column layout. The founder card carries the real B&W headshot at `image/pelumi-headshot.jpg`, and the footer ends with a large Silkscreen pixel wordmark "AI WITH PELUMI" (aiwithremy.com-style).

---

## 2. Design tokens (unchanged from the built page)

### Color

| Token | Value | Use |
|---|---|---|
| `--black` | `#000000` | Page background |
| `--carbon` | `#0b1012` | Cards, panels |
| `--line` | `#212325` | Borders, dividers, spine |
| `--white` | `#ffffff` | Headings + body |
| `--grey` | `#99a1a5` | Muted/secondary text |
| `--orange` | `#e58848` | The only accent |
| `--orange-tint` | `rgba(229,136,72,.12)` | Glows, tag backgrounds |
| `--red-muted` | `#c0564a` | "Them" column X icons only |
| Glass | `blur(2rem)` + `linear-gradient(180deg,#ffffff26,#fff3)` | Cursor, eyebrow pill |

Discipline rule holds: orange in at most one element per viewport-height.

### Typography

* **Display + body:** General Sans (Fontshare, free), weights 400/500/600, headline tracking −0.03em.
* **Utility mono:** JetBrains Mono for eyebrows, stage labels, credential chips, micro-trust, footer meta, prompt-card graphics. Uppercase, `letter-spacing:.08em`, ~12–13px.
* **Pixel accent:** Silkscreen (Google Fonts) for the big footer wordmark only.
* Scale via `clamp()`: `h1 clamp(2.4rem, 1rem + 5.5vw, 4.6rem)`, `h2 clamp(1.8rem, 1rem + 3vw, 3rem)`, body 1.0625rem/1.6.

### Grid

* `<600px`: 6 col, 1.5rem gap, 2rem margins
* `601–1024px`: 12 col, 1.5rem gap, 2rem margins
* `>1024px`: 24 col, 2rem gap, 4rem margins, max-width 1440px

### The spine

The 1px center line with diamond nodes that light orange on scroll stays. It still reads as "systems and sequence," which fits the new positioning as well as the old one. It's the one place motion is spent generously; everything else stays quiet.

### The hero globe

The ASCII globe behind the hero headline stays: canvas-rendered rotating sphere of ASCII characters (grey with sparse orange flecks), drawn by `script.js`, static under reduced motion. Recreated from the shopify.vc reference in the site palette.

---

## 3. Section-by-section spec

### Header
`AI WITH PELUMI` wordmark ("with" in orange), mono caps, top-left. No byline. No nav.

### S1 — Hero
Centered column over the ASCII globe: glass eyebrow (`AI WITH PELUMI · WEEKLY`) — H1 — sub — inline pill form — mono micro-trust with pulsing orange dot.

* **H1:** "You're not using AI wrong. Nobody showed you the stack." (A/B alt in PRD.)
* **Sub:** "Every week I show you the practical AI stack — turn one idea into a content engine, build websites and agents with no code, put an AI workforce to work, and go from prompt to production. The wiring, not the hype."
* **Form:** unchanged mechanics. `Join free` button. Chrome-autofill dark-background fix in place.
* **Micro-trust:** `● JOIN 11,000+ PROFESSIONALS LEARNING THE STACK` (no "free forever" — the newsletter won't always be free; the 11,000+ is Pelumi's combined social following, ~11,020, not verified subscribers).

### S2 — The Stack (four pillars)
Section head (`WHAT YOU'LL LEARN` — "The whole stack. One piece at a time."), then four vertical, centre-aligned blocks (text above visual, hero rhythm). The `<h3>` is the branded pillar name; the search phrase lives in the body copy (see the PRD keyword table).

1. `01 / CONTENT` — **Content Engine.** Newsletter-UI card with content-format rows (EMAIL / BLOG / NEWSLETTER / THREAD), one orange-highlighted.
2. `02 / BUILD` — **Build It, Don't Learn It.** Terminal/prompt card relabelled `BUILD · 02.1` with a build-it prompt.
3. `03 / WORKFORCE` — **Your AI Workforce.** Tool-tile mock with role chips (OUTREACH / MEETINGS / RESEARCH / OPS).
4. `04 / PRODUCTION` — **Prompt to Production.** Output-tile mock (VIDEO / UGC AD / DECK / FLYER), reusing tool-tile styling.

All visuals stay pure CSS/SVG.

### S3 — Problem & Us-vs-Them
* **H2:** "Your feed is full of AI takes. None of them show the build."
* **Problem grid:** 3 carbon cards, blurred-post mocks, mono tags `HYPE` / `NO STEPS` / `AI SLOP`, one annotation line each.
* **Comparison:** "Typical AI content" (grey, muted-red X) vs. **"AI with Pelumi"** (white, orange checks). Four rows: takes vs. walkthroughs, hype vs. honest, cropped screenshots vs. full wiring, daily blast vs. when it matters.
* **Mid-CTA:** ICP one-liner above the second form: "For professionals done using AI like a search box, from someone who builds with it for a living."

### S4 — (removed)
No dedicated authority/bio section. Pelumi opted against it to keep the page tight. The section order matches the built page. The authority signal rides on the Person JSON-LD in the head and the founder card at the bottom — the founder card stays the page's one bright, high-contrast finale.

### S5 — Social Proof & FAQ
* Count in display size ("11,000+ professionals learning with us." — combined social following, placeholder until real subscriber data), 3 testimonial cards (placeholders, marked in comments), FAQ accordion with the open question in orange.
* FAQ fourth question: "Is this only for marketers?" — "No. It starts wherever you are." Directly answers the broadened audience. Q1 answer drops the "free forever" promise.

### S6 — Founder note, final CTA, footer
* Carbon panel, exact dayy.com layout (per Pelumi 2026-07-03): ~85vh tall on desktop, two-line sign-off top-left only (no body paragraph), wide white card bottom-right. Sign-off: grey "Have a project in mind?" — white "Let's talk about your AI journey."
* Founder card: name "Pelumi", role "Product Marketer", photo filling the card's right edge, `GET IN TOUCH` pill + `HI@AIWITHPELUMI.COM` on one row at the card bottom (contact email is hi@aiwithpelumi.com). On mobile the card stacks with the photo on top. Photo slot: image/pelumi-headshot.jpg (new studio portrait pending — swap the file, no markup change).
* Footer: exact aiwithremy.com arrangement — left-center: Silkscreen "AI WITH PELUMI" wordmark (small, ~2rem) with "© 2026 AI with Pelumi. All rights reserved." and "Vibe coded by yours truly with Claude Code" centered beneath; right: icon-only social tiles (Instagram, X, LinkedIn, YouTube — no Facebook, no Substack tile) above right-aligned POST ARCHIVE (→ Substack) / MANIFESTO (TODO) / CONTACT (mailto) links. No brand blurb, no visible email, no privacy-policy link (removed per Pelumi).

---

## 4. SEO / GEO build (shipped 2026-07-03)

1. **Metadata:** new title, meta description, canonical, OG + Twitter card, favicon/apple-touch-icon links (icon assets still TODO). (PRD 6.1.)
2. **JSON-LD:** Person (Pelumi, the citation entity), WebSite, Organization — all three in `<head>`, validated. No FAQPage schema — Google retired FAQ rich results May 2026.
3. **Keyword-shaped copy** in the four S2 pillar bodies. (PRD 6.3 table.)
4. **Root files:** `robots.txt` (allows GPTBot, ClaudeBot, PerplexityBot), `sitemap.xml`, `llms.txt` naming brand, person, four topics, newsletter URL.
5. **`og:image`:** branded 1200×630 card with headshot + "AI with Pelumi" — asset still TODO (referenced as /og-image.png).

Verify with Google Rich Results Test (valid Person + WebSite) and Lighthouse SEO 100 once hosted.

---

## 5. Interactions & motion budget (unchanged)

| Interaction | Implementation |
|---|---|
| Glass cursor | Keep exactly as built; `display:none` under 600px and `(hover:none)`. |
| Hero ASCII globe | Canvas, ~25fps slow spin; static frame under reduced motion. |
| Pipeline spine | IntersectionObserver — orange fill + node light. |
| Scroll reveals | `[data-reveal]` opacity + 20px rise, staggered. |
| FAQ accordion | Button + `grid-template-rows:0fr→1fr`, `aria-expanded`. |
| Reduced motion | `prefers-reduced-motion` renders everything in final state. |

The fourth pillar introduced no new motion — it reuses `[data-reveal]`.

---

## 6. Quality floor

Semantic landmarks; labeled inputs; `:focus-visible` orange outlines; keyboard accordion; `clamp()` type; comparison table linearizes; native-scroll testimonial slider; founder card button/email row stays tidy on mobile. Lighthouse: Performance 90+, Accessibility 100, SEO 100.

---

## 7. Open items (flagged, not blocking)

1. **ESP undecided.** Both forms post through one handler with an `ENDPOINT` placeholder in script.js; Substack likely. One-line change on confirm.
2. **Real assets:** real subscriber count (11,000+ is combined social following), real testimonials, Facebook URL, favicon.ico + apple-touch-icon.png, og-image.png card, logo.png, privacy policy page.
3. **Content roadmap:** one indexable post per pillar is the next build so the target phrases have somewhere to rank. Out of scope for this pass; the footer links should anticipate it.
