import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The page scripts (cursor, scroll scenes, 3D, generated sections) mutate the DOM
  // directly, exactly like the original HTML. Strict Mode's dev-only double mount
  // would run them twice, so it is switched off.
  reactStrictMode: false,
};

export default nextConfig;
