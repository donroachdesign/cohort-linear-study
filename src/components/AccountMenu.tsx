'use client';

import { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';

function initials(name: string) {
  return name
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AccountMenu({ name, lastLogin }: { name: string; lastLogin?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        aria-label={`${name} account menu`}
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center gap-1"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#5a0add] text-[11px] font-medium text-on-accent">
          {initials(name)}
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-canvas bg-tag-green"
          />
        </span>
        <ChevronDown size={14} className="text-text-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-9 z-10 w-56 animate-fade-in rounded-control border border-border bg-surface py-1">
          <div className="px-3 py-2">
            <p className="text-[13px] font-medium text-text-primary">{name}</p>
            {lastLogin && <p className="text-xs text-text-secondary">Last login {lastLogin}</p>}
          </div>

          <div className="my-1 h-px bg-border" />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-[13px] text-text-primary hover:bg-canvas"
          >
            <Bell size={14} />
            Notifications
          </button>

          <div className="my-1 h-px bg-border" />

          {['Profile', 'Payouts', 'Settings', 'Log out'].map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setIsOpen(false)}
              className="block w-full cursor-pointer px-3 py-1.5 text-left text-[13px] text-text-primary hover:bg-canvas"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
