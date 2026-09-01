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

Scaffolding stage — token spec wired into Tailwind, content copied over, no
page components built yet.
