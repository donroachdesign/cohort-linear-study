'use client';

import { StatusIcon, STATE_LABEL } from './StatusIcon';
import type { CourseState } from '@/lib/data';

const states: CourseState[] = ['draft', 'beta', 'open'];

export function CourseStateSwitcher({
  value,
  onChange,
}: {
  value: CourseState;
  onChange: (value: CourseState) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-secondary">Dev preview:</span>
      <div className="inline-flex items-center gap-0.5 rounded-control border border-border bg-canvas p-0.5">
        {states.map(state => {
          const selected = state === value;
          return (
            <button
              key={state}
              type="button"
              onClick={() => onChange(state)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-xs font-medium transition-colors cursor-pointer ${
                selected ? 'bg-surface text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <StatusIcon state={state} size={12} />
              {STATE_LABEL[state]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
