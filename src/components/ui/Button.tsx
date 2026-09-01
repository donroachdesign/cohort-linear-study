'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:opacity-90 disabled:opacity-40',
  secondary:
    'bg-surface border border-border text-text-primary hover:border-text-secondary disabled:opacity-40 disabled:hover:border-border',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent',
  destructive:
    'bg-tag-coral/10 border border-tag-coral/30 text-tag-coral hover:bg-tag-coral/20 disabled:opacity-40',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-[13px] gap-1.5',
  md: 'h-8 px-3 text-sm gap-2',
};

export function Button({ variant = 'secondary', size = 'md', icon, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-control font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
