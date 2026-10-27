'use client';

import { useEffect } from 'react';
import initWork from '@/scripts/work';

// Guards against the effect running twice on the same document (e.g. dev Fast Refresh).
let started = false;

/** Runs the original work page script once, after the static markup has hydrated. */
export default function WorkScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    initWork();
  }, []);

  return null;
}
