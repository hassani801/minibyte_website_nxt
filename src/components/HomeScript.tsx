'use client';

import { useEffect } from 'react';
import initHome from '@/scripts/home';

// Guards against the effect running twice on the same document (e.g. dev Fast Refresh).
let started = false;

/** Runs the original home page script once, after the static markup has hydrated. */
export default function HomeScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    initHome();
  }, []);

  return null;
}
