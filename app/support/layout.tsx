import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Answers to common questions about ARF Commerce orders, delivery, returns and professional fitting.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
