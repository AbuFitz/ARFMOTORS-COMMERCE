import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { EmailPopup } from "@/components/email-popup";
import { StickySupportButton } from "@/components/sticky-support-button";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arfcommerce.co.uk";
const DESCRIPTION =
  "Car accessories, in-car tech, roadside essentials and tools from ARF Commerce, delivered from the UK. Professional fitting is available on selected products.";

export const viewport: Viewport = { themeColor: "#111214" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  title: {
    default: "ARF Commerce | Car Accessories, In-Car Tech & Tools",
    template: "%s | ARF Commerce",
  },
  description: DESCRIPTION,
  applicationName: "ARF Commerce",
  authors: [{ name: "ARF Commerce Ltd" }],
  creator: "ARF Commerce Ltd",
  publisher: "ARF Commerce Ltd",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "ARF Commerce",
    title: "ARF Commerce | Car Accessories, In-Car Tech & Tools",
    description: DESCRIPTION,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "ARF Commerce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARF Commerce",
    description: DESCRIPTION,
    images: ["/og-default.jpg"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-neutral-900">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
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
