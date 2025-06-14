// src/app/layout.tsx
// Root layout component with global styles, providers, and metadata configuration

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Purpose: SEO metadata configuration for the master brand site
export const metadata: Metadata = {
  title: {
    default: 'Cipher Intelligence - Pioneering Technology, United Expertise',
    template: '%s | Cipher Intelligence',
  },
  description: 'Transform your business with our integrated ecosystem of AI-powered solutions. Six specialized divisions, one unified vision: accelerating your digital future.',
  keywords: [
    'AI solutions',
    'digital transformation',
    'artificial intelligence',
    'business automation',
    'enterprise technology',
    'software development',
    'data analytics',
    'cloud services',
    'cybersecurity',
    'innovation consulting'
  ],
  authors: [{ name: 'Cipher Intelligence Group' }],
  creator: 'Cipher Intelligence Group',
  publisher: 'Cipher Intelligence Group',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cipherintelligence.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cipher Intelligence - Pioneering Technology, United Expertise',
    description: 'Transform your business with our integrated ecosystem of AI-powered solutions. Six specialized divisions, one unified vision.',
    url: 'https://cipherintelligence.com',
    siteName: 'Cipher Intelligence',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cipher Intelligence - AI-Powered Business Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cipher Intelligence - Pioneering Technology, United Expertise',
    description: 'Transform your business with our integrated ecosystem of AI-powered solutions.',
    images: ['/og-image.jpg'],
    creator: '@CipherIntel',
    site: '@CipherIntel',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  category: 'technology',
};

// Purpose: Viewport configuration for responsive design and performance
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f1a' },
  ],
  colorScheme: 'dark light',
};

// Purpose: Global providers and analytics setup
function Analytics() {
  // Google Analytics 4 implementation
  if (!process.env.GOOGLE_ANALYTICS_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Purpose: JSON-LD structured data for better SEO
function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cipher Intelligence Group',
    url: 'https://cipherintelligence.com',
    logo: 'https://cipherintelligence.com/logo.png',
    description: 'Leading AI and technology solutions provider with specialized divisions for digital transformation.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-CIPHER-1',
      contactType: 'customer service',
      email: 'contact@cipherintelligence.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Innovation Drive',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US',
    },
    sameAs: [
      'https://twitter.com/CipherIntel',
      'https://linkedin.com/company/cipher-intelligence',
      'https://github.com/cipher-intelligence',
    ],
    serviceArea: {
      '@type': 'Place',
      name: 'Global',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Digital Transformation',
      'Software Development',
      'Data Analytics',
      'Cloud Computing',
      'Cybersecurity',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cipher Intelligence',
    url: 'https://cipherintelligence.com',
    description: 'Transform your business with AI-powered solutions across six specialized divisions.',
    publisher: {
      '@type': 'Organization',
      name: 'Cipher Intelligence Group',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cipherintelligence.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, websiteSchema]),
      }}
    />
  );
}

// Purpose: Root layout component with providers and global configuration
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('dark', inter.variable)} suppressHydrationWarning>
      <head>
        <Analytics />
        <StructuredData />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//source.unsplash.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Critical CSS variables */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
              --card: 222.2 84% 4.9%;
              --card-foreground: 210 40% 98%;
              --popover: 222.2 84% 4.9%;
              --popover-foreground: 210 40% 98%;
              --primary: 210 40% 98%;
              --primary-foreground: 222.2 84% 4.9%;
              --secondary: 217.2 32.6% 17.5%;
              --secondary-foreground: 210 40% 98%;
              --muted: 217.2 32.6% 17.5%;
              --muted-foreground: 215 20.2% 65.1%;
              --accent: 217.2 32.6% 17.5%;
              --accent-foreground: 210 40% 98%;
              --destructive: 0 62.8% 30.6%;
              --destructive-foreground: 210 40% 98%;
              --border: 217.2 32.6% 17.5%;
              --input: 217.2 32.6% 17.5%;
              --ring: 212.7 26.8% 83.9%;
              --radius: 0.5rem;
            }
          `
        }} />
      </head>
      
      <body 
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          'selection:bg-primary/20 selection:text-primary'
        )}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>

        {/* Main application content */}
        <div id="main-content" className="relative">
          {children}
        </div>

        {/* Global toast notifications container */}
        <div id="toast-container" className="fixed bottom-4 right-4 z-50 space-y-2" />

        {/* Loading indicator for page transitions */}
        <div 
          id="page-loading-indicator" 
          className="fixed top-0 left-0 right-0 h-1 bg-primary opacity-0 transition-opacity duration-300 z-50"
        />

        {/* Cookie consent banner placeholder */}
        <div id="cookie-consent" />

        {/* Performance monitoring script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Web Vitals tracking
                function sendToAnalytics({name, value, id}) {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', name, {
                      custom_parameter_1: value,
                      custom_parameter_2: id,
                    });
                  }
                }

                // Track Core Web Vitals
                import('/js/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
                  getCLS(sendToAnalytics);
                  getFID(sendToAnalytics);
                  getFCP(sendToAnalytics);
                  getLCP(sendToAnalytics);
                  getTTFB(sendToAnalytics);
                });
              `,
            }}
          />
        )}

        {/* Service Worker registration for PWA capabilities */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}