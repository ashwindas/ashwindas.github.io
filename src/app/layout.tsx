import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashwin Das Gururaja | Engineering Leader @ Adobe | Payments & Risk",
  description: "Welcome to my personal portfolio website. Explore my projects, skills, and experiences as an Engineering Leader at Adobe focusing on Payments & Risk.",
  keywords: ["portfolio", "engineering leader", "Adobe", "payments", "risk", "software engineer", "web development"],
  metadataBase: new URL('https://ashwindas.github.io'),
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
        {/* Theme helper script using Next.js Script component */}
        <Script 
          id="theme-helper" 
          src="/theme-helper.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-base-100 dark:bg-gray-900 text-base-content dark:text-gray-100">
            <Navigation />
            <main>{children}</main>
          </div>
        </Providers>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
      </body>
    </html>
  );
}
