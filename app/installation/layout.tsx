import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Installation",
  description:
    "Selected products from ARF Commerce can be professionally installed by our fitting partner, FixNow Mechanics.",
};

export default function InstallationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
