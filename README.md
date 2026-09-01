# Cohort — Linear Study

A design-learning exercise, not a client or job-application deliverable. This
takes the same course-detail-page content and information architecture from
the [Cohort take-home](https://github.com/donroachdesign/cohort-takehome)
(built with Astryx, Meta's internal design system) and rebuilds the UI layer
from scratch — hand-authored Tailwind components — against a token spec
extracted from Linear's actual product, for practice reading a real interface
and turning it into a buildable system.

## Why this exists

Linear has no official published design system (no public token package,
component library, or docs site — confirmed via search, not assumed). Every
"Linear design system" resource online is a third-party reconstruction from
observing the product. This study is one more entry in that category: an
attempt to extract a real, specific spec from credible teardowns and actually
build with it, rather than eyeballing "looks kind of like Linear."

## Token spec (extracted, not guessed)

Source: [Identity Forge — "The Linear design system, read as constraints"](https://identityforge.io/learn/linear-design-system)

- **Color:** near-black canvas (`#08090a`), one-step-lighter surface (`#0f1011`),
  hairline borders (`#23252a`). One accent color, used only on primary buttons
  and active nav — nowhere else. Small categorical set (violet/teal/coral/green)
  reserved for tags only.
- **Typography:** Inter, weights capped at 400–510 (no true 700 bold anywhere
  in the interface). Letter-spacing tightens at larger sizes, loosens at small
  label sizes.
- **Spacing:** 8px base scale (8/16/32/64...).
- **Radius:** 6px on controls, 12px on containers — never larger.
- **Elevation:** no drop shadows anywhere. Depth is communicated by a surface
  color step plus a 0.5px hairline border, nothing else.
- **Hard constraints observed:** no gradients, no box-shadows, no second
  accent color, no font-weight above 510.

## Light theme

Linear ships both a dark and light theme (toggle in-app, or follow system).
The dark palette above is extracted from teardown sources; no equivalent
scraped hex values were available for light mode, so those tokens are a
reasoned extrapolation from Linear's own description of its light theme as
"a warmer gray that still feels crisp, but less saturated" plus the same
surface/border/text structure, not a second extraction — flagged here rather
than presented as equally sourced. Tag colors were darkened from their
dark-mode values and verified at ≥4.5:1 text contrast against the light
canvas (teal and green both needed two shade-steps darker than a naive
hue-matched swap to clear that bar). Toggle lives top-right in the app bar;
preference persists to `localStorage` and a blocking script in `layout.tsx`
applies it before first paint to avoid a flash of the wrong theme.

## Status color vs. severity color

The Draft → Beta → Open lifecycle switcher deliberately does **not** use a
red/yellow/green stoplight scale, even though that's the reflexive choice for
a three-state progression. Stoplight color is a *severity* scale — it answers
"how worried should I be, does this need a response right now" (design
systems built for exactly this, like [Astro UXDS's status
system](https://www.astrouxds.com/patterns/status-system/), define it as a
literal severity gradient from neutral gray at "off" to red at "alert").
Draft/Beta/Open is a *maturity* sequence — no stage is a problem, so none of
them should borrow a "something's wrong" color. Real-world precedent backs
this: Notion's own Status property ships gray → blue → green for its three
default groups, with no red anywhere in the sequence, because none of its
stages represent danger.

So: Draft stays neutral gray, Open stays green (matches both "go" and
Notion's "Done"), and Beta uses **amber**, not coral — "in progress, still
forming," not an error. Coral/`tag-coral` is reserved exclusively for actual
negative signals elsewhere in the app: refunded transactions, the destructive
Pause-enrollment confirmation, the Beta view's Drop-off hotspot metric, and
the low-rating warning in the Promote-to-Open dialog — things that are
genuinely worth an alert, unlike simply being mid-lifecycle.

## What's reused vs. rebuilt

- **Reused as-is:** `src/lib/data.ts` — the mock course content and lifecycle
  states (Draft / Beta / Open).
- **Rebuilt from scratch:** every component. No Astryx, no component library
  — plain Tailwind utilities driven by the token spec above, as a deliberate
  practice rep at authoring atomic components (button, card, badge, nav) by
  hand rather than installing them.

## Run it

```
npm install
npm run dev
```

## Status

All three lifecycle views (Draft, Beta, Open) are built, along with the app
shell, account menu, dev-preview switcher, and the invite-list / promote /
pause-enrollment dialogs. Light/dark theming and the status vs. severity
color pass above are both in place.
