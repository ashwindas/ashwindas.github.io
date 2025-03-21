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
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="description" content="Ashwin Das is a software engineer and tech leader with expertise in distributed systems, developer productivity, and engineering leadership." />
        
        {/* Add color-scheme meta tag to ensure proper theme detection */}
        <meta name="color-scheme" content="dark light" />
        
        {/* Add theme-color meta tag for mobile browsers */}
        <meta name="theme-color" content="#ffffff" data-mode="light" />
        <meta name="theme-color" content="#1f2937" data-mode="dark" />
        
        {/* Theme helper script using Next.js Script component */}
        <Script
          id="theme-helper"
          src="/theme-helper.js"
          strategy="beforeInteractive"
        />
        
        {/* Preload dark mode detection */}
        <Script id="theme-preload" strategy="beforeInteractive">{`
          (function() {
            try {
              // Try to read theme preference
              const savedTheme = localStorage.getItem('theme-preference');
              // Default to dark rather than using system preference
              const initialTheme = savedTheme || 'dark';
              
              // Set color scheme for browsers
              document.querySelector('meta[name="color-scheme"]').content = initialTheme === 'dark' ? 'dark light' : 'light dark';
              
              // Toggle the correct theme-color meta tag
              const metaThemeColorLight = document.querySelector('meta[name="theme-color"][data-mode="light"]');
              const metaThemeColorDark = document.querySelector('meta[name="theme-color"][data-mode="dark"]');
              
              if (initialTheme === 'dark') {
                metaThemeColorLight.remove();
              } else {
                metaThemeColorDark.remove();
              }
            } catch(e) {
              console.warn('Early theme detection error:', e);
            }
          })();
        `}</Script>
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
              "description": "Engineering Leader with over 15 years of experience driving technical excellence in distributed systems, payments and risk management. Outside of work, a father of two who enjoys podcasts, non-fiction books, and hiking.",
              "url": "https://ashwindas.github.io",
              "knowsAbout": ["Engineering Management", "Distributed Systems", "Payments", "Risk Management", "AI Solutions"],
              "hobbies": ["Podcasts", "Reading Non-Fiction", "Hiking", "Photography"]
            }
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-base-100 dark:bg-gray-900 text-base-content dark:text-gray-100 flex flex-col">
            <header>
              <Navigation />
            </header>
            <main className="flex-grow text-base-content dark:text-gray-100">{children}</main>
            <footer className="bg-base-200 dark:bg-base-300 py-6 text-base-content dark:text-gray-200">
              <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-base-content dark:text-gray-200">
                  &copy; {new Date().getFullYear()} Ashwin Das Gururaja. All Rights Reserved.
                </p>
                <p className="text-xs mt-2 text-base-content dark:text-gray-200">
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
