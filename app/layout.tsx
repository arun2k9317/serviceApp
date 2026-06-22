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
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import QuickCallButton from '../components/layout/QuickCallButton';
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
    default: 'Complete Facility Management Solutions | Full Maintenance',
    template: '%s | Full Maintenance',
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
  authors: [{ name: 'Full Maintenance Company' }],
  creator: 'Full Maintenance Company',
  metadataBase: new URL('https://fullmaintenance.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Complete Facility Management Solutions Under One Roof | Full Maintenance',
    description: 'Professional facility management services for homes, offices, hospitals, hotels, and industrial facilities. Get a free consultation today.',
    url: 'https://fullmaintenance.com',
    siteName: 'Full Maintenance Company',
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
  themeColor: '#0B5ED7',
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
          
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            
            <main style={{ flex: 1, paddingTop: '120px' }}>
              {children}
            </main>
            
            <Footer />
          </div>

          {/* Global Floating Action Buttons */}
          <div className="floating-widgets">
            <WhatsAppButton />
          </div>
          <QuickCallButton />
        </MantineProvider>
      </body>
    </html>
  );
}
