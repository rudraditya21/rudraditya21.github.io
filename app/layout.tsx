import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rudraditya21.github.io'),
  title: 'Rudraditya Thakur',
  description: 'Turning caffeine into products.',
  openGraph: {
    title: 'Rudraditya Thakur',
    description: 'Turning caffeine into products.',
    url: 'https://rudraditya21.github.io',
    siteName: 'Rudraditya Thakur',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rudraditya Thakur',
    description: 'Turning caffeine into products.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
