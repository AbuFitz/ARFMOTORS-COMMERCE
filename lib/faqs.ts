// Help centre questions, shown on /support. Keep answers short and factual.

export interface FaqGroup {
  id: string;
  category: string;
  questions: { q: string; a: string }[];
}

export const FAQS: FaqGroup[] = [
  {
    id: "orders",
    category: "Orders & delivery",
    questions: [
      {
        q: "How long will delivery take?",
        a: "Each product page shows an estimated delivery time. Items held in UK stock usually arrive within 1–3 business days. Some items ship from our supplier and take longer — this is always shown before you buy.",
      },
      {
        q: "Do you deliver outside the UK?",
        a: "Not at the moment. We only deliver to UK addresses.",
      },
      {
        q: "How do I track my order?",
        a: "We email your tracking details as soon as your order is dispatched. If you can't find them, use our Track an order page and we'll send you an update.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Email us as soon as possible with your order number. If the order hasn't been dispatched yet, we can usually change or cancel it.",
      },
    ],
  },
  {
    id: "payments",
    category: "Payments & discounts",
    questions: [
      {
        q: "How do I pay?",
        a: "Checkout is handled securely by Stripe, which accepts all major debit and credit cards. We never see or store your full card details.",
      },
      {
        q: "How do discount codes work?",
        a: "Enter your code in the cart. Codes apply to orders of £50 or more and are checked again at checkout.",
      },
    ],
  },
  {
    id: "returns",
    category: "Returns & faulty items",
    questions: [
      {
        q: "Can I return something I've changed my mind about?",
        a: "Yes. You can return most unused items in their original packaging within 14 days of delivery. See our returns policy for the full details and exceptions.",
      },
      {
        q: "What if an item arrives damaged or faulty?",
        a: "Contact us within 48 hours of delivery with photos, or as soon as you notice a fault. We'll arrange a replacement or refund in line with your rights under UK consumer law.",
      },
    ],
  },
  {
    id: "fitting",
    category: "Professional fitting",
    questions: [
      {
        q: "Which products can be fitted?",
        a: "Only selected automotive products — they show a \"Fitting available\" badge. Fitting is optional, and every product can be bought on its own for delivery.",
      },
      {
        q: "Who carries out the fitting?",
        a: "Our fitting partner, FixNow Mechanics. After you order, they contact you to confirm the fitting price and book a time once your product has arrived.",
      },
      {
        q: "Where is fitting available?",
        a: "London and surrounding areas up to Peterborough. You can check your postcode on the product page or on our Installation page.",
      },
      {
        q: "Do you offer servicing or repairs?",
        a: "No. ARF Commerce sells products. Fitting through FixNow Mechanics is only available for eligible products bought from us.",
      },
    ],
  },
  {
    id: "about",
    category: "About ARF Commerce",
    questions: [
      {
        q: "Who are ARF Commerce?",
        a: "ARF Commerce Ltd is an independent UK ecommerce retailer, registered in England and Wales (company number 17432383).",
      },
      {
        q: "Do you sell on other marketplaces?",
        a: "Yes, some of our products are also listed on our eBay store. Buying on our own website lets you use our discount codes and add fitting to eligible products.",
      },
      {
        q: "Can you help me choose a product?",
        a: "Yes — send us a message with what you need and we'll help you pick the right item before you order.",
      },
    ],
  },
];
