import type { CourseState } from '@/lib/data';

// Linear signals issue state with a small glyph (empty ring / half-filled
// ring / filled check), not a colored badge background — reusing that here
// keeps color reserved for these glyphs and out of the badge text/fill.
//
// Beta uses amber, not coral/red: Draft > Beta > Open is a maturity sequence,
// not a severity scale. None of the three stages is a problem, so none of
// them should borrow from the "something's wrong" palette — amber reads as
// "in progress / not final" without implying an error. Coral stays reserved
// for actual negative outcomes (refunds, destructive actions) elsewhere in
// the app. See README.md "Status color vs. severity color."
export function StatusIcon({ state, size = 14 }: { state: CourseState; size?: number }) {
  if (state === 'draft') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (state === 'beta') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--color-tag-amber)" strokeWidth="1.5" />
        <path d="M7 1.5 A5.5 5.5 0 0 1 7 12.5 Z" fill="var(--color-tag-amber)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="5.5" fill="var(--color-tag-green)" />
      <path
        d="M4.5 7.2l1.6 1.6L9.5 5"
        stroke="var(--color-canvas)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const STATE_LABEL: Record<CourseState, string> = {
  draft: 'Draft',
  beta: 'Beta',
  open: 'Open',
};
