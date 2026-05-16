import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-body' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Ambica Home Decor — Handcrafted Luxury Home Decor',
    template: '%s | Ambica Home Decor'
  },
  description: 'Discover our exclusive collection of luxury home decor, accessories and art.',
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}