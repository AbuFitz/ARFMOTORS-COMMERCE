import { ProductCategory } from "@/types/product";

// SEO copy for the category landing pages at /shop/<category>.

export interface CategoryContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: { heading: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const CATEGORY_CONTENT: Record<ProductCategory, CategoryContent> = {
  "in-car-tech": {
    metaTitle: "Dash Cams, Reversing Cameras & In-Car Tech",
    metaDescription:
      "Shop dash cams, reversing cameras, wireless CarPlay adapters and OBD2 code readers. UK delivery, with professional fitting available on selected products.",
    intro:
      "Dash cams, reversing cameras, wireless CarPlay adapters and diagnostic tools. Selected products can be professionally fitted by FixNow Mechanics.",
    body: [
      {
        heading: "Dash cams and reversing cameras",
        text: "A dash cam gives you a clear record if something happens on the road, and a front and rear kit covers you from behind too. Our reversing camera kits add a view of what's behind you to cars that didn't come with one. If you'd rather not route cables yourself, add fitting at checkout on eligible products.",
      },
      {
        heading: "CarPlay and diagnostics",
        text: "A wireless CarPlay adapter makes your car's existing wired CarPlay work without a cable. A Bluetooth OBD2 reader connects to your car's diagnostic port so you can read and clear fault codes from your phone.",
      },
    ],
    faqs: [
      { q: "Can you fit a dash cam for me?", a: "Yes. Products marked as fitting-eligible can be professionally installed by our fitting partner, FixNow Mechanics. Add fitting on the product page." },
      { q: "Will a wireless CarPlay adapter work in my car?", a: "Only if your car already has wired Apple CarPlay. The adapter makes it wireless but can't add CarPlay to a car without it." },
      { q: "Do I need to hardwire a dash cam?", a: "Only if you want parking mode. For recording while you drive, the 12V socket is enough." },
    ],
  },
  accessories: {
    metaTitle: "Car Accessories: Phone Mounts, Chargers & Organisers",
    metaDescription:
      "Car phone mounts, fast USB-C car chargers, cables, Bluetooth adapters and boot organisers. Practical car accessories with UK delivery from ARF Commerce.",
    intro: "Phone mounts, fast chargers, cables and interior accessories that make everyday driving easier.",
    body: [
      {
        heading: "Mounts, chargers and cables",
        text: "A secure phone mount keeps navigation in view without holding your phone, which UK law doesn't allow while driving. Pair it with a fast USB-C car charger and a durable braided cable so your phone arrives with more charge than it left with.",
      },
      {
        heading: "Interior and boot accessories",
        text: "Boot organisers keep shopping, kit and emergency gear from sliding around, and a Bluetooth aux adapter adds hands-free calls and music streaming to older cars.",
      },
    ],
    faqs: [
      { q: "Is it legal to use a phone mount in the UK?", a: "Yes, as long as the mount doesn't block your view of the road and you don't hold or handle the phone while driving." },
      { q: "Will a USB-C car charger fast charge my phone?", a: "Most modern phones fast charge over USB-C Power Delivery. Check the charger's output against what your phone supports." },
    ],
  },
  roadside: {
    metaTitle: "Jump Starters, Tyre Inflators & Breakdown Kits",
    metaDescription:
      "Portable jump starters, cordless tyre inflators, tyre gauges and roadside emergency kits. Be ready for a flat battery or tyre, with UK delivery.",
    intro: "Jump starters, tyre inflators and emergency kit for flat batteries, low tyres and breakdowns.",
    body: [
      {
        heading: "Be ready for a flat battery or tyre",
        text: "A portable jump starter lets you start a car with a flat battery without waiting for another vehicle, and most double as a power bank for your phone. A cordless tyre inflator and a digital gauge make it easy to keep tyres at the right pressure, which helps grip, braking and fuel economy.",
      },
      {
        heading: "Breakdown and emergency kit",
        text: "A roadside kit with a warning triangle, hi-vis vest, first aid and a torch means you have the essentials if you break down. Our [breakdown kit checklist](/blog/car-breakdown-kit-checklist) covers what's worth keeping in the car.",
      },
    ],
    faqs: [
      { q: "Can a jump starter start a diesel?", a: "Yes, if it's rated for your engine size. Check the product's engine rating before you buy." },
      { q: "How often should I check my tyre pressures?", a: "At least once a month and before long journeys, with the tyres cold." },
    ],
  },
  tools: {
    metaTitle: "Car Tools: Tool Kits, Multimeters & Work Lights",
    metaDescription:
      "Compact car tool kits, digital multimeters and rechargeable LED work lights for roadside jobs and simple checks at home. UK delivery from ARF Commerce.",
    intro: "Tool kits, test equipment and work lights for roadside jobs and simple checks at home.",
    body: [
      {
        heading: "Tools for the boot and the garage",
        text: "A compact tool kit handles most small roadside jobs, and a rechargeable LED work light helps when it's dark or you're working under the bonnet. A digital multimeter lets you [test your car battery](/blog/test-car-battery-with-multimeter) in a few minutes.",
      },
    ],
    faqs: [
      { q: "What tools should I keep in my car?", a: "A basic socket and screwdriver set, a torch or work light, gloves, and a tyre gauge cover most roadside situations." },
      { q: "Can I test my car battery with a multimeter?", a: "Yes. A healthy, fully charged battery reads around 12.6V with the engine off." },
    ],
  },
};
