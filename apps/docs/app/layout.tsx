import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk, VT323 } from 'next/font/google';
import { Provider } from '@/components/provider';
import { siteUrl } from '@/lib/shared';
import './global.css';

const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const display = Orbitron({ subsets: ['latin'], variable: '--font-display' });
const mono = VT323({ subsets: ['latin'], weight: '400', variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Vinyl UI', template: '%s — Vinyl UI' },
  description: 'An 80s, analog-glitch design system for React and React Native.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
