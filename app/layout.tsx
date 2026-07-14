import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PT_Sans, Open_Sans } from 'next/font/google';

// Styles
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

// Custom Configuration & Layout Components
import { theme } from '../theme';
import LayoutContent from '../components/layout/LayoutContent';
import ReactPolyfill from '../components/SEO/ReactPolyfill';

// Fonts Setup
const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Complete Facility Management Solutions | Maintex Facility Management',
    template: '%s | Maintex Facility Management',
  },
  description:
    'Professional facility management services including electrical maintenance, plumbing, HVAC, deep cleaning, housekeeping, painting, pest control, and comprehensive property maintenance for homes, offices, and commercial buildings.',
  keywords: [
    'facility management',
    'property maintenance',
    'electrical maintenance',
    'plumbing services',
    'HVAC maintenance',
    'deep cleaning services',
    'housekeeping services',
    'pest control',
    'painting and renovation',
    'commercial facility management',
    'building maintenance',
  ],
  authors: [{ name: 'Maintex Facility Management' }],
  creator: 'Maintex Facility Management',
  metadataBase: new URL('https://maintex.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Complete Facility Management Solutions Under One Roof | Maintex Facility Management',
    description: 'Professional facility management services for homes, offices, hospitals, hotels, and industrial facilities. Get a free consultation today.',
    url: 'https://maintex.in',
    siteName: 'Maintex Facility Management',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Complete Facility Management Solutions',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#6D94C5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <ReactPolyfill />
          <Notifications position="top-right" zIndex={2000} />
          
          <LayoutContent>
            {children}
          </LayoutContent>
        </MantineProvider>
      </body>
    </html>
  );
}
