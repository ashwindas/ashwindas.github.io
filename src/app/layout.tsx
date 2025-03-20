import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashwin Das Gururaja | Engineering Leader at Adobe | Payments & Risk",
  description: "Engineering leader with 15+ years of experience in building and scaling distributed systems, payments, risk management, and AI solutions at Adobe.",
  keywords: ["engineering manager", "engineering leadership", "Adobe", "payments", "risk management", "distributed systems", "AI solutions"],
  metadataBase: new URL('https://ashwindas.github.io'),
  authors: [{ name: "Ashwin Das Gururaja" }],
  creator: "Ashwin Das Gururaja",
  publisher: "Ashwin Das Gururaja",
  openGraph: {
    title: "Ashwin Das Gururaja | Engineering Leader at Adobe",
    description: "Engineering leader with 15+ years of experience in building and scaling distributed systems, payments, risk management, and AI solutions.",
    url: 'https://ashwindas.github.io',
    siteName: 'Ashwin Das Gururaja Portfolio',
    images: [
      {
        url: 'https://ashwindas.github.io/images/headshot.jpg',
        width: 200,
        height: 200,
        alt: 'Ashwin Das Gururaja',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Ashwin Das Gururaja | Engineering Leader at Adobe",
    description: "Engineering leader with 15+ years of experience in building and scaling distributed systems, payments, risk management, and AI solutions.",
    images: ['https://ashwindas.github.io/images/headshot.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Create appropriate CSP based on environment
  const cspContent = isDevelopment
    ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws: wss:; upgrade-insecure-requests;"
    : "default-src https: 'self'; script-src https: 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src https: 'self' 'unsafe-inline'; img-src https: 'self' data:; font-src https: 'self' data:; connect-src https: 'self' https://www.google-analytics.com; upgrade-insecure-requests;";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta 
          httpEquiv="Content-Security-Policy" 
          content={cspContent}
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Structured Data for Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ashwin Das Gururaja",
              "jobTitle": "Senior Engineering Manager",
              "worksFor": {
                "@type": "Organization",
                "name": "Adobe"
              },
              "description": "Engineering Leader with over 15 years of experience driving technical excellence in distributed systems, payments and risk management.",
              "url": "https://ashwindas.github.io",
              "knowsAbout": ["Engineering Management", "Distributed Systems", "Payments", "Risk Management", "AI Solutions"]
            }
            `
          }}
        />
        {/* Theme helper script using Next.js Script component */}
        <Script 
          id="theme-helper" 
          src="/theme-helper.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-base-100 dark:bg-gray-900 text-base-content dark:text-gray-100 flex flex-col">
            <header>
              <Navigation />
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="bg-base-200 dark:bg-base-300 py-6">
              <div className="container mx-auto px-4 text-center">
                <p className="text-sm">
                  &copy; {new Date().getFullYear()} Ashwin Das Gururaja. All Rights Reserved.
                </p>
                <p className="text-xs mt-2">
                  <a href="/privacy.html" className="link link-hover link-primary">Privacy Policy</a>
                </p>
              </div>
            </footer>
          </div>
        </Providers>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
      </body>
    </html>
  );
}
