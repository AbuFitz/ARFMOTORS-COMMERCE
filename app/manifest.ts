import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARF Commerce",
    short_name: "ARF Commerce",
    description: "Car accessories, in-car tech and tools, delivered from the UK.",
    start_url: "/",
    display: "standalone",
    background_color: "#111214",
    theme_color: "#111214",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
