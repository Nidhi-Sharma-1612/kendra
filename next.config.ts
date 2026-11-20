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
      // TODO(client): confirm whether Packages, Gift Certificates and Pay Now pages are still wanted.
      { source: "/packages", destination: "/contact", permanent: false },
      { source: "/gift-certificates", destination: "/contact", permanent: false },
      { source: "/pay-now", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
