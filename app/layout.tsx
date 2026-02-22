import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Inter, Raleway, JetBrains_Mono } from 'next/font/google';
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

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['400', '500', '600', '700']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700']
});

export const metadata: Metadata = {
  title: 'CoreSentia — AI-Native Application Development',
  description: 'CoreSentia builds intelligent applications, AI automation, and production SaaS systems. Brisbane-based development studio specialising in AI-native software.',
  keywords: [
    'AI application development',
    'SaaS development Australia',
    'AI automation Brisbane',
    'custom software development',
    'AI-native applications',
    'internal tools development',
    'production AI systems',
    'CoreSentia',
    'Next.js development',
    'Claude AI integration'
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
    title: 'CoreSentia — AI-Native Application Development',
    description: 'We build intelligent applications, AI automation, and production SaaS systems. Brisbane-based development studio.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoreSentia — AI-Native Application Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreSentia — AI-Native Application Development',
    description: 'We build intelligent applications, AI automation, and production SaaS systems.',
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
    google: 'pending',
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
      <body className={`${montserrat.variable} ${inter.variable} ${raleway.variable} ${jetbrainsMono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
