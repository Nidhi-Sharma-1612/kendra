import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AkiaChat } from "@/components/layout/AkiaChat";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Romantic Hot Tub Cabins for Two near Gatlinburg`, template: `%s | ${site.name}` },
  description:
    "Twelve rustic, romantic cabins on 30 wooded acres near Gatlinburg, TN, each with a private hot tub, heart-shaped jacuzzi and wood-burning fireplace, plus a private trail to the river.",
  openGraph: { siteName: site.name, images: ["/images/property/01.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${figtree.variable} antialiased`}>
      <body className="min-h-full overflow-x-clip">
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <AkiaChat />
      </body>
    </html>
  );
}
