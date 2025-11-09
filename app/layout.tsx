import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700']
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: 'CoreSentia - AI Receptionist for Australian Service Businesses | SMS Automation',
  description: 'Never miss a lead again. CoreSentia provides 24/7 AI-powered SMS and web chat for tradies and service businesses. From $499 setup + $150/month. Australian owned, GST included.',
  keywords: [
    'AI receptionist Australia',
    'SMS automation tradies',
    'AI booking system',
    'automated receptionist',
    'tradie lead capture',
    'AI chatbot Australia',
    'business SMS automation',
    'appointment booking AI',
    'CoreSentia',
    'service business automation'
  ],
  authors: [{ name: 'CoreSentia', url: 'https://www.coresentia.com.au' }],
  creator: 'CoreSentia',
  publisher: 'CoreSentia',
  metadataBase: new URL('https://www.coresentia.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.coresentia.com.au',
    siteName: 'CoreSentia',
    title: 'CoreSentia - AI Receptionist for Australian Service Businesses',
    description: 'Never miss a lead again. 24/7 AI-powered SMS and web chat for tradies and service businesses. From $499 setup + $150/month.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoreSentia - AI Receptionist for Australian Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreSentia - AI Receptionist for Australian Service Businesses',
    description: 'Never miss a lead again. 24/7 AI-powered SMS and web chat for tradies and service businesses.',
    images: ['/og-image.png'],
    creator: '@coresentia',
  },
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
  verification: {
    google: 'pending', // Will be updated after Google Search Console setup
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
