import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3hx — Developer",
  description: "3hx — Developer. discord · github · email",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jbMono.variable} font-mono bg-term-bg text-term antialiased selection:bg-term selection:text-term-bg`}
      >
        {children}
      </body>
    </html>
  );
}
