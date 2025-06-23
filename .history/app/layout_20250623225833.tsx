import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WashMyClothes",
  keywords: [
    "laundry",
    "wash and fold",
    "dry cleaning",
    "professional laundry",
    "clothes cleaning",
    "fast laundry service",
    "affordable laundry",
  ],
  description:
    "Professional laundry services with wash & fold, dry cleaning, and more. Fast, efficient, and affordable.",
  generator: 'v0.dev',
  // Add Facebook domain verification using other metadata
  other: {
    'facebook-domain-verification': 'q5bsqtwp02qhah9aissnw4qpx8wdoc'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}