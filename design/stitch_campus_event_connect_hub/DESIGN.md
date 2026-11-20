---
name: Vibrant Nightfall
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The brand targets forward-thinking university students, club organizers, and campus directors. The emotional core is electric anticipation, creative social momentum, and effortless navigation through campus life. 

The aesthetic is **Dark-Mode Glassmorphism fused with Cyber-Minimalism**. High-contrast, glowing accents slice through deep, layered obsidian planes. Translucent blurred surfaces, delicate inner-border highlights, and intense bioluminescent tags create an immersive, high-energy environment reminiscent of late-night hackathons, music festivals, and nocturnal campus culture without sacrificing administrative clarity or functional utility.

## Colors
The palette balances an ultra-deep cosmic ground against concentrated neon vectors:

- **Primary (`#6366F1` - Electric Indigo):** Primary calls-to-action, key navigation states, active role accents for students, and luminous card glows.
- **Secondary (`#A855F7` - Vivid Purple):** Organizer roles, high-tier featured event banners, and atmospheric gradient meshes.
- **Tertiary (`#06B6D4` - Cyber Cyan):** Live status indicators, quick RSVPs, interactive chips, and interactive tech/hackathon category tags.
- **Support Accent (`#10B981` - Emerald Signal):** Live broadcast confirmations, ticket confirmed indicators, and administrative approval markers.
- **Neutral Ground (`#0B0F19` - Deep Obsidian):** Deep cosmic canvas. Intermediate surfaces lean into `#111827` and `#1E293B` to maintain tonal elevation under frosted glass filters.
- **Functional Gradients:** 
  - Primary Glow: Linear 135deg from `#6366F1` through `#A855F7`.
  - Live Pulse: Linear 90deg from `#06B6D4` to `#10B981`.

## Typography
Plus Jakarta Sans delivers structural geometry with human, approachable curves. Large display metrics feature tight letter tracking (-0.02em to -0.03em) to convey urgency, polish, and density. 

Body text remains legible across dark backdrops using generous line heights and calibrated opacity tiers: 100% white (`#FFFFFF`) for primary titles, 70% (`#94A3B8`) for contextual copy, and 45% (`#64748B`) for metadata and timestamps. Micro-labels, tags, and role designations use capitalized, tracked (+0.05em) bold styling for instant scanning.

## Layout & Spacing
A fluid 12-column grid governs desktop interfaces with an expansive max-width container of 1440px. The grid scales down to an 8-column layout on tablets (768px - 1024px) and collapses into a responsive 4-column framework on mobile devices (&lt;768px).

Vertical spacing relies on a strict 8px progression. Section containers breathe with `space-xl`, while inner-card components maintain tight density through `space-sm` and `space-md`. Mobile layouts pin key action bars (e.g., ticket purchasing, check-in QR, organizer scanner) to bottom sheets with safe-area padding.

## Elevation & Depth
Depth is produced through translucent physical layering rather than muddy dark shadows.

- **Level 0 (Canvas):** Pure `#0B0F19` backdrop with ambient, low-opacity radial gradients (15% opacity blur of `#6366F1` and `#A855F7`) positioned dynamically behind highlighted modules.
- **Level 1 (Structural Cards & Surfaces):** Translucent backdrop fill `rgba(17, 24, 39, 0.65)` layered with `backdrop-filter: blur(16px)` and an ultra-thin perimeter stroke: `1px solid rgba(255, 255, 255, 0.08)`.
- **Level 2 (Hovered Cards & Dialogs):** Translucent surface fill `rgba(30, 41, 59, 0.8)` with `backdrop-filter: blur(24px)`, highlighted border `1px solid rgba(99, 102, 241, 0.35)`, and a neon diffusion glow: `box-shadow: 0 12px 32px -8px rgba(99, 102, 241, 0.25)`.
- **Level 3 (Overlays & Drawer Modals):** Translucent backdrop fill `rgba(15, 23, 42, 0.92)` with `backdrop-filter: blur(32px)` and inset top-edge highlight `1px solid rgba(255, 255, 255, 0.15)`.

## Shapes
A unified rounded geometry brings high-tech precision without feeling harsh or industrial. Base components (inputs, standard buttons, alerts) leverage 0.5rem (8px). Medium surfaces, event cards, and containers scale to 1rem (16px). Specialized interactive accents, avatars, filter pills, and live indicator capsules utilize complete circular/pill geometry to establish contrast against card structures.

## Components

### Buttons
- **Primary:** Gradient fill (Electric Indigo to Vivid Purple), white text, `font-weight: 600`, subtle outer halo (`box-shadow: 0 0 16px rgba(99, 102, 241, 0.4)`). Active state scales to 0.98.
- **Secondary Glass:** `rgba(255, 255, 255, 0.05)` fill, `1px solid rgba(255, 255, 255, 0.12)`, hover state transitions border to `rgba(99, 102, 241, 0.5)`.
- **Live / Action Ghost:** Borderless, bold Cyan text, subtle Cyan hover bloom.

### Role Badges
- **Student Badge:** Translucent Indigo tint `rgba(99, 102, 241, 0.15)`, Indigo border `rgba(99, 102, 241, 0.4)`, crisp text.
- **Organizer Badge:** Electric Purple tint `rgba(168, 85, 247, 0.15)`, glowing Purple border, crown/spark icon.
- **Admin Badge:** Coral Amber tint `rgba(245, 158, 11, 0.15)`, sharp gold border `rgba(245, 158, 11, 0.5)`.

### Dynamic Status Indicators
- **Happening Now:** Pill shape containing a pulsing Emerald dot (`animation: pulse 1.5s infinite`), emerald glow container, white uppercase tracking text.
- **Selling Fast / Waitlist:** Cyan capsule with high-contrast inner typography.

### Event Cards
- Multi-layered glass surface with an aspect-ratio-locked imagery header, semi-transparent metadata footers, quick RSVP buttons, and dynamic category tags pinned to top corners. Hovering triggers a subtle vertical translation (-4px) and raises the outer border luminosity.

### Input Fields & Controls
- **Inputs:** Dark obsidian wells (`rgba(11, 15, 25, 0.8)`), subtle inset borders, glowing indigo outline when focused (`box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4)`).
- **Checkboxes & Radios:** Custom curved squares and circular dots filled with neon Indigo upon selection, maintaining high contrast check glyphs.