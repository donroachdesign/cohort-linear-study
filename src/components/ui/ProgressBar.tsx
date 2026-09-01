const fillClasses = {
  accent: 'bg-accent',
  green: 'bg-tag-green',
} as const;

export function ProgressBar({
  value,
  max,
  variant = 'accent',
}: {
  value: number;
  max: number;
  variant?: keyof typeof fillClasses;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-1.5 w-full rounded-full bg-border">
      <div className={`h-1.5 rounded-full ${fillClasses[variant]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
