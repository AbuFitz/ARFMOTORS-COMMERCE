"use client";

import { motion } from "framer-motion";
import { Wrench, ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  price: string;
  amazonUrl: string;
  imageUrl: string;
}

// Get Amazon Associate tag from environment variables
// Set your tag in .env.local as NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "arfmotors-21";

const COMMON_BMW_TOOLS: Tool[] = [
  {
    name: "BMW Trim Removal Kit",
    description: "Essential for removing interior and exterior panels without damage",
    price: "£12.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B08X4HQZJY?tag=${AMAZON_TAG}`,
    imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop&q=80"
  },
  {
    name: "Torque Wrench Set",
    description: "Precision torque settings for proper installation",
    price: "£34.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B07XDDQ5M3?tag=${AMAZON_TAG}`,
    imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop&q=80"
  },
  {
    name: "OBD2 Scanner",
    description: "Read and clear fault codes, essential for DIY work",
    price: "£19.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B07QKXC2ZJ?tag=${AMAZON_TAG}`,
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop&q=80"
  },
  {
    name: "BMW Jack Pad Adapter",
    description: "Protect your BMW's underbody when jacking",
    price: "£15.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B07V3L7T8F?tag=${AMAZON_TAG}`,
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&q=80"
  }
];

interface ToolsNeededProps {
  category?: string;
}

export function ToolsNeeded({ category }: ToolsNeededProps) {
  // Filter tools based on category if needed
  const relevantTools = COMMON_BMW_TOOLS.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-xl">
          <Wrench className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold text-neutral-900">
            Tools You'll Need
          </h3>
          <p className="text-sm text-neutral-600">
            Make installation easier with the right tools
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relevantTools.map((tool, index) => (
          <motion.a
            key={tool.name}
            href={tool.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white border-2 border-neutral-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-neutral-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{tool.price}</span>
                  <span className="text-xs text-neutral-500">on Amazon</span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-neutral-500">
          As an Amazon Associate, we earn from qualifying purchases
        </p>
      </div>
    </motion.div>
  );
}

// Specific tools for different categories
export const EXTERIOR_TOOLS: Tool[] = [
  {
    name: "Heat Gun",
    description: "For vinyl wraps and badge removal",
    price: "£24.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B07Y8JBT9H?tag=${AMAZON_TAG}`,
    imageUrl: ""
  },
  ...COMMON_BMW_TOOLS.slice(0, 2)
];

export const LIGHTING_TOOLS: Tool[] = [
  {
    name: "LED Bulb Tester",
    description: "Test LED compatibility before installation",
    price: "£16.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B08F7SXKPJ?tag=${AMAZON_TAG}`,
    imageUrl: ""
  },
  ...COMMON_BMW_TOOLS.slice(0, 2)
];

export const PERFORMANCE_TOOLS: Tool[] = [
  {
    name: "Boost Pressure Gauge",
    description: "Monitor performance modifications",
    price: "£29.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B07YNQXF3S?tag=${AMAZON_TAG}`,
    imageUrl: ""
  },
  {
    name: "Air Filter Cleaning Kit",
    description: "Maintain reusable performance filters",
    price: "£18.99",
    amazonUrl: `https://www.amazon.co.uk/dp/B08D3BWXQN?tag=${AMAZON_TAG}`,
    imageUrl: ""
  },
  ...COMMON_BMW_TOOLS.slice(0, 1)
];
