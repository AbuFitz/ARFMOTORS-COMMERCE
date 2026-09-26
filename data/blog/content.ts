import { BlogBlock } from "@/types/blog";

// Article bodies, keyed by slug (see ./meta.ts for titles and SEO fields).
// Image blocks only render once the file exists in /public.

const img = (slug: string, file: string) => `/images/blog/${slug}/${file}`;

export const BLOG_CONTENT: Record<string, BlogBlock[]> = {
  // ───────────────────────────────────────────────────────────
  "how-to-choose-a-dash-cam": [
    {
      type: "p",
      text: "A dash cam records what happens in front of (and sometimes behind) your car. If you're involved in a collision, a crash-for-cash scam or a dispute about who was at fault, clear footage can save a lot of argument. This guide covers the features that matter, the ones that don't, and how to choose a camera that suits the way you drive.",
    },
    { type: "h2", text: "Front only, or front and rear?" },
    {
      type: "p",
      text: "A **front camera** covers the majority of incidents: pulling out, lane changes, junctions and roundabouts. A **front and rear kit** adds a second camera on the back window, which is useful if you do a lot of stop-start commuting where rear-end shunts are common.",
    },
    {
      type: "p",
      text: "If you're unsure, a two-channel kit like our [Front & Rear Dash Cam Kit](/product/front-rear-dash-cam-kit) gives you the most complete record without much extra cost.",
    },
    { type: "h2", text: "What to look for" },
    {
      type: "ul",
      items: [
        "**Video quality you can actually read.** What matters is whether you can read a number plate at a sensible distance, day and night. Look at sample footage rather than headline resolution alone.",
        "**Loop recording.** The camera records continuously and overwrites the oldest footage when the card is full, so you never have to clear it manually.",
        "**Impact detection (G-sensor).** When the camera senses a bump, it locks that clip so it can't be overwritten.",
        "**A good memory card.** Use a high-endurance microSD card designed for constant recording. Cheap cards fail sooner.",
        "**A compact design.** A smaller camera tucks in behind the mirror and is less of a distraction.",
      ],
    },
    { type: "image", src: img("how-to-choose-a-dash-cam", "1.jpg"), alt: "Rear dash cam fitted to the top of a car's back window", caption: "A rear camera covers shunts from behind." },
    { type: "h2", text: "Parking mode" },
    {
      type: "p",
      text: "Parking mode keeps the camera watching while the car is parked, and records if it detects an impact or movement. It needs a constant power supply, so it usually means **hardwiring** the camera into your fuse box rather than using the 12V socket. Our guide to [dash cam hardwiring](/blog/dash-cam-hardwiring-explained) explains how that works.",
    },
    { type: "h2", text: "Where to mount it" },
    {
      type: "p",
      text: "Mount the camera high on the windscreen, behind the rear-view mirror, so it doesn't block your view of the road. Keep it within the area cleared by the wipers so rain doesn't spoil the footage, and route the cable neatly around the headlining and pillar trim.",
    },
    {
      type: "tip",
      title: "Want it fitted for you?",
      text: "Selected dash cams can be professionally installed by our fitting partner, FixNow Mechanics, including hardwiring for parking mode. Tick \"Add fitting\" on the product page. [How installation works](/installation)",
    },
    { type: "products", slugs: ["front-rear-dash-cam-kit", "dash-cam-hardwire-kit"] },
    { type: "h2", text: "Looking after your footage" },
    {
      type: "p",
      text: "If you're involved in an incident, save the clip straight away and make a copy. Format the memory card in the camera every month or two to keep it healthy, and check the camera is still recording after any software update.",
    },
  ],

  // ───────────────────────────────────────────────────────────
  "dash-cam-hardwiring-explained": [
    {
      type: "p",
      text: "Most dash cams come with a cable that plugs into your 12V socket. That's fine for recording while you drive, but it ties up the socket, leaves a cable across the dashboard, and usually cuts the power when the ignition is off. Hardwiring solves all three.",
    },
    { type: "h2", text: "What hardwiring means" },
    {
      type: "p",
      text: "A hardwire kit connects the dash cam straight to your car's fuse box using fuse taps. The cable is routed behind the trim, so nothing is visible, and the camera can be powered even when the car is parked.",
    },
    { type: "h2", text: "Why you need it for parking mode" },
    {
      type: "p",
      text: "Parking mode needs the camera to stay powered with the engine off. A hardwire kit takes power from a permanently live fuse, while a second connection tells the camera when the ignition is on or off so it can switch between driving and parking recording.",
    },
    {
      type: "tip",
      title: "Protecting your battery",
      text: "Good hardwire kits include a low-voltage cut-off. If your battery voltage drops below a set level, the kit turns the camera off so you can still start the car.",
    },
    { type: "image", src: img("dash-cam-hardwiring-explained", "1.jpg"), alt: "Fuse tap fitted in a car fuse box", caption: "Fuse taps let the kit draw power without cutting any wires." },
    { type: "h2", text: "What's involved" },
    {
      type: "ol",
      items: [
        "Find your fuse box (usually under the dashboard or in the footwell) and identify a permanent live fuse and an ignition-switched fuse.",
        "Fit the fuse taps and connect the kit's earth wire to a bare metal bolt.",
        "Route the cable up the A-pillar and along the headlining to the camera.",
        "Test that the camera powers on with the ignition and switches to parking mode when you turn off.",
      ],
    },
    {
      type: "warning",
      title: "Take care around airbags",
      text: "Many cars have curtain airbags in the A-pillar. Route cables behind the airbag, not in front of it, so they can't interfere if it deploys. If you're not sure, get it fitted.",
    },
    { type: "h2", text: "DIY or professional fitting?" },
    {
      type: "p",
      text: "If you're comfortable identifying fuses with a multimeter and removing trim panels, it's a manageable job. If not, professional fitting avoids broken clips, blown fuses and electrical faults. Our [Dash Cam Hardwire Kit](/product/dash-cam-hardwire-kit) is eligible for fitting by FixNow Mechanics.",
    },
    { type: "products", slugs: ["dash-cam-hardwire-kit", "front-rear-dash-cam-kit", "digital-multimeter"] },
  ],

  // ───────────────────────────────────────────────────────────
  "wireless-carplay-adapters-explained": [
    {
      type: "p",
      text: "Plenty of cars from the last few years support Apple CarPlay, but only with a cable. A wireless CarPlay adapter removes the need to plug in every time you get in the car.",
    },
    { type: "h2", text: "How it works" },
    {
      type: "p",
      text: "The adapter plugs into the USB port your car uses for CarPlay. Your car thinks a phone is plugged in, and the adapter connects to your iPhone over Bluetooth and Wi-Fi. Once it's paired, your phone connects automatically a few seconds after you start the car.",
    },
    { type: "h2", text: "Will it work in my car?" },
    {
      type: "ul",
      items: [
        "Your car **must already support wired Apple CarPlay**. The adapter can't add CarPlay to a car that doesn't have it.",
        "It needs to go in the USB port that CarPlay uses. Some cars have several ports, and only one supports CarPlay.",
        "Your iPhone needs to support CarPlay, which almost all recent iPhones do.",
      ],
    },
    { type: "image", src: img("wireless-carplay-adapters-explained", "1.jpg"), alt: "Wireless CarPlay adapter plugged into a car's USB port" },
    { type: "h2", text: "What to expect" },
    {
      type: "p",
      text: "Music, maps and calls work as they do with a cable. There can be a very slight delay on audio compared with wired CarPlay, which you'll notice most when skipping tracks. Wireless connections use more of your phone's battery, so keep a [car charger](/product/dual-usb-c-car-charger) handy for longer journeys.",
    },
    {
      type: "tip",
      title: "Tidy the setup",
      text: "Pair the adapter with a [magnetic phone mount](/product/magnetic-phone-mount) so your phone stays visible and secure without cables across the dashboard.",
    },
    { type: "products", slugs: ["wireless-carplay-adapter", "dual-usb-c-car-charger", "magnetic-phone-mount"] },
  ],

  // ───────────────────────────────────────────────────────────
  "car-breakdown-kit-checklist": [
    {
      type: "p",
      text: "Breakdowns rarely happen at a convenient time. A small kit in the boot makes a flat battery, puncture or long wait at the roadside safer and a lot less stressful. Here's what's worth carrying.",
    },
    { type: "h2", text: "The essentials" },
    {
      type: "ul",
      items: [
        "**Warning triangle** to alert other drivers (not for use on motorways).",
        "**Hi-vis vest** for everyone who might need to get out of the car.",
        "**Portable jump starter** so you're not relying on someone else's car. See our guide to [using a jump starter](/blog/how-to-use-a-jump-starter).",
        "**Tyre inflator and pressure gauge** for slow punctures and routine checks.",
        "**Torch or work light**, ideally one with a magnetic base so your hands are free.",
        "**Phone charger and cable** so you can call for help.",
        "**First aid kit**, kept somewhere easy to reach.",
      ],
    },
    { type: "image", src: img("car-breakdown-kit-checklist", "1.jpg"), alt: "Breakdown essentials packed in a boot organiser" },
    { type: "h2", text: "Using a warning triangle" },
    {
      type: "p",
      text: "The Highway Code advises placing a warning triangle at least 45 metres behind your car, on the same side of the road. Don't use one on a motorway: walking along the hard shoulder is dangerous. On a motorway, get everyone out of the car on the side away from traffic and wait behind the barrier if it's safe to do so.",
    },
    { type: "h2", text: "Extra kit for winter" },
    {
      type: "ul",
      items: [
        "Ice scraper and de-icer",
        "A warm coat, gloves and a blanket",
        "Water and a snack",
        "A small shovel if you live somewhere that gets snow",
      ],
    },
    {
      type: "tip",
      title: "Keep it together",
      text: "A [boot organiser](/product/collapsible-boot-organiser) stops kit sliding around and means you can find everything quickly in the dark.",
    },
    { type: "products", slugs: ["roadside-emergency-kit", "portable-jump-starter-power-bank", "cordless-digital-tyre-inflator", "collapsible-boot-organiser"] },
  ],

  // ───────────────────────────────────────────────────────────
  "how-to-check-tyre-pressure": [
    {
      type: "p",
      text: "Correct tyre pressure affects your braking, handling, fuel economy and how long your tyres last. It takes five minutes to check, and it's one of the easiest ways to look after your car.",
    },
    { type: "h2", text: "Find the right pressure" },
    {
      type: "p",
      text: "Your car's recommended pressures are in the vehicle handbook, and usually on a sticker inside the driver's door frame or fuel filler flap. There are often two sets of figures: one for normal driving and a higher one for a fully loaded car.",
    },
    { type: "h2", text: "How to check" },
    {
      type: "ol",
      items: [
        "Check when the tyres are **cold**, before you've driven more than a mile or two.",
        "Remove the valve cap and press the gauge firmly onto the valve.",
        "Read the pressure and compare it with the recommended figure.",
        "Inflate or let air out as needed, then check again.",
        "Refit the valve cap and repeat for every tyre, including the spare if you have one.",
      ],
    },
    { type: "image", src: img("how-to-check-tyre-pressure", "1.jpg"), alt: "Cordless tyre inflator connected to a car tyre" },
    {
      type: "tip",
      title: "Let the inflator do the work",
      text: "A [cordless digital tyre inflator](/product/cordless-digital-tyre-inflator) lets you set the target pressure and stops automatically when it gets there.",
    },
    { type: "h2", text: "How often?" },
    {
      type: "p",
      text: "At least once a month, and before any long journey or when you're carrying a heavy load. If one tyre keeps losing pressure, have it checked for a slow puncture.",
    },
    { type: "h2", text: "Check your tread too" },
    {
      type: "p",
      text: "The legal minimum tread depth in the UK is 1.6mm across the central three-quarters of the tyre, around its whole circumference. Driving on illegal tyres can mean a fine and penalty points for each tyre, and worn tyres take longer to stop in the wet.",
    },
    { type: "products", slugs: ["cordless-digital-tyre-inflator", "digital-tyre-pressure-gauge"] },
  ],

  // ───────────────────────────────────────────────────────────
  "how-to-use-a-jump-starter": [
    {
      type: "p",
      text: "A portable jump starter is a compact battery pack that can start a car with a flat battery, without needing a second car. Here's how to use one safely.",
    },
    {
      type: "warning",
      title: "Before you start",
      text: "Always read the instructions for your jump starter and check your car's handbook. Don't try to jump start a battery that is cracked, leaking or swollen.",
    },
    { type: "h2", text: "Step by step" },
    {
      type: "ol",
      items: [
        "Turn off the ignition, lights and anything else using power. Make sure the jump starter is charged and switched off.",
        "Open the bonnet and find the battery. Some cars have dedicated jump-start points instead; your handbook will show you.",
        "Connect the **red clamp to the positive (+) terminal**.",
        "Connect the **black clamp to the negative (−) terminal**, or to a bare metal earth point on the engine if your handbook recommends it.",
        "Switch the jump starter on and wait for the ready light.",
        "Start the car. If it doesn't start, wait a minute before trying again rather than cranking continuously.",
        "Once the engine is running, switch the jump starter off and remove the **black clamp first**, then the red.",
      ],
    },
    { type: "image", src: img("how-to-use-a-jump-starter", "1.jpg"), alt: "Red and black jump starter clamps on car battery terminals" },
    { type: "h2", text: "After the jump start" },
    {
      type: "p",
      text: "Drive for at least 30 minutes to put some charge back into the battery. If it goes flat again soon afterwards, the battery may be at the end of its life. You can check it with a [digital multimeter](/blog/test-car-battery-with-multimeter).",
    },
    {
      type: "tip",
      title: "Keep it charged",
      text: "Jump starters slowly lose charge. Top yours up every few months, and before winter, so it's ready when you need it.",
    },
    { type: "products", slugs: ["portable-jump-starter-power-bank", "digital-multimeter"] },
  ],

  // ───────────────────────────────────────────────────────────
  "phone-mounts-and-the-law": [
    {
      type: "p",
      text: "Your phone is probably your sat nav, music player and hands-free kit. Here's what the UK rules say about using it in the car, and how to set it up properly.",
    },
    { type: "h2", text: "What the law says" },
    {
      type: "p",
      text: "It's illegal to hold and use a phone while driving. That includes when you're stopped at traffic lights or queuing in traffic. The penalty is six points on your licence and a £200 fine, which is enough to lose your licence if you passed your test in the last two years.",
    },
    {
      type: "p",
      text: "You can use your phone hands-free, for example for navigation, as long as it's secured in a holder and doesn't block your view of the road. You can still be prosecuted if the police think you weren't in proper control of the vehicle.",
    },
    { type: "image", src: img("phone-mounts-and-the-law", "1.jpg"), alt: "Phone showing navigation in a dashboard vent mount" },
    { type: "h2", text: "Choosing a mount" },
    {
      type: "ul",
      items: [
        "**Keep it out of your line of sight.** Vent and low dashboard positions are usually better than high on the windscreen.",
        "**Make it secure.** A phone that rattles loose is a distraction. Magnetic mounts hold firmly and let you remove the phone with one hand when you're parked.",
        "**Set it up before you go.** Enter your destination and choose your music before you pull away.",
      ],
    },
    {
      type: "tip",
      title: "Keep it charged",
      text: "Navigation drains batteries quickly. A [dual USB-C car charger](/product/dual-usb-c-car-charger) and a [2m cable](/product/braided-usb-c-cable-2m-2-pack) keep your phone topped up without cables in the way.",
    },
    { type: "products", slugs: ["magnetic-phone-mount", "dual-usb-c-car-charger", "braided-usb-c-cable-2m-2-pack"] },
  ],

  // ───────────────────────────────────────────────────────────
  "basic-car-tool-kit": [
    {
      type: "p",
      text: "You don't need a garage full of tools to look after your car. A small, well-chosen kit handles most simple jobs at home and gets you out of trouble at the roadside.",
    },
    { type: "h2", text: "The core kit" },
    {
      type: "ul",
      items: [
        "**Socket set** in common metric sizes, with a ratchet and short extension.",
        "**Screwdrivers** or a bit driver with flat and cross-head bits.",
        "**Pliers**, including a pair of long-nose pliers for fuses and clips.",
        "**Tyre pressure gauge** for monthly checks.",
        "**Trim removal tools** if you plan to fit accessories.",
      ],
    },
    { type: "image", src: img("basic-car-tool-kit", "1.jpg"), alt: "Socket set and screwdriver bits in a carry case" },
    { type: "h2", text: "Worth adding" },
    {
      type: "ul",
      items: [
        "A **work light** with a magnetic base, for under the bonnet or changing a wheel in the dark.",
        "A **digital multimeter** for checking batteries, fuses and wiring.",
        "A **jump starter**, which doubles as a USB power bank.",
      ],
    },
    { type: "h2", text: "Jobs you can do yourself" },
    {
      type: "ul",
      items: [
        "Checking tyre pressures and tread",
        "Replacing wiper blades",
        "Checking and topping up screen wash and oil",
        "Swapping a blown fuse",
        "Testing your battery",
      ],
    },
    {
      type: "p",
      text: "Anything involving brakes, steering or suspension is best left to a qualified mechanic.",
    },
    { type: "products", slugs: ["compact-car-tool-kit", "rechargeable-led-work-light", "digital-multimeter"] },
  ],

  // ───────────────────────────────────────────────────────────
  "test-car-battery-with-multimeter": [
    {
      type: "p",
      text: "If your car is slow to start, a quick test with a digital multimeter tells you whether the battery is healthy, discharged or not being charged properly.",
    },
    { type: "h2", text: "What you need" },
    {
      type: "ul",
      items: ["A [digital multimeter](/product/digital-multimeter)", "A torch or [work light](/product/rechargeable-led-work-light)", "About five minutes"],
    },
    { type: "h2", text: "Testing the resting voltage" },
    {
      type: "ol",
      items: [
        "Leave the car switched off for at least an hour (ideally overnight) so you get a true resting reading.",
        "Set the multimeter to DC volts, on the 20V range if it isn't auto-ranging.",
        "Touch the **red probe to the positive (+) terminal** and the **black probe to the negative (−)**.",
        "Read the voltage on the display.",
      ],
    },
    { type: "image", src: img("test-car-battery-with-multimeter", "1.jpg"), alt: "Multimeter display showing a car battery voltage reading" },
    { type: "h2", text: "What the readings mean" },
    {
      type: "ul",
      items: [
        "**12.6V or above:** fully charged.",
        "**About 12.4V:** roughly three-quarters charged.",
        "**About 12.2V:** around half charged. Worth charging.",
        "**Below 12V:** discharged. Charge it and test again.",
      ],
    },
    { type: "h2", text: "Checking the charging system" },
    {
      type: "p",
      text: "Start the engine and test again. You should see roughly 13.7V to 14.7V, which shows the alternator is charging the battery. A reading close to the resting voltage suggests a charging problem that needs looking at.",
    },
    {
      type: "tip",
      title: "Battery keeps going flat?",
      text: "If a charged battery drops below 12.4V within a day or two, it may be failing, or something may be draining it with the car off. A garage can run a load test to confirm.",
    },
    { type: "products", slugs: ["digital-multimeter", "portable-jump-starter-power-bank", "rechargeable-led-work-light"] },
  ],
};
