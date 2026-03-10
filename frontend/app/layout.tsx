import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Armatrix | Inspection Reimagined",
  description: "Cinematic robotics website built with Next.js, Tailwind CSS, and Framer Motion.",
  icons: {
    icon: [
      {
        url: "/media/brand/logo-black.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/media/brand/logo-black.svg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}