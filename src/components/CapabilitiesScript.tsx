'use client';

import { useEffect } from 'react';
import initCapabilities from '@/scripts/capabilities';

// Guards against the effect running twice on the same document (e.g. dev Fast Refresh).
let started = false;

/** Runs the original capabilities page script once, after the static markup has hydrated. */
export default function CapabilitiesScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    // The original form has onsubmit="return false"
    document.getElementById('cpForm')?.addEventListener('submit', (e) => e.preventDefault());
    initCapabilities();
  }, []);

  return null;
}
