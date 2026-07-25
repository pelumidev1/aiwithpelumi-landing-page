# Product Requirements Document (PRD): AI with Pelumi

**Version:** 3.2 (updated 2026-07-18: monochrome rebrand — the orange accent is retired, the brand color is the logo's black ink; v3.1 described the live build, v3.0 was the repositioning spec)
**Prepared for:** UI/UX Designer & Front-End Web Developer
**Site:** aiwithpelumi.com
**Primary audience:** Any working professional who uses AI and suspects they're using it wrong. Secondary: marketers, operators, and solo founders leveling up.
**Primary conversion goal:** Free newsletter email sign-ups.
**Secondary goal:** Establish Pelumi Fatoye as the go-to authority for practical AI at work — the person who shows the build. This means the page has to sell the person, not just the list.

---

## 0. What changed from v2.0 (read this first)

The old page was a newsletter called "Prompt & Pipeline" aimed at marketers who want to build AI systems. That name is retired. The brand is now **AI with Pelumi** — full stop. The newsletter is just "the AI with Pelumi newsletter."

Three shifts drive every change below:

1. **From product to person.** The brand is now the person: AI with Pelumi. The authority signal is carried by the Person JSON-LD in the head and the founder card at the bottom — not a dedicated bio section (Pelumi opted against one to keep the page tight). The page still sells the person, just through structured data and the sign-off, not a wall of bio.
2. **From narrow to broad.** Audience widened from "marketers who build" to "any professional using AI." The copy leads with the universal frustration (using AI like a search box), then shows the marketer his own reflection deeper down the page.
3. **From vague topics to named pillars.** The newsletter now teaches a defined stack: build Claude skills, AI for social, AI lead generation, AI sequence automation. These aren't just content buckets — they're the search and AI-citation targets the whole site is optimized to own (Section 6).

Do not use the words "Prompt & Pipeline" anywhere. Anywhere.

### 0.1 What changed in v3.1 (built-page reality patch)

The page shipped and evolved past the v3.0 spec. Where this document and the code disagree, **the code wins** — this revision updates the spec to match. The big ones: the theme flipped from dark to pure white (2026-07-05/08), the glass cursor was removed entirely, the count is 12,000+, contact is pelumidev1@gmail.com, the ESP moved off Substack to a self-hosted API (2026-07-20), fonts changed, and the proof section is parked until real testimonials exist. Details are inline below.

---

## 1. Global UI/UX & Design System

The quiet, high-craft aesthetic stays — it signals "someone who builds," which is the whole positioning. Since 2026-07-05 it's executed on a **pure white ground**, not the original dark one.

### 1.1 Color Palette (live)

* **Ground:** Pure White (`#FFFFFF`). Cards are also white and read through 1px `#e0e0e0` borders.
* **Text ink:** Pure Black (`#000000`); headline chrome is a black metal gradient.
* **Primary Accent:** the logo's Black (`#000000`), with `rgba(0,0,0,0.07)` tint for washes (2026-07-18 rebrand to match the wordmark — the old orange `#e58848` must not come back). Token is `--accent` in `styles.css`.
* **Secondary/Muted Text:** Grey `#6a6a6a`; muted red `#c0564a` for comparison-table X marks (semantic, not brand).
* **The one dark anchor:** the founder section re-declares the dark token set locally (pure black panel) so the sign-off block stays the page's single dark moment.
* **Selection:** inverted — black ground, white text.
* **Discipline rule:** the accent carries weight through contrast, not hue — emphasis comes from full-ink black against grey/hairline surroundings, so keep grey and hairlines doing most of the talking.
* **Implementation note (do not "fix"):** `styles.css` keeps the original dark-build token names inverted — `--black` is the white ground, `--white` is the black ink. Components follow the flip automatically; renaming them would touch every rule for zero gain.

### 1.2 Interactions & Cursor

The custom fluid-glass cursor from the dark build is **removed** (2026-07-05). Native cursor everywhere; `script.js` cursor code is null-guarded and inert. Scroll reveals (`data-reveal` + IntersectionObserver) and the pipeline spine remain. Retro press/release click sounds on buttons and social tiles (2026-07-09). Respect `prefers-reduced-motion` throughout.

### 1.3 Responsive Grid & Breakpoints

* **Mobile (< 600px):** 6-column grid, 1.5rem gap, 2rem outer margins.
* **Tablet (601–1024px):** 12-column grid, 1.5rem gap, 2rem margins.
* **Desktop (> 1024px):** 24-column grid, 2rem gap, 4rem margins, content max-width 1440px centered.

---

## 2. Page Architecture & Section Specifications

Top to bottom. The pipeline spine (1px center line with diamond nodes that fill to solid ink on scroll) stays between sections — it still reads as "systems," which fits. Live section order: Hero → Stack (four pillars) → Proof (currently parked/hidden) → Problem & Us-vs-Them → FAQ → Founder → Footer.

### Header (fixed, minimal)

* Wordmark: the real **AI with Pelumi logo lockup** (`logo.png`, angular A-mark, shipped 2026-07-08) top-left, replacing the earlier mono-caps text wordmark. No "by" byline — the brand and the person are the same thing now.
* No nav links. Nothing competes with the CTA.

### Section 1 — Hero

**Purpose:** Hook the widest reader in one line, then convert.

* **Layout:** vertical, center-aligned, with a code-drawn **ASCII globe** rendered on a `.hero-globe` canvas behind the headline (recolored for the white theme in `script.js`).
* **Eyebrow pill (glass):** `AI WITH PELUMI · WEEKLY`.
* **Headline (H1):** Lead with the universal frustration, not the marketer-specific one.
  Primary: **"You're not using AI wrong. Nobody showed you the stack."**
  (Alt to A/B: "Learn to actually build with AI. From someone who does it for a living.")
* **Sub:** "Every week I show you the practical AI stack — turn one idea into a content engine, build websites and agents with no code, put an AI workforce to work, and go from prompt to production. The wiring, not the hype."
* **Inline email form:** input left, black `Join free` pill (white text) right (desktop); stacked on mobile. One rounded container.
* **Micro-trust:** `● JOIN 12,000+ PROFESSIONALS LEARNING THE STACK` — no "free forever" (the newsletter won't always be free). The 12,000+ figure is Pelumi's combined following across Facebook, Instagram, X, LinkedIn, YouTube, and Substack, not verified subscribers; marked as such in a code comment.

### Section 2 — The Stack (the four pillars)

**Purpose:** This replaces the old three-move "what lands in your inbox" section. It's now the explicit promise of what the reader will learn, and it's the section carrying the money keywords.

* **Section head:** eyebrow `WHAT YOU'LL LEARN` — H2 "The whole stack. One piece at a time."
* **Four blocks** (was three), each a named pillar with a mono stage label, a branded `<h3>`, two lines of plain copy, and a CSS/SVG visual:

  1. `01 / CONTENT` — **Content Engine.** Turn one idea into emails, blogs, and newsletters that keep working for you. Visual: the newsletter-UI card, re-labeled with content-format rows.
  2. `02 / BUILD` — **Build It, Don't Learn It.** Create websites, AI agents, and automations without writing code. Visual: the prompt/terminal card, re-labeled.
  3. `03 / WORKFORCE` — **Your AI Workforce.** Build AI assistants that handle outreach, meetings, social, research, and daily operations. Visual: tool-tile mock with role chips.
  4. `04 / PRODUCTION` — **Prompt to Production.** Turn simple prompts into videos, UGC ads, presentations, and flyers. Visual: an output-tile mock.

* The `<h3>` is the branded pillar name (it's memorable and shareable — that's the point). The matching search phrase lives in the body copy and the keyword table in Section 6, so the section is both the pitch and the SEO surface.

### Section 3 — Proof (PARKED)

* **Count** in display size: "12,000+ professionals learning with us." (combined social following, not verified subscribers), followed by the **wall-of-love testimonial marquee** (two counter-scrolling CSS marquee rows, hover pauses, reduced-motion falls back to horizontal scroll).
* **Status: hidden since 2026-07-08** (`hidden` attr + inline `display:none`, both marked PARKED in index.html) until real case studies/testimonials replace the placeholders. **Do not delete the markup.** The hero micro-trust line still shows 12,000+.

### Section 4 — The Problem & Us vs. Them

**Purpose:** Agitate the "AI like a search box" pain and separate this from the noise.

* **H2 (live copy):** "Most newsletters are generic."
* **Problem grid:** 3 cards, mocked blurred posts, mono tags `HYPE` / `NO STEPS` / `AI SLOP`, one annotation each.
* **Comparison table:** "Typical AI content" (grey text, muted-red X) vs. **"AI with Pelumi"** (black text, black checks). Four rows: takes-vs-walkthroughs, hype-vs-honest, cropped-screenshots-vs-full-wiring, daily-blast-vs-when-it-matters.
* **Mid-page CTA:** ICP one-liner above a second email form: "For professionals done using AI like a search box, from someone who builds with it for a living."

### Section 5 — FAQ

* **FAQ accordion**, 4 items, open state signalled by the plus→minus icon (no colour flip since the monochrome rebrand):
  1. How much does it cost? (Free to join right now; say plainly if a paid tier comes later. No "free forever" promise.)
  2. How often will you email me? (Weekly, when there's something real.)
  3. Do I need to know how to code? (No — that's the point.)
  4. Is this only for marketers? (No. It starts wherever you are.) — answers the broadened audience directly.

### Section 6 (page section) — Founder Note, Final CTA & Footer

* Full-width **black panel** (the page's one dark anchor; brushed-metal treatment), dayy.com layout: two-line sign-off top-left, floating white card bottom-right. Sign-off: grey "Have a project in mind?" — white "Let's talk about your AI journey."
* Floating light card (the one bright element): name "Pelumi", role "Product Marketer", real headshot (`image/pelumi-headshot.jpg`), `GET IN TOUCH` mailto pill with **pelumidev1@gmail.com** on the same row beside the button (wraps below on mobile).
* **Footer (light, aiwithremy-style):** small Silkscreen wordmark in molten ink (graphite-to-black gradient) + © 2026 AI with Pelumi + "Vibe coded by yours truly with Claude Code" left-center; icon-only social tiles **Instagram / X / LinkedIn / YouTube** (Facebook and Substack tiles deliberately dropped); right-aligned links **POST ARCHIVE** (→ Substack) / **PRIVACY** (`/privacy.html`) / **CONTACT** (mailto). MANIFESTO was removed on 2026-07-26 — never had a target. The earlier "no privacy-policy link, per Pelumi" call was reversed on 2026-07-20 ahead of the marketing launch — collecting emails, IPs and user agents at scale made one necessary.

---

## 3. Technical & Asset Requirements

### 3.1 Integrations

| Requirement | Detail |
| --- | --- |
| **ESP (self-hosted since 2026-07-20)** | **Own API — `POST https://api.aiwithpelumi.com/api/newsletter/subscribe`** (`6afacf0`, endpoint renamed off the private OS domain on 2026-07-25, `ec6a562`). Postgres is the source of truth for subscribers; Resend mirrors the audience and sends the welcome email. Forms POST in the background and render success inline — no redirect. **Substack is retired as the ESP**; do not restore the prefilled `/subscribe?email=…` redirect. `substack.com/@pelumidev` stays as the POST ARCHIVE link and in `sameAs` only. Never point anything at the deleted aiwithpelumi.substack.com, and never expose the private OS domain (see CLAUDE.md). |
| **Icons** | SVG only. Checkmarks, X marks, social logos (X, Instagram, LinkedIn, YouTube). |
| **Fonts (live)** | **Inter** (headlines) + **Geist Mono** (body/labels) + **Silkscreen** (footer wordmark), all via Google Fonts. |
| **Logo/favicon** | `logo.png` lockup in header; `favicon.ico` (A-mark) + `apple-touch-icon.png` shipped 2026-07-08. |
| **Headshot** | Shipped: `image/pelumi-headshot.jpg` (studio portrait, watermark excluded). |

### 3.2 Mobile Optimization Checklist

* Hero form stacks (input top, full-width button); globe placement fixed for mobile (2026-07-09).
* Comparison table linearizes to a vertical list.
* Founder card and its button/email row stay tidy on narrow screens (email can wrap below the button on mobile).
* All type scales via `clamp()` so no headline breaks awkwardly.

---

## 4. Voice & Copy Rules

Every string on the page follows Pelumi's anti-AI style. Enforce these:

* No banned words: delve, intricate, foster, underscore, pivotal, showcase, realm, landscape, leverage (as a verb), crucial, comprehensive, nuanced, and the rest of the list.
* No "not only… but also," no rule-of-three padding, no "it's not X, it's Y."
* First person. "I show you," not "readers will discover."
* Short lines that hit. Uneven pacing. Opinionated. If a line could be on any AI newsletter's page, cut it.
* Lead with the reader's frustration, then the outcome. Never lead with features.

---

## 5. Quality Floor

Semantic landmarks; labeled inputs; `:focus-visible` black outlines; keyboard-operable accordion; `clamp()` type; comparison table linearizes on mobile; native-scroll testimonial marquee with reduced-motion fallback. Lighthouse targets: Performance 90+, Accessibility 100, SEO 100.

---

## 6. SEO & GEO Specification

The goal is to get "AI with Pelumi" and Pelumi Fatoye cited when someone searches — or asks ChatGPT, Perplexity, or Google's AI Overview — how to do the four things the newsletter teaches.

### 6.1 On-page metadata

* **Title tag:** `AI with Pelumi — Learn to build with AI, from someone who does` (~60 chars, brand + benefit, no "Prompt & Pipeline").
* **Meta description:** Benefit + the four pillars + free newsletter CTA, ~155 chars.
* **Canonical:** `https://aiwithpelumi.com/`.
* **Open Graph + Twitter card:** title, description, `og:image` (a branded 1200×630 card — **still TODO as of 2026-07-09**; referenced in meta but the file doesn't exist yet), `og:type=website`, `twitter:card=summary_large_image`.
* **Favicon + apple-touch-icon:** shipped.
* **Lang, charset, viewport:** present.

### 6.2 Structured data (JSON-LD) — shipped, one placeholder open

Three blocks in `<head>`:

1. **Person** — Pelumi Fatoye: `name`, `jobTitle` (Product Marketer), `url`, `image`, `sameAs` (Instagram, X, LinkedIn, YouTube, Substack profile substack.com/@pelumidev — no Facebook, Pelumi has none), `knowsAbout` (Artificial Intelligence, Claude, Prompt Engineering, No-Code Development, AI Agents, Content Marketing, AI Video Generation, Marketing Automation).
2. **WebSite** — name "AI with Pelumi", `url`, and `publisher` pointing to the Person.
3. **Organization / Brand** — "AI with Pelumi", logo, `sameAs`.

Note: do **not** add FAQPage schema for SERP benefit — Google retired FAQ rich results in May 2026. Keep the visible FAQ for users; skip the markup.

### 6.3 Heading & keyword architecture

One `<h1>` (the hero). The four pillar `<h3>`s are branded names; the search phrases they target live in each block's body copy, written the way people actually search and prompt:

| Pillar (h3) | Primary target phrase | Secondary / GEO phrasing |
| --- | --- | --- |
| Content Engine | how to repurpose content with AI | AI content repurposing, turn one idea into content with AI |
| Build It, Don't Learn It | how to build a website with AI no code | build an AI agent no code, no-code AI automation |
| Your AI Workforce | how to build an AI assistant | AI agents for work, AI for outreach and research |
| Prompt to Production | how to make videos with AI | AI UGC ads, prompt to video, AI presentations and flyers |

Umbrella phrase the brand should own across the page and every post: **"how a non-engineer uses AI to run real work."** Work a natural version of it into the hero sub and the authority bio.

### 6.4 GEO (getting cited by AI answer engines)

* **Answer-shaped copy:** each pillar block should state the outcome plainly enough that an AI can quote it as a one-line answer. Write the first sentence of each pillar as if it were the snippet.
* **Entity clarity:** the Person schema + a consistent "Pelumi Fatoye, product marketer who builds with AI" description across site, bio, and socials teaches answer engines who to attribute.
* **`llms.txt`:** shipped — names the brand, the person, the four pillars, and the newsletter URL.
* **Do not block AI crawlers** in robots.txt. Allow GPTBot, ClaudeBot, PerplexityBot — the point is to be cited.
* **Sitemap + robots.txt:** shipped.

### 6.5 Content roadmap the page should anticipate

The site is one page today. The authority play needs indexable posts, one per pillar, each targeting its phrase from the table above (drafts in progress at `content/pillar-posts/` as of 2026-07-09). The footer links POST ARCHIVE to the Substack so post URLs get discovered.

---

## 7. Remaining work (everything else in the original build order is shipped)

1. ~~`og-image.png` (1200×630)~~ — shipped 2026-07-20 (`03c53f2`).
2. ~~MANIFESTO footer link~~ — **removed 2026-07-26.** It came in with the aiwithremy-style footer arrangement (`72e2fbe`) and never had a target or an owner; Pelumi didn't recognise it, so the link is gone rather than pointed somewhere invented.
3. ~~Facebook `sameAs` placeholder~~ — **removed 2026-07-26.** Pelumi has no Facebook profile to link, so both the Person and Organization `sameAs` entries were dropped. Don't re-add a Facebook slot.
4. Un-park the proof section once real testimonials exist.
5. Lighthouse + Rich Results verification pass on the final page; confirm SEO 100 and valid Person/WebSite schema.
