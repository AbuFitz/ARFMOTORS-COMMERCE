import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { EmailPopup } from "@/components/email-popup";
import { StickySupportButton } from "@/components/sticky-support-button";
import "@/styles/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arfcommerce.co.uk";
const DESCRIPTION =
  "Shop carefully selected products from ARF Commerce — automotive accessories, electronics, tools and everyday essentials, delivered from the UK. Professional fitting available on eligible automotive items.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  title: {
    default: "ARF Commerce | Online Store",
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
    title: "ARF Commerce | Online Store",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "ARF Commerce",
    description: DESCRIPTION,
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
