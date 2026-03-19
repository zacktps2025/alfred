---
name: alfred-design
description: Agency UI/UX intelligence. Landing page design, portfolio sites, client dashboards, conversion-focused design, mobile-first patterns. Use when designing or building any visual interface for agency or client work.
---

# Alfred Design — Agency Visual Intelligence

> Good design is invisible. Great design makes money.

## When to Activate

Use this skill when:
- Designing landing pages or marketing sites
- Building client-facing dashboards or portals
- Creating agency portfolio or brand pages
- Reviewing or improving existing designs
- Making UI/UX decisions for agency or client projects

## Design Philosophy

### The Three Laws of Agency Design
1. **Conversion over decoration**: Every element either moves toward the goal or gets removed
2. **Speed is a feature**: A beautiful page that loads in 6 seconds loses to an okay page that loads in 2
3. **Mobile dominates**: 70%+ of web traffic is mobile. Design for thumbs first, cursors second.

## Typography System

### Hierarchy Rules
- **Display/Heroes**: Bold weight, tight tracking, large sizes. This is the first thing they read.
- **Section headers**: Medium weight, slightly looser tracking. Guides the scan.
- **Body text**: Regular weight, relaxed leading, max 65 characters per line. Easy to read.
- **Captions/metadata**: Smaller size, muted color. Supporting information.

### Sizing Scale
| Role | Mobile | Desktop |
|------|--------|---------|
| Hero headline | 2rem (32px) | 3.5-4.5rem (56-72px) |
| Section header | 1.5rem (24px) | 2-2.5rem (32-40px) |
| Body | 1rem (16px) | 1rem-1.125rem (16-18px) |
| Caption | 0.875rem (14px) | 0.875rem (14px) |

### Rules
- Never use more than 2 font families (1 headline + 1 body)
- Headings: tighten letter-spacing (-0.02em to -0.05em)
- Body: relax line-height (1.5-1.7)
- Limit body text width to 65 characters for readability
- Use `text-wrap: balance` on headlines to prevent orphaned words

## Color System

### Building a Palette
Every project needs exactly these:
1. **Primary**: Your brand's main action color (buttons, links, CTAs)
2. **Dark**: Text and heading color (never pure #000000 — use off-black like #111 or #1a1a2e)
3. **Light**: Background and canvas color (white or warm off-white like #fafafa)
4. **Accent**: Secondary interactive color (used sparingly)
5. **Muted**: For borders, disabled states, placeholder text

### Rules
- Maximum 1 accent beyond the primary palette per page
- Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)
- Shadows should be tinted to the background color, not pure black
- Never mix warm and cool grays on the same page
- Color for interactive elements only — decoration color is noise

## Layout Principles

### Spacing System
Use a consistent spacing scale based on 4px or 8px increments:
- `4px` — tight: inline element spacing
- `8px` — compact: related element grouping
- `16px` — standard: content spacing
- `24px` — comfortable: section element spacing
- `32-48px` — generous: between content blocks
- `64-128px` — dramatic: between page sections

### Container Rules
- Max content width: 1200-1400px with auto margins
- Horizontal padding: 16px mobile, 24-32px tablet, 48px desktop
- Section vertical padding: 64px mobile, 96-128px desktop
- When in doubt, add more whitespace. Cramped designs feel cheap.

### Grid Usage
- Use CSS Grid over complex Flexbox calculations
- 12-column grid for complex layouts
- Simple layouts: just use max-width containers with padding
- Avoid symmetrical 3-column card layouts — use asymmetric grids or varied sizing
- Never use `h-screen` — always `min-h-[100dvh]`

## Landing Page Design Patterns

### Above the Fold
What must be visible without scrolling:
- Headline (the specific outcome)
- Supporting text (1-2 sentences)
- Primary CTA button
- One trust signal (social proof, logos, or metric)
- Hero visual (product screenshot, illustration, or video)

### CTA Button Design
- Size: large enough to tap on mobile (min 48px height)
- Color: primary brand color, clearly different from surrounding elements
- Text: action-oriented verb ("Get Started", "Book a Call", not "Submit" or "Click Here")
- Spacing: generous padding inside (16px vertical, 32px horizontal minimum)
- Active state: subtle scale or translate for tactile feedback

### Social Proof Patterns
- Logo bars: 4-6 recognizable logos, grayscale for subtlety
- Testimonials: real names, real photos, specific results
- Metrics: "$2M+ managed", "200+ clients served"
- Case study cards: before/after with specifics

## Responsive Design

### Breakpoint Strategy
| Breakpoint | Target | Layout |
|-----------|--------|--------|
| < 640px | Mobile | Single column, stacked |
| 640-768px | Large mobile / small tablet | Single column, larger spacing |
| 768-1024px | Tablet | 2-column where appropriate |
| 1024-1280px | Laptop | Full layout with sidebar options |
| 1280px+ | Desktop | Max-width contained, full layout |

### Mobile-First Rules
- Design mobile layout first, then expand for desktop
- Touch targets: minimum 44x44px
- No hover-dependent interactions (mobile has no hover)
- Collapse complex layouts to single column below 768px
- Navigation: hamburger or bottom sheet on mobile
- Form inputs: full width on mobile, comfortable sizing on desktop

## Performance

### Speed Requirements
| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 1.8s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Total page weight | < 1MB | DevTools |
| Time to Interactive | < 3.8s | Lighthouse |

### Performance Rules
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Lazy load images below the fold
- Use modern image formats (WebP, AVIF) with fallbacks
- Minimize third-party scripts (each one is a performance tax)
- Preload critical fonts; use `font-display: swap`
- Keep the DOM shallow — deeply nested elements slow rendering

## Anti-Patterns (What to Avoid)

- **Carousel heroes**: Auto-rotating carousels have near-zero engagement on slides 2+
- **Mega-menus with 50 links**: Overwhelming. Simplify navigation to 5-7 items max.
- **Generic stock photos**: Stock photos of handshakes and meetings. Use real imagery or illustrations.
- **Walls of text without structure**: If there's no heading hierarchy and white space, no one reads it.
- **Infinite scroll without purpose**: Use pagination for content that users want to reference later.
- **Pop-ups on page load**: Let them read your page before interrupting. 30-second delay minimum.
- **Low-contrast text**: Gray text on white background for body copy. Maintain readability.

---

> Alfred — The Open-Source Agency Brain. Full dashboard: alfredify.com
