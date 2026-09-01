import type { ReactNode } from 'react';

// Neutral pill only — Linear's real status/tag chips carry color via a small
// dot or icon (see StatusIcon), not via a colored background. Keeps the
// study's "one accent, tags-only categorical color" constraint honest.
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-control border border-border bg-surface px-2 py-0.5 text-xs text-text-secondary">
      {children}
    </span>
  );
}

// Tailwind scans source for literal class names — a template-literal color
// slot would be invisible to it, so each combination is spelled out here.
const tagClasses = {
  violet: 'bg-tag-violet/15 text-tag-violet',
  teal: 'bg-tag-teal/15 text-tag-teal',
  coral: 'bg-tag-coral/15 text-tag-coral',
  green: 'bg-tag-green/15 text-tag-green',
} as const;

export function Tag({ color, children }: { color: keyof typeof tagClasses; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-control px-2 py-0.5 text-xs font-medium ${tagClasses[color]}`}>
      {children}
    </span>
  );
}
