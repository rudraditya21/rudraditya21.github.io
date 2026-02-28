import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ClickSpark from "@/components/click-spark";

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

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: "Rudraditya Thakur | Systems Engineer",
  description: "Software engineer specializing in systems programming, compilers, cybersecurity, and AI/ML. Exploring rust, linux internals, security architecture, and distributed systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ClickSpark
          sparkColor='#00c8ff'
          sparkSize={8}
          sparkRadius={12}
          sparkCount={6}
          duration={300}>
          <Header />
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
