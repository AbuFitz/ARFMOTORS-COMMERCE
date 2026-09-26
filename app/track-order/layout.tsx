import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track an order",
  robots: { index: false },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
