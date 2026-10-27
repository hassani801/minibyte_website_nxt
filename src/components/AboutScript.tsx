'use client';

import { useEffect } from 'react';
import initAbout from '@/scripts/about';

// Guards against the effect running twice on the same document (e.g. dev Fast Refresh).
let started = false;

/** Runs the original about page script once, after the static markup has hydrated. */
export default function AboutScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    initAbout();
  }, []);

  return null;
}
