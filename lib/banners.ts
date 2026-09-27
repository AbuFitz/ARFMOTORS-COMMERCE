// Homepage banner slideshow.
//
// Frame sizes (make artwork at exactly these sizes and it fits with no cropping):
//   desktop  2400 x 480 px  (5:1)  shown on tablets and up, max 1216 x 243 on screen
//   mobile   1200 x 400 px  (3:1)  shown edge to edge on phones, about 390 x 130
//
// Upload to /public/images/banners/ and list the files below. `mobile` is
// optional: without it phones show the desktop artwork scaled to fit.
// `position` sets which part of older artwork stays in view on desktop
// (CSS object-position, e.g. "50% 55%"); it isn't needed for 5:1 artwork.

export interface Banner {
  desktop: string;
  mobile?: string;
  position?: string;
  /** Describe the banner, including its text, for screen readers and SEO. */
  alt: string;
  href: string;
  label: string;
}

export const BANNERS: Banner[] = [
  {
    desktop: "/images/banners/supply-and-fit.jpg",
    position: "50% 56%",
    alt: "FixNow Mechanics x ARF Commerce Supply & Fit Partnership. Products supplied by ARF Commerce, installation support through FixNow Mechanics.",
    href: "/installation",
    label: "How installation works",
  },
  {
    desktop: "/images/banners/offers-and-savings.jpg",
    position: "50% 44%",
    alt: "ARF Commerce Offers & Savings. Keep an eye out for deals across selected lines.",
    href: "/shop?featured=1",
    label: "Shop featured products",
  },
  {
    desktop: "/images/banners/trusted-ordering.jpg",
    position: "50% 46%",
    alt: "Trusted Online Ordering. A smooth experience from checkout to delivery.",
    href: "/support",
    label: "Delivery and help",
  },
];
