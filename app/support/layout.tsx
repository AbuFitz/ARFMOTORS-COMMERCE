import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { FAQS } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Answers to common questions about ARF Commerce orders, delivery, returns and professional fitting.",
  alternates: { canonical: "/support" },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS.flatMap((g) => g.questions))} />
      {children}
    </>
  );
}
