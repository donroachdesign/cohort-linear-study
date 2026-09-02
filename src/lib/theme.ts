'use client';

import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

// Matches the pre-hydration default set by the blocking script in
// layout.tsx, so hydration never mismatches on this value.
function getServerSnapshot(): Theme {
  return 'dark';
}

export function setTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
