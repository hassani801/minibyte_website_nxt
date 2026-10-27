'use client';

import { useEffect } from 'react';
import initResearch from '@/scripts/research';

// Guards against the effect running twice on the same document (e.g. dev Fast Refresh).
let started = false;

/** Runs the original research page script once, after the static markup has hydrated. */
export default function ResearchScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    initResearch();
  }, []);

  return null;
}
