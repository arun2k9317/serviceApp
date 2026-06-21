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
    default: 'Professional Facility Maintenance & Deep Cleaning | Full Maintenance',
    template: '%s | Full Maintenance',
  },
  description:
    'Kerala’s premier provider of professional AC maintenance, home deep cleaning, electrical upgrades, plumbing repairs, and annual maintenance contracts (AMC). Book a free site inspection today.',
  keywords: [
    'facility maintenance Kerala',
    'deep cleaning Kochi',
    'AC maintenance Trivandrum',
    'plumbing repairs',
    'electrical services',
    'annual maintenance contracts',
    'AMC packages Kerala',
    'mobile car wash Kochi',
  ],
  authors: [{ name: 'Full Maintenance Company' }],
  creator: 'Full Maintenance Company',
  metadataBase: new URL('https://fullmaintenance.com'), // Replace with actual domain in production
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Professional Facility Maintenance & Deep Cleaning | Full Maintenance',
    description: 'Trusted residential and commercial facility maintenance services across Kerala. Get a free inspection or AMC quote.',
    url: 'https://fullmaintenance.com',
    siteName: 'Full Maintenance Company',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Facility Maintenance Solutions',
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
