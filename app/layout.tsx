import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: '400'
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans'
});

export const metadata: Metadata = {
  title: 'CoreSentia - AI Solutions',
  description: 'Stop talking about AI. Start closing with it.',
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
      <body className={`${montserrat.variable} ${openSans.variable}`}>{children}</body>
    </html>
  );
}
