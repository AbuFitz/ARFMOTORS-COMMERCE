import { BlogPostMeta } from "@/types/blog";

// Guide metadata. Article bodies live in ./content.ts, keyed by slug.
// Images: upload to /public/images/blog/<slug>/ with the file names used
// below (see docs/IMAGE-BRIEF.md). Until then the category photo is used.

const img = (slug: string, file: string) => `/images/blog/${slug}/${file}`;

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "how-to-choose-a-dash-cam",
    title: "How to choose a dash cam: a UK buyer's guide",
    description:
      "Front only or front and rear? What resolution, storage and parking mode actually mean, and how to pick a dash cam that suits the way you drive.",
    category: "in-car-tech",
    keyword: "best dash cam uk",
    publishedAt: "2026-09-02",
    hero: { src: img("how-to-choose-a-dash-cam", "hero.jpg"), alt: "Dash cam mounted behind a car's rear-view mirror" },
    relatedProducts: ["front-rear-dash-cam-kit", "dash-cam-hardwire-kit"],
    faqs: [
      {
        q: "Is it legal to use a dash cam in the UK?",
        a: "Yes. Dash cams are legal in the UK, as long as the camera is mounted so it doesn't block your view of the road.",
      },
      {
        q: "Do I need a front and rear dash cam?",
        a: "A front camera covers most incidents. A rear camera adds cover for shunts from behind and is worth it if you do a lot of stop-start driving.",
      },
      {
        q: "Can dash cam footage be used for insurance claims?",
        a: "Footage can help show what happened, and many insurers will accept it as supporting evidence. Check your own insurer's policy.",
      },
    ],
  },
  {
    slug: "dash-cam-hardwiring-explained",
    title: "Dash cam hardwiring explained: parking mode and a tidy install",
    description:
      "What hardwiring a dash cam involves, why you need it for parking mode, and when it makes sense to have it professionally fitted.",
    category: "in-car-tech",
    keyword: "dash cam hardwire kit",
    publishedAt: "2026-09-09",
    hero: { src: img("dash-cam-hardwiring-explained", "hero.jpg"), alt: "Dash cam hardwire kit connected to a car fuse box" },
    relatedProducts: ["dash-cam-hardwire-kit", "front-rear-dash-cam-kit"],
    faqs: [
      {
        q: "Will a hardwired dash cam drain my battery?",
        a: "Most hardwire kits have a low-voltage cut-off that switches the camera off before the battery gets too low to start the car.",
      },
      {
        q: "Can I hardwire a dash cam myself?",
        a: "If you're comfortable working with your car's fuse box, yes. If not, professional fitting avoids damaged trim and wiring problems.",
      },
    ],
  },
  {
    slug: "wireless-carplay-adapters-explained",
    title: "Wireless CarPlay adapters: how they work and whether your car is compatible",
    description:
      "How a wireless CarPlay adapter turns wired CarPlay into wireless, which cars it works with, and what to expect from day-to-day use.",
    category: "in-car-tech",
    keyword: "wireless carplay adapter",
    publishedAt: "2026-09-16",
    hero: { src: img("wireless-carplay-adapters-explained", "hero.jpg"), alt: "Car infotainment screen showing Apple CarPlay" },
    relatedProducts: ["wireless-carplay-adapter", "dual-usb-c-car-charger", "magnetic-phone-mount"],
    faqs: [
      {
        q: "Will a wireless CarPlay adapter work in my car?",
        a: "Only if your car already supports wired Apple CarPlay. The adapter makes an existing CarPlay system wireless; it can't add CarPlay to a car without it.",
      },
      {
        q: "Does wireless CarPlay drain my phone battery?",
        a: "Wireless CarPlay uses more battery than wired, because your phone isn't charging through the cable. A car charger or wireless charging mount helps on longer trips.",
      },
    ],
  },
  {
    slug: "car-breakdown-kit-checklist",
    title: "What to keep in your car: a UK breakdown kit checklist",
    description:
      "The essentials worth keeping in your car for breakdowns, flat tyres and winter journeys, and what the Highway Code says about warning triangles.",
    category: "roadside",
    keyword: "car breakdown kit",
    publishedAt: "2026-08-20",
    hero: { src: img("car-breakdown-kit-checklist", "hero.jpg"), alt: "Breakdown kit laid out in a car boot" },
    relatedProducts: ["roadside-emergency-kit", "portable-jump-starter-power-bank", "cordless-digital-tyre-inflator"],
    faqs: [
      {
        q: "Is a warning triangle a legal requirement in the UK?",
        a: "It isn't a legal requirement to carry one in the UK, but it's recommended, and it is required in many European countries.",
      },
      {
        q: "Can I use a warning triangle on the motorway?",
        a: "No. The Highway Code advises against placing a warning triangle on a motorway because walking along the hard shoulder is dangerous.",
      },
    ],
  },
  {
    slug: "how-to-check-tyre-pressure",
    title: "How to check your tyre pressure (and why it matters)",
    description:
      "Where to find the right pressure for your car, how to check and inflate your tyres at home, and how often you should do it.",
    category: "roadside",
    keyword: "how to check tyre pressure",
    publishedAt: "2026-08-27",
    hero: { src: img("how-to-check-tyre-pressure", "hero.jpg"), alt: "Digital tyre gauge being used on a car tyre valve" },
    relatedProducts: ["cordless-digital-tyre-inflator", "digital-tyre-pressure-gauge"],
    faqs: [
      {
        q: "Where do I find my car's tyre pressure?",
        a: "In your vehicle handbook, and usually on a sticker inside the driver's door frame or fuel filler flap.",
      },
      {
        q: "How often should I check my tyre pressures?",
        a: "At least once a month and before long journeys, with the tyres cold.",
      },
      {
        q: "What is the legal minimum tyre tread depth in the UK?",
        a: "1.6mm across the central three-quarters of the tread, around the whole tyre.",
      },
    ],
  },
  {
    slug: "how-to-use-a-jump-starter",
    title: "How to use a portable jump starter safely",
    description:
      "A step-by-step guide to starting a car with a portable jump starter, including the right order to connect the clamps and when not to try it.",
    category: "roadside",
    keyword: "how to use a jump starter",
    publishedAt: "2026-09-12",
    hero: { src: img("how-to-use-a-jump-starter", "hero.jpg"), alt: "Portable jump starter connected to a car battery" },
    relatedProducts: ["portable-jump-starter-power-bank", "digital-multimeter"],
    faqs: [
      {
        q: "Can a jump starter damage my car?",
        a: "Used correctly, no. Most modern jump starters have reverse-polarity and short-circuit protection, but always follow the instructions for your model.",
      },
      {
        q: "How long should I drive after a jump start?",
        a: "Aim for at least 30 minutes of normal driving to put some charge back into the battery. If it keeps going flat, have the battery tested.",
      },
    ],
  },
  {
    slug: "phone-mounts-and-the-law",
    title: "Using your phone in the car: phone mounts and the UK law",
    description:
      "What the UK rules say about using a phone while driving, how to mount it legally for navigation, and choosing a mount that stays put.",
    category: "accessories",
    keyword: "phone holder for car uk law",
    publishedAt: "2026-08-13",
    hero: { src: img("phone-mounts-and-the-law", "hero.jpg"), alt: "Phone in a vent mount showing navigation" },
    relatedProducts: ["magnetic-phone-mount", "dual-usb-c-car-charger", "braided-usb-c-cable-2m-2-pack"],
    faqs: [
      {
        q: "Is it illegal to touch my phone while driving?",
        a: "It's illegal to hold and use a phone while driving, including when stopped at traffic lights or in queuing traffic.",
      },
      {
        q: "What is the penalty for using a phone while driving?",
        a: "Six penalty points and a £200 fine. If you passed your test in the last two years, that is enough to lose your licence.",
      },
    ],
  },
  {
    slug: "basic-car-tool-kit",
    title: "The basic car tool kit every driver should own",
    description:
      "The small set of tools and kit that handles most roadside jobs and simple checks at home, and what's worth keeping in the boot.",
    category: "tools",
    keyword: "car tool kit",
    publishedAt: "2026-09-05",
    hero: { src: img("basic-car-tool-kit", "hero.jpg"), alt: "Compact car tool kit open on a garage floor" },
    relatedProducts: ["compact-car-tool-kit", "rechargeable-led-work-light", "digital-multimeter"],
  },
  {
    slug: "test-car-battery-with-multimeter",
    title: "How to test a car battery with a multimeter",
    description:
      "Check your car battery's health in five minutes with a digital multimeter, and learn what the voltage readings actually mean.",
    category: "tools",
    keyword: "test car battery with multimeter",
    publishedAt: "2026-09-19",
    hero: { src: img("test-car-battery-with-multimeter", "hero.jpg"), alt: "Multimeter probes on a car battery's terminals" },
    relatedProducts: ["digital-multimeter", "portable-jump-starter-power-bank", "rechargeable-led-work-light"],
    faqs: [
      {
        q: "What voltage should a car battery read?",
        a: "Around 12.6V when fully charged and rested. Below about 12.2V it's partly discharged, and below 12V it needs charging.",
      },
      {
        q: "What should the voltage be with the engine running?",
        a: "Roughly 13.7V to 14.7V, which shows the alternator is charging the battery.",
      },
    ],
  },
];

export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

/** Newest first */
export function getAllPosts(): BlogPostMeta[] {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Guides that mention a product, then others from the same category */
export function getGuidesForProduct(productSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const direct = BLOG_POSTS.filter((p) => p.relatedProducts.includes(productSlug));
  const sameCategory = BLOG_POSTS.filter((p) => p.category === category && !direct.includes(p));
  return [...direct, ...sameCategory].slice(0, limit);
}
