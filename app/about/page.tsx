"use client";

import { motion } from "framer-motion";
import { Building2, Wrench, Target, Award, Users, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/site-config";

const features = [
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "Every part curated to meet strict OEM+ standards. We hand-select components that deliver genuine performance and aesthetic improvements.",
  },
  {
    icon: Award,
    title: "Verified Suppliers",
    description:
      "Our supply chain combines trusted Chinese manufacturers with UK-based stock for optimal quality, pricing, and delivery times.",
  },
  {
    icon: Wrench,
    title: "Fitting Available",
    description:
      "Eligible parts can be fitted by FixNow Mechanics, who come to you across London and surrounding areas.",
  },
  {
    icon: Users,
    title: "Built by Enthusiasts",
    description:
      "We're BMW owners ourselves. ARF Motors exists because we understand what enthusiasts truly want.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              About ARF Motors
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              BMW styling and performance parts, chosen by enthusiasts —
              sold direct, on eBay, and fitted by FixNow Mechanics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              ARF Motors exists to bring BMW enthusiasts premium retrofit parts and styling
              upgrades with complete transparency, professional installation options, and clear, honest
              information on every part.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed mt-4">
              We bridge the gap between generic marketplace platforms and expensive dealer
              modifications — offering curated quality at fair prices, with the option of expert
              fitting via FixNow Mechanics.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed mt-4">
              You&apos;ll find most of our range here and on our eBay store — buy wherever suits you.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-neutral-200 rounded-xl p-8"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-500 text-white rounded-xl mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-900 mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Structure */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-neutral-600">
              A UK-registered company selling BMW parts online, with trusted local fitting.
            </p>
          </div>

          <div className="space-y-8">
            {/* ARF Commerce Ltd */}
            <div className="bg-neutral-900 text-white rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Building2 className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {COMPANY.legalName}
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">The Company</p>
                  <p className="text-neutral-300 leading-relaxed">
                    ARF Motors is a trading name of {COMPANY.legalName}, a company registered in{" "}
                    {COMPANY.registeredIn} (company number {COMPANY.companyNumber}). Every order on
                    this website is sold and supported by {COMPANY.legalName}.
                  </p>
                </div>
              </div>
            </div>

            {/* ARF Motors */}
            <div className="bg-primary-50 border-2 border-primary-500 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                    ARF Motors
                  </h3>
                  <p className="text-lg text-primary-600 mb-4">Our Store</p>
                  <p className="text-neutral-700 leading-relaxed">
                    Our BMW parts store, specialising in styling upgrades, lighting, interior and
                    performance parts. We sell direct on this website and through our eBay store,
                    with both UK-stocked and imported parts and clear delivery times on every product.
                  </p>
                </div>
              </div>
            </div>

            {/* FixNow Mechanics */}
            <div className="bg-neutral-50 border border-neutral-300 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Wrench className="h-8 w-8 text-neutral-700" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                    FixNow Mechanics
                  </h3>
                  <p className="text-lg text-neutral-600 mb-4">Our Fitting Partner</p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    FixNow Mechanics provide mobile fitting for eligible ARF Motors parts. Tick
                    &quot;Add fitting&quot; when you order and they&apos;ll contact you to quote and
                    book a time at your home or work.
                  </p>
                  <div className="flex items-start gap-2 text-sm text-neutral-600">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Service Area:</strong> London and surrounding regions, extending up to
                      Peterborough. Mobile fitting available at your location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              Honest About Our Model
            </h2>
            <div className="text-left space-y-4 text-neutral-700 leading-relaxed">
              <p>
                We operate a hybrid sourcing model — combining UK-held stock for fast delivery with
                carefully verified Chinese suppliers for cost-effective imported parts.
              </p>
              <p>
                Every product page clearly displays:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Whether the part is UK stock (1-3 days) or imported (10-14 days)</li>
                <li>Accurate delivery timelines</li>
                <li>Fitment compatibility</li>
                <li>Warranty information</li>
                <li>Whether the part is eligible for fitting via FixNow Mechanics</li>
              </ul>
              <p>
                We believe transparency builds trust — and trust builds lasting relationships with
                enthusiasts who share our passion for precision engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
            Ready to Upgrade Your BMW?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Explore our curated collection of BMW retrofit and styling parts.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Browse Parts
          </a>
        </div>
      </section>
    </div>
  );
}
