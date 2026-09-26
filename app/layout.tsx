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
    default: "ARF Motors | Premium BMW Retrofits & Styling",
    template: "%s | ARF Motors",
  },
  description:
    "BMW styling and performance parts from ARF Motors, delivered from UK stock, with optional fitting via FixNow Mechanics.",
  keywords: [
    "BMW retrofit",
    "BMW styling",
    "BMW performance parts",
    "BMW upgrades",
    "BMW parts UK",
    "BMW M Performance",
    "BMW parts eBay",
    "BMW parts fitting",
    "ARF Motors",
    "ARF Commerce",
    "FixNow Mechanics",
  ],
  authors: [{ name: "ARF Motors" }],
  creator: "ARF Motors",
  publisher: "ARF Commerce Ltd",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ARF Motors",
    title: "ARF Motors | Premium BMW Retrofits & Styling",
    description:
      "BMW styling and performance parts, with optional fitting via FixNow Mechanics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARF Motors",
    description: "Premium BMW styling and performance parts.",
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
