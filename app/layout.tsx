import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { EmailPopup } from "@/components/email-popup";
import { StickySupportButton } from "@/components/sticky-support-button";
import "@/styles/globals.css";

/**
 * Note: Google Fonts (Inter & Outfit) are loaded via CDN in production
 * to avoid build-time network dependencies. System fonts used as fallbacks.
 *
 * To enable Google Fonts in production, uncomment the link in the <head> below.
 */

export const metadata: Metadata = {
  title: {
    default: "ARFMODS Automotive | Premium BMW Retrofits & Styling",
    template: "%s | ARFMODS Automotive",
  },
  description:
    "The official BMW retrofit, styling, and performance division of ARF Automotive Group. Curated BMW parts with optional fitting via FixNow Mechanics.",
  keywords: [
    "BMW retrofit",
    "BMW styling",
    "BMW performance parts",
    "BMW upgrades",
    "BMW parts UK",
    "BMW M Performance",
    "BMW parts eBay",
    "BMW parts fitting",
    "ARF Automotive",
    "FixNow Mechanics",
  ],
  authors: [{ name: "ARFMODS Automotive" }],
  creator: "ARFMODS Automotive",
  publisher: "ARF Automotive Group",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ARFMODS Automotive",
    title: "ARFMODS Automotive | Premium BMW Retrofits & Styling",
    description:
      "The official BMW retrofit and styling division of ARF Automotive Group. Curated parts with optional fitting via FixNow Mechanics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARFMODS Automotive",
    description: "Premium BMW retrofits & styling. Part of ARF Automotive Group.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Premium Fonts - Space Grotesk, Rajdhani, JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-neutral-900">
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieBanner />
        <EmailPopup />
        <StickySupportButton />
      </body>
    </html>
  );
}
