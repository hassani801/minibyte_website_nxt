import type { Metadata, Viewport } from 'next';
import './capabilities.css';

export const metadata: Metadata = {
  title: 'Minibyte Capabilities',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Same inline bootstrap the original page ran in <head> (adds the `js` / `ready` classes).
const HEAD_SCRIPT = "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('ready')},2500)";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
