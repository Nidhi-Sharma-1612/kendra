import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links to the old WordPress site working (search engines, bookmarks, emails).
  async redirects() {
    return [
      { source: "/cabin", destination: "/cabins", permanent: true },
      { source: "/reservations", destination: "/policies", permanent: true },
      { source: "/reserve-now", destination: "/cabins", permanent: true },
      { source: "/reservation-request-form", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/testimonials", destination: "/", permanent: true },
      // Gift certificates and Pay Now are discontinued (owner, Nov 2026).
      { source: "/gift-certificates", destination: "/", permanent: true },
      { source: "/pay-now", destination: "/", permanent: true },
      { source: "/packages", destination: "/specials", permanent: true },
    ];
  },
};

export default nextConfig;
