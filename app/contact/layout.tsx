import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  alternates: { canonical: "/contact" },
  description: "Get in touch with ARF Commerce about a product, an order or fitting.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
