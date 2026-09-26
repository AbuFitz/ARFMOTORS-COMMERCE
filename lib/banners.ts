// Homepage banner slideshow. Banners are 3:1 artwork with the text on the
// left. Mobile shows the whole banner (3:1); desktop shows 4.5:1, trimming
// about a sixth off the top and bottom, so keep text away from those edges.
// Add a slide by uploading to /public/images/banners/ and adding it here.

export interface Banner {
  src: string;
  /** Describe the banner, including its text, for screen readers and SEO. */
  alt: string;
  href: string;
  label: string;
}

export const BANNERS: Banner[] = [
  {
    src: "/images/banners/supply-and-fit.jpg",
    alt: "FixNow Mechanics x ARF Commerce Supply & Fit Partnership. Products supplied by ARF Commerce, installation support through FixNow Mechanics.",
    href: "/installation",
    label: "How installation works",
  },
  {
    src: "/images/banners/offers-and-savings.jpg",
    alt: "ARF Commerce Offers & Savings. Keep an eye out for deals across selected lines.",
    href: "/shop?featured=1",
    label: "Shop featured products",
  },
  {
    src: "/images/banners/trusted-ordering.jpg",
    alt: "Trusted Online Ordering. A smooth experience from checkout to delivery.",
    href: "/support",
    label: "Delivery and help",
  },
];
