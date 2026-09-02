import type { ReactNode } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Card } from './ui/Card';
import { StatusIcon, STATE_LABEL, STATE_PILL_CLASSES } from './StatusIcon';
import type { CourseState } from '@/lib/data';

function StarRating({ value, count, note }: { value: number; count: number; note?: string }) {
  const rounded = Math.round(value * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded - fullStars === 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={14} fill="var(--color-tag-amber)" stroke="var(--color-tag-amber)" />;
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star size={14} fill="none" stroke="var(--color-border)" className="absolute inset-0" />
              <StarHalf
                size={14}
                fill="var(--color-tag-amber)"
                stroke="var(--color-tag-amber)"
                className="absolute inset-0"
              />
            </span>
          );
        }
        return <Star key={i} size={14} fill="none" stroke="var(--color-border)" />;
      })}
      <span className="ml-1 text-xs text-text-secondary">
        {value} ({count}){note ? ` · ${note}` : ''}
      </span>
    </div>
  );
}

interface CourseHeaderProps {
  state: CourseState;
  title: string;
  instructor: string;
  meta: string;
  rating?: { value: number; count: number; note?: string };
  bannerHeading: string;
  bannerDescription: string;
  actions: ReactNode;
  switcher?: ReactNode;
}

const bannerTint: Record<CourseState, 'amber' | 'green' | undefined> = {
  draft: undefined,
  beta: 'amber',
  open: 'green',
};

export function CourseHeader({
  state,
  title,
  instructor,
  meta,
  rating,
  bannerHeading,
  bannerDescription,
  actions,
  switcher,
}: CourseHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span className="hover:text-text-primary cursor-pointer">Courses</span>
          <span>/</span>
          <span className="text-text-primary">{title}</span>
        </div>
        {switcher}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <StatusIcon state={state} size={16} />
          <h1 className="text-xl font-medium text-text-primary">{title}</h1>
          <span className={`rounded-control px-2 py-0.5 text-xs font-medium ${STATE_PILL_CLASSES[state].selected}`}>
            {STATE_LABEL[state]}
          </span>
        </div>
        {rating && <StarRating value={rating.value} count={rating.count} note={rating.note} />}
        <p className="text-[13px] text-text-secondary">
          by {instructor} · {meta}
        </p>
      </div>

      <Card tint={bannerTint[state]}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StatusIcon state={state} size={18} />
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-medium text-text-primary">{bannerHeading}</h3>
              <p className="text-[13px] text-text-secondary">{bannerDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </Card>
    </div>
  );
}
