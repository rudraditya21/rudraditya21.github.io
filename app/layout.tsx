import type { Metadata } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const unbounded = Unbounded({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-unbounded',
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
    <html lang="en" className={`${dmSans.variable} ${unbounded.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
