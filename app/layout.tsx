import type { Metadata } from "next";
import {
  Inter,
  Work_Sans,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { jsonLd, site } from "@/lib/constants/site";
import "./globals.css";

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "YodhaMedia - Digital Growth Agency for Hospitals & Businesses",
    template: "%s | YodhaMedia",
  },
  description: site.description,
  keywords: [
    "digital marketing agency india",
    "hospital social media management",
    "clinic ORM",
    "healthcare marketing",
    "web design india",
  ],
  openGraph: {
    title: "YodhaMedia - Digital Growth Agency",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: site.url },
};
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const heading = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
    ${display.variable}
    ${heading.variable}
    ${body.variable}
    ${mono.variable}
  `}
    >
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
