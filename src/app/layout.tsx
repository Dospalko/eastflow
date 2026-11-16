import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'EastFlow AI: implementácia AI do procesov na východe Slovenska',
  description:
    'Vývojári, ktorí prídu do vašej firmy v Košiciach či Prešove, zmapujú pomalé procesy a zapoja AI automatizáciu do 14 dní.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
