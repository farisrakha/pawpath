---
name: PawPath
description: Adoption marketplace connecting Indonesian families with animals in need of homes.
colors:
  primary: "oklch(0.598 0.155 28.8)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.961 0.065 88)"
  secondary-foreground: "oklch(0.305 0.045 85)"
  accent: "oklch(0.855 0.12 88)"
  foreground: "oklch(0.145 0.008 57)"
  background: "oklch(1 0 0)"
  muted: "oklch(0.968 0.008 57)"
  muted-foreground: "oklch(0.556 0.012 57)"
  border: "oklch(0.922 0.006 57)"
  destructive: "oklch(0.577 0.245 27.325)"
  wa-green: "oklch(0.72 0.19 155)"
  status-success-bg: "oklch(0.955 0.052 148)"
  status-success-fg: "oklch(0.37 0.098 148)"
  status-warning-bg: "oklch(0.96 0.065 90)"
  status-warning-fg: "oklch(0.40 0.12 65)"
  status-info-bg: "oklch(0.97 0.014 238)"
  status-info-fg: "oklch(0.39 0.13 248)"
typography:
  display:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontWeight: 700
    fontSize: "1.5rem"
    lineHeight: 1.25
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "1rem"
  full: "9999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
  filter-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    padding: "0 1rem"
  filter-pill-inactive:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    padding: "0 1rem"
---

# Design System: PawPath

## 1. Overview

**Creative North Star: "The Found Family"**

PawPath is a warm, purposeful adoption marketplace built for Indonesian families and animals finding each other. The design system's central conviction: adoption is mutual discovery, unhurried, trusting, and emotionally real. Every screen should feel like meeting someone who already feels like home — not browsing a catalog, not filling out a form, but recognizing something.

The palette is coral-led, not product-blue. Surfaces stay warm and unbleached. Typography mixes Fraunces Variable's inkstone weight for headlines with Geist Variable's quiet confidence for body copy. Motion is restrained: animals breathe into view on load, never performed. Interactivity acknowledges the user without demanding attention.

This system explicitly rejects: clinical white with system-blue CTAs, SaaS-cream with purple gradients, neon on dark, and anything that prioritizes tech-brand signals over emotional honesty. If it reads as a veterinary software portal or a generic marketplace SaaS, the color or typographic hierarchy has drifted.

**Key Characteristics:**
- Coral primary as the emotional center, not a decorative accent
- Warm off-white ("Husked Linen") surfaces that never feel sterile
- Fraunces reserved for display and page titles only; Geist carries all UI
- Flat-by-default elevation with shadow only in hover state
- Semantic status palette (success/warning/info) kept entirely separate from brand accents
- 44px touch minimum enforced on all custom interactive elements

## 2. Colors: The Terracotta Warmth Palette

A two-accent palette with a clear emotional hierarchy: Terracotta Warmth leads, Honey Yellow supports, warm neutrals ground everything.

### Primary
- **Terracotta Warmth** (`oklch(0.598 0.155 28.8)`): The coral/terracotta accent. CTAs, active states, the wordmark, focus rings, primary interactive signals. Never decorative — marks the single most important thing in a given screen region. Occupies roughly 15–20% of key screens; its rarity is what gives it authority.

### Secondary
- **Honey Yellow** (`oklch(0.961 0.065 88)`): Background-weight secondary. Avatar fill, secondary chip surfaces, accent overlays. Functions more as a tinted surface than a saturated accent.
- **Amber Highlight** (`oklch(0.855 0.12 88)`): The saturated reading of yellow. Warning status backgrounds, applied via `--status-warning-bg`.

### Neutral
- **Warm Ink** (`oklch(0.145 0.008 57)`): Body text and headings. Never pure black — the warm hue tint means text sits naturally on warm surfaces without creating cold contrast.
- **Husked Linen** (`oklch(0.968 0.008 57)`): The primary surface. Chip backgrounds, filter panel, muted containers. Warm, natural, never clinical. The canvas that makes animals' photos read as warm rather than documentary.
- **Faded Slate** (`oklch(0.556 0.012 57)`): Supporting text, labels, metadata, muted-foreground. The color of something read once before.
- **Warm Border** (`oklch(0.922 0.006 57)`): Dividers and card outlines. Nearly invisible in light mode — tonal rather than structural.

### Semantic
- **Adoption Green** (`oklch(0.955 0.052 148)` bg / `oklch(0.37 0.098 148)` fg): Approved, adopted, and fully vaccinated states.
- **Caution Amber** (`oklch(0.96 0.065 90)` bg / `oklch(0.40 0.12 65)` fg): Meet & Greet stage, special requirements callout, private lister verification bar.
- **Trust Blue** (`oklch(0.97 0.014 238)` bg / `oklch(0.39 0.13 248)` fg): Verified shelter designation bar.
- **WhatsApp Leaf** (`oklch(0.72 0.19 155)`): Brand-locked. The WhatsApp CTA button only. Never repurposed as a general success color; never tinted or lightened.
- **Destructive Coral** (`oklch(0.577 0.245 27.325)`): Errors, rejection status, withdrawal action. Hue proximity to the primary is intentional — both are warm reds. Context and saturation distinguish them; never rely on hue alone.

### Named Rules
**The One Anchor Rule.** Terracotta Warmth appears on at most one focal element per screen region. Its rarity is what makes it trustworthy. Stack two primary CTAs and both become noise.

**The Semantic Firewall Rule.** Status colors are never used as decorative accents, and WhatsApp Leaf is never used for non-WhatsApp elements. Crossing these lines makes the status system unreadable.

## 3. Typography

**Display Font:** Fraunces Variable (with Georgia, serif fallback)
**Body Font:** Geist Variable (with ui-sans-serif, system-ui fallback)

**Character:** Fraunces brings ink-weight and optical expressiveness to page titles — it is the voice of the announcement, not the conversation. Geist is the conversation: technical precision made warm through its variable optical sizing and generous x-height. Together they read as a knowledgeable local guide who also happens to know how to design.

### Hierarchy
- **Display** (Fraunces, 700 weight, fluid ~2.2–2.8rem, -0.025em tracking, 1.1 line height): Page titles only. Browse page hero, individual pet name on detail view. One per viewport. `font-display` class.
- **Headline** (Fraunces, 700 weight, ~1.5rem, 1.25 line height): Section titles inside cards ("Tentang [Name]", "Status kesehatan"). May appear several times per screen.
- **Title** (Geist, 600 weight, ~1.125rem, 1.35 line height): Card-level headings, dialog titles, form section labels. The mid-tier separator.
- **Body** (Geist, 400 weight, 0.875–1rem, 1.6 line height): Story text, descriptions, form labels, all UI copy. Line length capped at 65ch on prose content. The default voice.
- **Label Eyebrow** (Geist, 600 weight, 0.75rem, uppercase, 0.05em tracking): Section dividers, filter titles, metadata prefixes (UKURAN, KARAKTER, LOKASI). Applied via the `label-eyebrow` utility class. Used where visual separation is needed without escalating weight.

### Named Rules
**The Fraunces Ceiling Rule.** Fraunces is used only for h1 and h2 page/section headings. Never in buttons, navigation, labels, body copy, or any UI text below title level. Its character depends entirely on its rarity — the more it appears, the less it means.

## 4. Elevation

PawPath uses flat-by-default surfaces. There are no ambient shadows at resting state — depth is conveyed through warm surface tinting (Husked Linen is marginally darker than the pure background) and thin tonal rings (`ring-1 ring-border` or `ring-1 ring-foreground/10`). The system reads as grounded, not floating.

### Shadow Vocabulary
- **Hover lift** (`hover:shadow-lg`): Pet listing cards only. The sole motion signal that a card is interactive. Shadow appears on hover, disappears on release — never present at rest.
- **Selected micro** (`shadow-sm`): Active gallery thumbnail on the pet detail view. A barely-perceptible lift to confirm which photo is in view.
- **Sticky glass** (header: `bg-background/95 backdrop-blur`): The one glassmorphism treatment. Functional, not decorative: it signals "this element is above the content" when the user scrolls. Not to be replicated elsewhere.

### Named Rules
**The Flat-by-Default Rule.** No resting shadows, anywhere. Surfaces sit on the canvas. Shadow is a response to interaction (hover), confirmed selection (thumbnail), or physical fixed position (header). It is never a default styling decision.

## 5. Components

### Buttons
- **Shape:** Gently curved (0.625rem radius, ~10px) by default. `rounded-full` is reserved for filter and species pills, never for primary action buttons.
- **Primary** (Terracotta fill, near-white text): Height 2.25rem (default), 2.75rem (lg). Horizontal padding `px-2.5`. Leading or trailing icon in gap-1.5 when directional (Heart for apply, ArrowRight for next step, Check for completion).
- **Outline:** Transparent background, warm border, fills Husked Linen on hover. Adjacent to a primary when a secondary action exists on the same surface.
- **Ghost:** No background or border at rest; Husked Linen fill on hover. Used for navigation links, dismiss actions, low-priority dashboard controls.
- **Destructive:** `bg-destructive/10 text-destructive` — a tinted, not solid, treatment so it reads as cautionary rather than alarming. Used for withdraw application only.
- **Focus:** Three-layer focus ring: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`. Unmissable on keyboard navigation without visual aggression.
- **Custom toggles and pills:** All custom `<button>` elements not using the Button component require `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` and `min-h-11` (44px).

### Cards / Containers
- **Pet listing card** (`rounded-2xl border border-border bg-card`): Photo at 4:3 aspect with `group-hover:scale-[1.04]` on the image. Hover state lifts with `hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg`. Content padding p-4. Staggered entry via `pawFadeUp` with per-card delay.
- **Detail panel card** (`rounded-2xl border border-border bg-card p-5 md:p-6`): Contains vitals grid, temperament tags, CTA block. Right-column fixed position on desktop.
- **Lister verification card:** Colored top bar signals type — info-blue for verified shelters, caution-amber for verified private listers. No bar for unverified. The bar is a full-width stripe, not a side border.
- **Internal padding:** p-4 standard, p-5/p-6 on detail-level surfaces, p-3 on compact forms.

### Inputs / Fields
- **Style:** `rounded-lg border border-input bg-transparent h-8` base, `h-11` for full application-form inputs. Stroke-only (no background fill) so the Husked Linen surface shows through.
- **Focus:** Same three-layer ring as buttons — `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`.
- **Error:** `aria-invalid` automatically triggers `border-destructive ring-3 ring-destructive/20`. Error messages must be wired via `aria-describedby` — never rely on proximity alone.
- **RadioCard:** Label wraps both `RadioGroupItem` and text. `has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5` applies active styling via the CSS has() selector without JavaScript.

### Navigation
- **Header:** Sticky, `h-16`, `bg-background/95 backdrop-blur`. Single blurred-glass surface that floats above content on scroll.
- **Desktop links:** text-sm, Faded Slate at rest, `hover:bg-muted hover:text-foreground`, `text-primary` for active route via TanStack Router's `[&.active]` targeting.
- **Mobile:** Left-side Sheet at `w-72`. Same link styles at text-base. Closed on navigation via `SheetClose` wrapping each link.
- **Wordmark:** `<PawPrint>` icon (size-6, text-primary) + "PawPath" in Fraunces, 1.25rem, font-bold, text-primary. The only place in the UI where the Fraunces display font appears at small size.

### WhatsApp CTA (Signature Component)
Two size variants share the same brand color and structure:
- **Default:** Full-width block, `rounded-xl`, `py-2.5 px-4`, `text-sm`, `gap-2`. Used in pet detail lister card.
- **Compact:** Inline, `rounded-lg`, `py-1.5 px-3`, `text-xs`, `gap-1.5`. Used in applications list alongside other action buttons.
Both variants: `bg-wa-green text-white font-semibold hover:opacity-90 min-h-11`. MessageCircle icon left-aligned. Always `rel="noopener noreferrer" target="_blank"`.

### Status Badges
Rounded-full pills, `px-2.5 py-0.5 text-[0.68rem] font-semibold`. Colors from the semantic palette only:
- submitted / withdrawn: `bg-muted text-muted-foreground`
- under_review: `bg-primary/10 text-primary`
- meet_greet: `bg-status-warning-bg text-status-warning-fg`
- approved / adopted: `bg-status-success-bg text-status-success-fg`
- rejected: `bg-destructive/10 text-destructive`

## 6. Do's and Don'ts

### Do:
- **Do** use the `label-eyebrow` utility for every section divider, filter section title, and metadata prefix. Never hand-roll the 0.75rem / 600 / uppercase / 0.05em tracking combination inline.
- **Do** maintain `min-h-11` (2.75rem, 44px) on every custom `<button>` that is not using the Button component. Filter pills, species toggles, activity buttons, donation amount pickers.
- **Do** apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` to all custom `<button>` elements not using the Button component.
- **Do** use OKLCH for every new color value. Never introduce hex or HSL into the token system.
- **Do** wire `aria-describedby` on form fields where inline errors or hint text exist. Use a stable ID on the hint/error element.
- **Do** use `aria-pressed` on toggle-style selection buttons (gallery thumbnails, filter pills) and `aria-current="step"` on wizard step indicators.
- **Do** add `prefers-reduced-motion` consideration for any new animation. The global media query in `styles.css` handles the built-in keyframes; custom animations must also respect it.
- **Do** use Fraunces (`font-display`) for h1 and h2 headings only. All UI copy — buttons, labels, nav, form text, metadata — uses Geist.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, callouts, or list items. Use full borders, background tints, or leading icons instead. Side-stripe borders are prohibited.
- **Don't** use `background-clip: text` with a gradient fill. Gradient text is prohibited — use a single solid color with weight or size for emphasis.
- **Don't** use glassmorphism outside the site header. The blur/translucency treatment exists once, it is functional, and it does not replicate.
- **Don't** hardcode Tailwind semantic colors (`bg-green-100 text-green-800`, `bg-amber-100 text-amber-800`, `bg-blue-50 text-blue-800`). Always use the token classes: `bg-status-success-bg text-status-success-fg`, etc.
- **Don't** render text below `text-[0.68rem]` (10.9px). This is the floor for badges, tags, and step labels.
- **Don't** use `--wa-green` or `bg-wa-green` for anything other than a WhatsApp CTA element. It is a brand-locked color.
- **Don't** add `box-shadow` to resting cards. Shadow is an interaction response only.
- **Don't** place external URLs (`place.dog`, `cataas.com`) in `onError` image handlers. All fallbacks must resolve to `/images/placeholder.svg`.
- **Don't** rely on color alone to communicate state. Status pills combine color, text label, and (where applicable) icon. Vaccination status uses both a ShieldCheck icon and an `aria-label`.
- **Don't** use the hero-metric template (large number, supporting stats, gradient accent). The dashboard uses data; it does not perform it.
