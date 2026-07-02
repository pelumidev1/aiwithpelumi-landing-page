# Product Requirements Document (PRD):  AI With Pelumi Newsletter Landing Page

**Version:** 2.0 (Iterated with Visual & Interactive Constraints)
**Prepared for:** UI/UX Designer & Front-End Web Developer
**Target Audience:** Solopreneurs and builders looking for lean AI workflows and business leverage.
**Primary Conversion Goal:** Drive free newsletter email sign-ups.

---

## 1. Global UI/UX & Design System

Before building individual sections, the developer must establish the global design system. This page relies heavily on a dark mode aesthetic, smooth physics, and specific typography.

### 1.1 Color Palette

* **Background:** Deep Black (`#000000`) to Muted Black (`#0b1012`).
* **Primary Accent:** Light Orange (`#e58848`).
* **Typography (Headings & Body):** Pure White (`#ffffff`).
* **Secondary/Muted Text:** Muted Greys (e.g., `#212325` for borders/dividers or low-contrast text).

### 1.2 Interactions & Custom Cursor (Inspiration: fluid.glass)

The website must feature a fluid, glass-like custom cursor that interacts with links and inputs.

* **Desktop Cursor:** A custom trailing element using a backdrop filter to create a glass effect.
* **CSS Requirements:** Implement using `backdrop-filter: blur(2rem)` and a subtle linear gradient background (e.g., `linear-gradient(180deg, #ffffff26, #fff3)`).
* **Behavior:** The cursor should smoothly trail the user's actual mouse position using easing/lerp functions. It must fade in on load (`opacity: 1`) and fade out when the mouse leaves the viewport.
* **Mobile Behavior:** The custom cursor must be completely disabled on touch devices and screens under 600px (`display: none` for `.is-touch`).

### 1.3 Responsive Grid & Breakpoints

To ensure the page looks beautiful and flawless across all devices, the developer must use a strict grid system.

* **Mobile (< 600px):** 6-column grid structure with a 1.5rem gap and 2rem outer margins.
* **Tablet (601px – 1024px):** 12-column grid structure to bridge the gap between phone and laptop.
* **Laptop/Desktop (> 1024px):** 24-column grid structure with a 2rem gap and 4rem outer margins.

---

## 2. Page Architecture & Section Specifications

Sections are listed from top to bottom in the exact order they will appear on the single-page layout.

### Section 1: The Hero (Inspiration: Shopify.vc & AIwithRemy)

**Purpose:** Hook the visitor immediately. Deliver the value proposition and capture the email without requiring a scroll.
**Layout Inspiration:** Vertical alignment (behold.cam layout style) with Shopify.vc header aesthetics, adapted to our dark theme.

* **Background:** Solid Black.
* **Header Bar:**
* Minimalist logo (Prompt & Pipeline wordmark) positioned top center or top left.
* Navigation elements hidden or minimal (to prevent distracting from the CTA).
* **Main Content (Vertical Alignment):**
* **Headline:** Bold, white typography.
* **Subtext:** 1-2 lines in white or light grey detailing the "weekly workflows, playbooks, and tools."
* **Email Input (AIwithRemy style):** A highly visible, horizontal inline form.
* *Desktop:* Email input field on the left, `#e58848` (Light Orange) submit button on the right, housed within the same pill or rounded-rectangle container.
* *Mobile:* Stacked natively (Input on top, Button full-width below).
* **Micro-trust text:** E.g., "Join X,XXX solopreneurs. Free forever." placed just below the input.

### Section 2: Visual Workflow Highlight (Inspiration: Semaloop)

**Purpose:** Replace the standard VSL/Problem text block with a highly visual, structured breakdown of what the newsletter actually provides.
**Layout Inspiration:** Semaloop's middle section (images describing what matters), but adapted to our `#e58848` and black palette.

* **Structure:** A vertical scroll of 3 to 4 alternating blocks (Text on left/Image on right, then swapped).
* **Content Blocks:**

1. **News That Matters:** Text describing how we cut through the noise. Accompanying graphic: A sleek mockup of the newsletter UI.
2. **Tools Worth Trying:** Text on staying lean. Accompanying graphic: Abstract or UI representations of AI tools.
3. **Copy-Paste Prompts:** Text on business leverage. Accompanying graphic: A stylized code-block or chat-interface graphic showing a prompt in action.

* **Styling:** Use our Light Orange (`#e58848`) for subtle highlights, borders, or icon accents within these blocks to make the white text and black background pop.

### Section 3: The Problem & Us vs. Them

**Purpose:** Agitate the pain of cluttered inboxes and position Prompt & Pipeline as the ultimate solution.

* **Problem Grid:**
* 3-4 dark-themed cards (muted black backgrounds, e.g., `#0b1012`).
* Each card features an annotated screenshot of competitor styles (blurred/anonymized if needed).
* Tags on cards: "Too broad," "Irrelevant," "AI Slop."
* **Comparison Table (Us vs. Them):**
* Desktop: Side-by-side columns. Mobile: Stacked.
* "Typical Newsletters" (Greyed out text, red 'X' icons).
* "Prompt & Pipeline" (White text, Light Orange `#e58848` checkmarks).
* **Mid-Page CTA:** Another email input bar directly below the comparison table.

### Section 4: Social Proof & FAQ

**Purpose:** Build immediate credibility and handle remaining objections.

* **Social Proof:**
* Real subscriber count in large, bold typography.
* 2-3 concise testimonials. Use a grid layout (slider on mobile).
* **FAQ:**
* 4 standard questions (Cost, frequency, technical requirements, unsubscribe policy).
* Use an accordion layout. The active/open state should highlight the question text in `#e58848`.

### Section 5: Founder's Note, CTA & Footer (Inspiration: Dayy.com)

**Purpose:** A personal sign-off that transitions seamlessly into the final conversion point and footer links.

* **Layout:** A split or well-organized vertical hierarchy at the absolute bottom of the page.
* **Founder's Block:**
* **Image Placeholder:** Space for your high-quality headshot (left or center-aligned).
* **Text:** "I have a project in mind. Let's talk about it tomorrow." (or your personalized sign-off).
* **Sign-off:** "[Your Name], Founder, Managing Director."
* **Final Call to Action ("Get in Touch"):**
* A prominent, clickable block or Light Orange `#e58848` button that opens a generic `mailto:` link or a contact modal.
* **Footer Navigation & Socials:**
* Clean, raw text links arranged elegantly (similar to the bottom of dayy.com).
* Address / Contact info on one side.
* Socials list explicitly formatted: Instagram, Twitter, Substack, LinkedIn.
* Legal: Copyright line and Privacy Policy link at the absolute bottom.

---

## 3. Technical & Asset Requirements

### 3.1 Integrations to Finalize

| Requirement                            | Detail                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Email Service Provider (ESP)** | Must define platform (Beehiiv, Substack, ConvertKit) to generate the correct API hook for the inline forms.                    |
| **Icons**                        | SVG only. Must include custom checkmarks, 'X' marks, and social media logos (X, Insta, LinkedIn, Substack).                    |
| **Web Fonts**                    | Primary Sans-Serif font to be provided (recommend a modern geometric sans like Inter or Aeonik to match the fluid.glass vibe). |

 |

### 3.2 Mobile Optimization Checklist

* Ensure the custom glass cursor is fully disabled via CSS (`display: none`) on viewports under `600px`.
* Ensure the inline Hero email form stacks cleanly (Input box top, Button bottom) to maximize tap-target size on iOS/Android.
* Ensure the "Us vs. Them" comparison table converts from a horizontal row to a vertical stacked list on mobile to prevent horizontal scrolling.
* Ensure all text sizes scale down dynamically using `clamp()` or media queries so that `H1` elements do not break words awkwardly on narrow phone screens.
