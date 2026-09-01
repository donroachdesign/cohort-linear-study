import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  padding?: 0 | 3 | 4;
  tint?: 'coral' | 'green' | 'amber';
  className?: string;
}

const paddingClasses = { 0: 'p-0', 3: 'p-3', 4: 'p-4' } as const;
const tintClasses = {
  coral: 'bg-tag-coral/[0.06] border-tag-coral/25',
  green: 'bg-tag-green/[0.06] border-tag-green/25',
  amber: 'bg-tag-amber/[0.06] border-tag-amber/25',
} as const;

// Elevation is a surface-color step plus a hairline border, never a shadow —
// no box-shadow utility appears anywhere in this study on purpose.
export function Card({ children, padding = 4, tint, className = '' }: CardProps) {
  const surface = tint ? tintClasses[tint] : 'bg-surface border-border';
  return (
    <div className={`rounded-container border ${surface} ${paddingClasses[padding]} ${className}`}>{children}</div>
  );
}
