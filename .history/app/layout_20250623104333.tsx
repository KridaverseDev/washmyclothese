import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Head from "next/head";

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
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
     
        <meta
          name="facebook-domain-verification"
          content="q5bsqtwp02qhah9aissnw4qpx8wdoc"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}


import './globals.css'