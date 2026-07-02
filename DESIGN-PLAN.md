# Prompt & Pipeline — Landing Page Design Plan

**Working from:** PRD.md v2.0 + ideal-customer.md + Website Design Reference folder
**Deliverable:** Single static page (`index.html` + `styles.css` + `script.js`), no build step, ready to wire to an ESP.

---

## 1. What each reference actually gives us

| Reference | What we take | What we leave |
|---|---|---|
| **fluid.glass** (HTML source) | The glass cursor recipe verbatim: `backdrop-filter: blur(2rem)`, `linear-gradient(180deg,#ffffff26,#fff3)`, lerp trailing, fade in/out, killed on touch/<600px. Also the type system idea: one grotesk for everything + one mono for uppercase micro-labels (they use Aeonik Pro + Aeonik Mono). | Their cream/grey palette, their WebGL scene. |
| **behold.cam** | Centre-aligned vertical layout skeleton only (their HTML is a JS shell — nothing else to mine). | All visual design, per the brief. |
| **shopify.vc** (screenshot + HTML) | Header aesthetic: quiet wordmark top-left, generous whitespace, one huge confident headline, a single small floating info card. | Pink/lilac palette, ASCII globe. |
| **semaloop.com** (screenshot + HTML) | Section 2 grammar: full-bleed rounded panel, mono uppercase prompt card with a thin connector line and node dots, numbered step label (`01a`) + short heading + two-line body. This is the model for our "pipeline" visuals. | Green palette. |
| **aiwithremy.com** (screenshot) | Hero conversion pattern: eyebrow pill → 2-line headline → 2-line sub → inline email + button → mono micro-trust line with a status dot → newsletter mockup peeking from below. | Light theme, pixel display face. |
| **dayy.com** (`inspo.jpg`) | Section 5: near-black panel, two-line sign-off (grey line, then white line), floating white founder card with headshot, pill "GET IN TOUCH" button, mono email address. | Nothing — we replicate the structure in our palette. |

---

## 2. Design tokens

### Color (PRD-mandated, named for use)

| Token | Value | Use |
|---|---|---|
| `--black` | `#000000` | Page background |
| `--carbon` | `#0b1012` | Cards, panels, problem grid |
| `--line` | `#212325` | Borders, dividers, spine |
| `--white` | `#ffffff` | Headings + body |
| `--grey` | `#99a1a5` | Muted/secondary text |
| `--orange` | `#e58848` | The only accent: buttons, checkmarks, active FAQ, highlights, spine pulse |
| `--orange-tint` | `rgba(229,136,72,.12)` | Glows, tag backgrounds |
| `--red-muted` | `#c0564a` | "Them" column X icons only (PRD asks for red X's) |
| Glass | `blur(2rem)` + `linear-gradient(180deg,#ffffff26,#fff3)` | Cursor, eyebrow pill |

Discipline rule: orange appears in at most **one** element per viewport-height of scroll. Everything else is white/grey on black.

### Typography

- **Display + body: General Sans** (Fontshare, free) — geometric grotesk, the closest free cousin of fluid.glass's Aeonik Pro. Weights 400/500/600. Headline tracking −0.03em.
- **Utility mono: JetBrains Mono** — every eyebrow, tag, stage number, micro-trust line, footer meta, and the prompt-card graphics. Uppercase, `letter-spacing:.08em`, ~12–13px. This is the voice of the "pipeline" — the page's technical register lives entirely in this face.
- Scale via `clamp()` (PRD mobile checklist): `h1 clamp(2.4rem, 1rem + 5.5vw, 4.6rem)`, `h2 clamp(1.8rem, 1rem + 3vw, 3rem)`, body 1.0625rem/1.6.

Deliberately **not** Inter-for-everything: the mono/grotesk split is the brief-specific choice; Inter alone is the default anyone would ship.

### Grid (strict, per PRD 1.3)

- `<600px`: 6 columns, 1.5rem gap, 2rem outer margins
- `601–1024px`: 12 columns, 1.5rem gap, 2rem margins
- `>1024px`: 24 columns, 2rem gap, 4rem margins, content max-width 1440px centred

One `.grid` utility; every section places children by column span.

### Signature element — the pipeline spine

A 1px vertical line runs down the page centre **between** sections, with a small diamond node at each junction (directly echoing semaloop's connector line + scroll nodes). As each junction scrolls into view, an orange fill runs down the segment and lights the node. It literalises the brand name — content flows down the pipeline from hero to footer — and it's the one place motion is spent generously. Everything else stays quiet.

This is the aesthetic risk: a persistent structural motif instead of scattered per-section decoration. Justified because the product *is* a pipeline (signal in → stack → leverage out), so the numbering and plumbing imagery encode real sequence, not decoration.

---

## 3. Section-by-section build spec

### Header (fixed, minimal — shopify.vc quietness)
`PROMPT & PIPELINE` wordmark top-left in mono caps; `by AI with Pelumi` in grey. No nav links (PRD: don't distract from CTA).

### S1 — Hero (behold vertical centre + aiwithremy conversion stack)
Centre-aligned column: glass eyebrow pill (`AI WITH PELUMI · WEEKLY`) → H1 → sub → inline pill form → mono micro-trust with pulsing orange dot.

- **H1:** "You know marketing. Now build the systems that run it." — taken verbatim from the ICP doc's Segment-1 landing line.
- **Sub:** "Weekly AI workflows, playbooks, and copy-paste prompts for marketers and operators who'd rather build the system than outsource it."
- **Form:** one rounded-rect container — input left, orange `Join free` button right (desktop); stacked input-top/full-width-button (mobile), per PRD.
- **Micro-trust:** `● JOIN 1,200+ SOLOPRENEURS & BUILDERS · FREE FOREVER` (count is a placeholder to update).

### S2 — Visual workflow highlight (semaloop grammar, our palette)
Section head, then 3 alternating text/visual blocks. Stage labels in mono are a real sequence — the pipeline:

1. **`01 / SIGNAL` — News that matters.** Copy about cutting the noise. Visual: dark newsletter-UI mockup (browser-chrome card, subject line, text rows, one orange-highlighted line).
2. **`02 / STACK` — Tools worth trying.** Copy about staying lean. Visual: tool tiles with mono verdict chips (`KEEP` / `TRY` / `SKIP` — skip greyed).
3. **`03 / LEVERAGE` — Copy-paste prompts.** Copy about business leverage. Visual: terminal/prompt card in mono with blinking orange caret and a `COPY` chip — the semaloop prompt card, re-skinned carbon + orange.

All visuals are pure CSS/SVG (no image assets exist yet), so they ship crisp at every density and are easy to swap later.

### S3 — Problem & Us-vs-Them
- H2: "Your inbox is already full. Most of it says nothing."
- **Problem grid:** 3 `#0b1012` cards, each a *mocked* blurred newsletter (blurred text bars — no real competitor screenshots needed) with an orange-bordered mono tag: `TOO BROAD` / `IRRELEVANT` / `AI SLOP`, plus one annotation line.
- **Comparison table:** side-by-side desktop, stacked mobile. Left "Typical AI newsletters": grey text, muted-red X. Right "Prompt & Pipeline": white text, orange checkmarks, carbon card with orange border glow. Four rows (links-vs-context, hype-vs-workflows, click-farming-vs-builder, daily-blast-vs-when-it-matters — the last one comes straight from the ICP "who it's NOT for" list).
- **Mid-page CTA:** the ICP one-liner sits directly above the second email form, as the ICP doc instructs: *"For marketers and operators who are done outsourcing the technical side of growth."*

### S4 — Social proof & FAQ
- Count in display size: "1,200+ readers build with us." (placeholder).
- 3 testimonial cards — grid desktop, scroll-snap slider mobile. **Placeholder quotes, clearly marked in comments — must be replaced with real ones before launch.**
- FAQ: 4 items (cost / frequency / "do I need to code?" / unsubscribe) as an accessible button-accordion; open question text turns `#e58848` per PRD.

### S5 — Founder note, final CTA, footer (dayy.com structure)
- Full-width carbon panel. Two-line sign-off: grey "Have a workflow you want torn down?" → white "Let's talk about what you're building."
- Floating white card (the one light element on the page — high contrast finale): headshot placeholder, "Pelumi Fatoye — Founder, AI with Pelumi", black pill **GET IN TOUCH** (`mailto:`) + mono email.
- Footer: three raw-text columns — contact, socials (Instagram, Twitter, Substack, LinkedIn — SVG icons), legal (© 2026 + Privacy Policy).

---

## 4. Interactions & motion budget

| Interaction | Implementation |
|---|---|
| Glass cursor | Fixed div, PRD's exact glass recipe; rAF lerp (factor ≈ .14); scales up over links/inputs/buttons; fades in on first mousemove, out on `mouseleave` of the document; `display:none` under 600px and on `(hover:none)` touch devices |
| Pipeline spine | IntersectionObserver adds `.in-view` → orange fill scaleY animation + node lights |
| Scroll reveals | Single `[data-reveal]` pattern, opacity + 20px rise, staggered by CSS delay |
| FAQ accordion | Button + `grid-template-rows: 0fr→1fr` height animation, `aria-expanded` |
| Prompt caret | CSS blink, part of the S3 terminal card |
| Reduced motion | `prefers-reduced-motion: reduce` kills lerp trailing, reveals, spine animation — everything renders in final state |

No parallax, no marquees, no per-letter animation. The spine is the one orchestrated moment.

## 5. Quality floor

Semantic landmarks; labelled inputs (`sr-only` labels); `:focus-visible` orange outlines; keyboard-operable accordion; `clamp()` type so the H1 never breaks awkwardly on narrow phones (PRD checklist); comparison table linearises on mobile; testimonial slider uses native scroll.

## 6. Open items (flagged, not blocking)

1. **ESP undecided** (PRD 3.1). Both forms submit through one JS handler with a `data-endpoint` placeholder and a success state. The ICP doc mentions Substack analytics, so Substack is the likely target — wiring is a one-line change once confirmed.
2. **Real assets pending:** headshot, real subscriber count, real testimonials, social URLs, privacy policy page. All marked with `<!-- TODO -->` in the HTML.
3. Two reference PNGs in the folder are 0-byte empty files (aiwithremy / fluid-glass full-page captures) — the JPGs cover the same ground, so nothing blocked.

## 7. Build order

1. Tokens, fonts, grid utility, base styles
2. Cursor + spine + reveal JS scaffolding
3. Hero → S2 pillars → S3 problem/compare/mid-CTA → S4 proof/FAQ → S5 founder/footer
4. Responsive pass at 375 / 768 / 1280 / 1600
5. Accessibility + reduced-motion pass
