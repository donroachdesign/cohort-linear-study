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

The dark theme above is Linear's, extracted from teardown sources. Light
mode is a deliberate experiment rather than a Linear extrapolation: instead
of guessing at Linear's light palette from a one-line description, it swaps
in [Cloudflare's Kumo design system](https://github.com/cloudflare/kumo/blob/main/packages/kumo/src/styles/theme-kumo.css)
to see how it compares directly, side by side, on the same layout. So the two
themes are intentionally from two different real design systems, not two
modes of one system — toggle between them (top-right, next to the avatar) to
compare Linear's dark UI against Cloudflare's light one.

Mapping, Kumo → this app's tokens:

| This app        | Kumo token                     | Note |
|------------------|--------------------------------|------|
| `canvas`         | `kumo-canvas`                  | literal |
| `surface`        | `kumo-elevated`                | literal |
| `border`         | `kumo-hairline`                | literal |
| `text-primary`   | `kumo-default` (text)          | literal |
| `text-secondary` | `kumo-subtle` (text)           | literal |
| `accent`         | `kumo-brand`                   | Kumo's functional interactive blue — **not** their `#f6821f` marketing/logo orange, which they deliberately keep out of the UI itself |
| `tag-violet`     | `badge-purple`                 | literal |
| `tag-coral`      | `badge-red`                    | literal |
| `tag-teal`       | `badge-teal` hue/chroma        | darkened — Kumo's value is tuned as a fill, not text; verified ≥4.5:1 here |
| `tag-green`      | `badge-green` hue/chroma       | darkened, same reason |
| `tag-amber`      | brand orange `#f6821f`         | used as-is, by request — only 2.5:1 against this canvas, below the 4.5:1 text / 3:1 graphical minimums every other token here clears; see "Status color vs. severity color" |

Preference persists to `localStorage`; a blocking script in `layout.tsx`
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
forming," not an error.

Amber's exact sourcing has moved twice, worth tracking honestly rather than
smoothing over: it started as a generic Tailwind amber (too close to coral
in hue, easy to misread as "a milder red"); then Cloudflare's Kumo
*badge-orange* categorical token (correct in spirit — a tag color, not a
severity color — and further from coral on the hue wheel); and now, by
request, Cloudflare's literal brand/logo orange, `#f6821f`. That last move
is a deliberate exception worth flagging: Cloudflare itself keeps that exact
color out of its own product UI (their interactive accent is a separate
blue, `kumo-brand`), reserving the orange for logo/marketing moments only —
using it here for a lifecycle stage is closer to borrowing *identity* color
than *categorical* color. It's still not a severity color, so it doesn't
undo the core argument above, but it's a different kind of exception than
"just another tag hue," made for the sake of this side-by-side comparison
rather than strict internal consistency.

In light mode specifically, `#f6821f` is used unmodified, at the user's
request, even though it only clears 2.5:1 against the light canvas —
noticeably under the 4.5:1 text minimum (it's literal text color on the
"Needs video" badge) and the 3:1 graphical minimum (the Beta `StatusIcon`
ring, the star-rating fill) that every other token in this file was checked
against. Dark mode isn't affected — `#f6821f` clears 7.7:1 there, comfortably
past both bars. This is the one accessibility exception in the whole
palette; it's called out here rather than quietly passed off as compliant.

Coral/`tag-coral` remains the only severity-family hue in the app, reserved
exclusively for actual negative signals: refunded transactions, the destructive
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
