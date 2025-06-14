// src/app/divisions/layout.tsx
// Shared layout for all division pages with metadata and SEO optimization

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getDivisionTheme } from '@/lib/divisions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Cipher Intelligence',
    default: 'Divisions | Cipher Intelligence',
  },
  description: 'AI-powered business solutions across strategy, development, and innovation',
  keywords: ['AI consulting', 'digital transformation', 'business strategy', 'automation'],
  authors: [{ name: 'Cipher Intelligence' }],
  creator: 'Cipher Intelligence',
  publisher: 'Cipher Intelligence',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cipherintelligence.com/divisions',
    siteName: 'Cipher Intelligence',
    title: 'AI-Powered Business Solutions | Cipher Intelligence',
    description: 'Transform your business with our specialized AI divisions: Strategy, DigitalWorks, Labs, Studio, and AI.',
    images: [
      {
        url: 'https://source.unsplash.com/1200x630/?artificial,intelligence,business',
        width: 1200,
        height: 630,
        alt: 'Cipher Intelligence - AI Business Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Business Solutions | Cipher Intelligence',
    description: 'Transform your business with specialized AI solutions across strategy, development, and innovation.',
    images: ['https://source.unsplash.com/1200x630/?artificial,intelligence,business'],
    creator: '@cipherintel',
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

interface DivisionLayoutProps {
  children: React.ReactNode;
}

export default function DivisionLayout({ children }: DivisionLayoutProps) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}

// Note: Division metadata utilities have been moved to @/lib/division-metadata