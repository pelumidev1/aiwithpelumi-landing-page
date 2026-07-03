# Product Requirements Document (PRD): AI with Pelumi

**Version:** 3.0 (Repositioned as authority hub + newsletter; SEO and GEO baked in)
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

---

## 1. Global UI/UX & Design System

The dark, quiet, high-craft aesthetic stays. It signals "someone who builds," which is the whole positioning. Keep it.

### 1.1 Color Palette

* **Background:** Deep Black (`#000000`) to Muted Black (`#0b1012`).
* **Primary Accent:** Light Orange (`#e58848`).
* **Typography:** Pure White (`#ffffff`) for headings and body.
* **Secondary/Muted Text:** Muted Grey (`#99a1a5`); borders/dividers `#212325`.
* **Discipline rule:** orange appears in at most one element per viewport-height of scroll.

### 1.2 Interactions & Custom Cursor

Keep the fluid glass cursor exactly as built: `backdrop-filter: blur(2rem)`, `linear-gradient(180deg,#ffffff26,#fff3)`, lerp trailing, fade in on load, fade out on mouse-leave. Disabled on touch and under 600px (`display:none` on `.is-touch`). No change.

### 1.3 Responsive Grid & Breakpoints

* **Mobile (< 600px):** 6-column grid, 1.5rem gap, 2rem outer margins.
* **Tablet (601–1024px):** 12-column grid, 1.5rem gap, 2rem margins.
* **Desktop (> 1024px):** 24-column grid, 2rem gap, 4rem margins, content max-width 1440px centered.

---

## 2. Page Architecture & Section Specifications

Top to bottom. The pipeline spine (1px center line with diamond nodes that light orange on scroll) stays between sections — it still reads as "systems," which fits. The section order is unchanged from the built page (no new sections added); what changes is copy, the fourth pillar, the SEO head, and the founder-card fields.

### Header (fixed, minimal)

* Wordmark: **`AI WITH PELUMI`** in mono caps, top-left. No "by" byline — the brand and the person are the same thing now.
* No nav links. Nothing competes with the CTA.

### Section 1 — Hero

**Purpose:** Hook the widest reader in one line, then convert.

* **Background:** Solid black.
* **Eyebrow pill (glass):** `AI WITH PELUMI · WEEKLY`.
* **Headline (H1):** Lead with the universal frustration, not the marketer-specific one.
  Primary: **"You're not using AI wrong. Nobody showed you the stack."**
  (Alt to A/B: "Learn to actually build with AI. From someone who does it for a living.")
* **Sub:** "Every week I show you the practical AI stack — turn one idea into a content engine, build websites and agents with no code, put an AI workforce to work, and go from prompt to production. The wiring, not the hype."
* **Inline email form:** input left, orange `Join free` button right (desktop); stacked on mobile. One rounded container.
* **Micro-trust:** `● JOIN 11,000+ PROFESSIONALS LEARNING THE STACK` — no "free forever" (the newsletter won't always be free). The 11,000+ figure is Pelumi's combined following across Facebook, Instagram, X, LinkedIn, YouTube, and Substack (~11,020), not verified subscribers; mark it as such in a code comment.

### Section 2 — The Stack (the four pillars)

**Purpose:** This replaces the old three-move "what lands in your inbox" section. It's now the explicit promise of what the reader will learn, and it's the section carrying the money keywords.

* **Section head:** eyebrow `WHAT YOU'LL LEARN` — H2 "The whole stack. One piece at a time."
* **Four blocks** (was three), each a named pillar with a mono stage label, a branded `<h3>`, two lines of plain copy, and a CSS/SVG visual:

  1. `01 / CONTENT` — **Content Engine.** Turn one idea into emails, blogs, and newsletters that keep working for you. Visual: the newsletter-UI card, re-labeled with content-format rows.
  2. `02 / BUILD` — **Build It, Don't Learn It.** Create websites, AI agents, and automations without writing code. Visual: the prompt/terminal card, re-labeled.
  3. `03 / WORKFORCE` — **Your AI Workforce.** Build AI assistants that handle outreach, meetings, social, research, and daily operations. Visual: tool-tile mock with role chips.
  4. `04 / PRODUCTION` — **Prompt to Production.** Turn simple prompts into videos, UGC ads, presentations, and flyers. Visual: an output-tile mock.

* The `<h3>` is the branded pillar name (it's memorable and shareable — that's the point). The matching search phrase lives in the body copy and the keyword table in Section 6, so the section is both the pitch and the SEO surface.

### Section 3 — The Problem & Us vs. Them

**Purpose:** Agitate the "AI like a search box" pain and separate this from the noise.

* **H2:** "Your feed is full of AI takes. None of them show the build."
* **Problem grid:** 3 dark cards, mocked blurred posts, mono tags `HYPE` / `NO STEPS` / `AI SLOP`, one annotation each.
* **Comparison table:** "Typical AI content" (grey text, muted-red X) vs. **"AI with Pelumi"** (white text, orange checks). Four rows: takes-vs-walkthroughs, hype-vs-honest, cropped-screenshots-vs-full-wiring, daily-blast-vs-when-it-matters.
* **Mid-page CTA:** ICP one-liner above a second email form: "For professionals done using AI like a search box, from someone who builds with it for a living."

### Section 4 — (removed)

No visible authority/bio section. Pelumi decided against a "who's teaching this" block — the page keeps its original five-section flow. The authority and E-E-A-T signal is carried by the Person JSON-LD in the head (Section 6.2) and the founder card at the bottom of the page, not by a dedicated bio section. Keep the layout as built.

### Section 5 — Social Proof & FAQ

* **Count** in display size: "11,000+ professionals learning the stack." (Pelumi's combined social following ~11,020; not verified subscribers.)
* **3 testimonials**, grid on desktop / slider on mobile. Clearly marked placeholders in comments — replace before launch.
* **FAQ accordion**, 4 items, open question turns orange:
  1. How much does it cost? (Free to join right now; say plainly if a paid tier comes later. No "free forever" promise.)
  2. How often will you email me? (Weekly, when there's something real.)
  3. Do I need to know how to code? (No — that's the point.)
  4. Is this only for marketers? (No. It starts wherever you are.) — new question, answers the broadened audience directly.

### Section 6 (page section) — Founder Note, Final CTA & Footer

* Full-width carbon panel, dayy.com layout: two-line sign-off top-left, floating white card bottom-right. Sign-off: grey "Have a project in mind?" — white "Let's talk about your AI journey."
* Note in first person: "I write every issue myself and run every workflow I teach. No ghostwriters, no slop, no affiliate quotas. If an issue wastes your time, unsubscribe — that's the deal."
* Floating light card (the one bright element): name "Pelumi", role "Product Marketer", then `GET IN TOUCH` mailto pill with the email `pelumi@aiwithpelumi.com` on the same row beside the button. Keep the card's image slot (PF monogram or a real headshot).
* **Footer:** three columns — brand blurb, socials (all six: Facebook, Instagram, X, LinkedIn, YouTube, Substack, with real URLs), legal (© 2026 AI with Pelumi + Privacy Policy). Replace all "Prompt & Pipeline" strings.

---

## 3. Technical & Asset Requirements

### 3.1 Integrations

| Requirement | Detail |
| --- | --- |
| **ESP** | Confirm Substack vs. Beehiiv vs. ConvertKit; both forms post through one JS handler with a `data-endpoint`. One-line change once confirmed. |
| **Icons** | SVG only. Checkmarks, X marks, social logos (X, Instagram, LinkedIn, Substack). |
| **Fonts** | General Sans (display/body) + JetBrains Mono (labels). No change. |
| **Headshot** | Optional — the founder card can keep the `PF` monogram. If a real photo is used, IMG_9807.jpg in ABOUT ME may be the source; optimize to WebP. |

### 3.2 Mobile Optimization Checklist

* Glass cursor disabled under 600px and on touch.
* Hero form stacks (input top, full-width button).
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

Semantic landmarks; labeled inputs; `:focus-visible` orange outlines; keyboard-operable accordion; `clamp()` type; comparison table linearizes on mobile; native-scroll testimonial slider. Lighthouse targets: Performance 90+, Accessibility 100, SEO 100.

---

## 6. SEO & GEO Specification (NEW — the reason this rewrite exists)

The old page had almost no SEO surface: a branded title, a meta description, no structured data, no social cards. For an authority play that's a wasted asset. The goal is to get "AI with Pelumi" and Pelumi Fatoye cited when someone searches — or asks ChatGPT, Perplexity, or Google's AI Overview — how to do the four things the newsletter teaches. Below is what the build must include. The exact strings for Claude Code are in the companion prompt.

### 6.1 On-page metadata

* **Title tag:** `AI with Pelumi — Learn to build with AI, from someone who does` (~60 chars, brand + benefit, no "Prompt & Pipeline").
* **Meta description:** Benefit + the four pillars + free newsletter CTA, ~155 chars.
* **Canonical:** `https://aiwithpelumi.com/`.
* **Open Graph + Twitter card:** title, description, `og:image` (a branded 1200×630 card with the headshot and "AI with Pelumi"), `og:type=website`, `twitter:card=summary_large_image`.
* **Favicon + apple-touch-icon.**
* **Lang, charset, viewport:** already present, keep.

### 6.2 Structured data (JSON-LD) — the biggest single win

Three blocks in `<head>`:

1. **Person** — Pelumi Fatoye: `name`, `jobTitle` (Product Marketer), `url`, `image`, `sameAs` (Facebook, Instagram, X, LinkedIn, YouTube, Substack — all six), `knowsAbout` (Artificial Intelligence, Claude, Prompt Engineering, No-Code Development, AI Agents, Content Marketing, AI Video Generation, Marketing Automation). This is the entity that earns citations, so list every profile — it's how answer engines connect the accounts to one person.
2. **WebSite** — name "AI with Pelumi", `url`, and `publisher` pointing to the Person.
3. **Organization / Brand** — "AI with Pelumi", logo, `sameAs`. Optional but cheap.

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
* **`llms.txt`:** add a root `llms.txt` naming the brand, the person, the four pillars (Content Engine, Build It Don't Learn It, Your AI Workforce, Prompt to Production), and the newsletter URL. Cheap, and increasingly read by AI crawlers.
* **Do not block AI crawlers** in robots.txt. Allow GPTBot, ClaudeBot, PerplexityBot — the point is to be cited.
* **Sitemap + robots.txt:** ship both, even for one page. Room to grow as posts get their own URLs.

### 6.5 Content roadmap the page should anticipate

The site is one page today. The authority play needs indexable posts, one per pillar, each targeting its phrase from the table above. The footer should link to the newsletter archive so those post URLs get discovered. Flag this as the next build, not this one.

---

## 7. Build order

1. Rebrand pass: strip every "Prompt & Pipeline" string — "AI with Pelumi".
2. Metadata + JSON-LD + OG/Twitter + favicon + llms.txt + robots + sitemap.
3. Hero and Stack copy (new headline, four pillars with keyword-shaped H3s).
4. Founder section: new sign-off ("Have a project in mind? / Let's talk about your AI journey."), card fields (name "Pelumi", role "Product Marketer", email beside the button).
5. Problem/compare/mid-CTA copy swap; FAQ fourth question; footer/socials.
6. Responsive + accessibility + reduced-motion pass.
7. Lighthouse + Rich Results test; confirm SEO 100 and valid Person/WebSite schema.
