import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import Script from "next/script";
import JsonLd from "./components/JsonLd";

const SITE_URL = "https://yourwebsite.com"; // REPLACE with your actual domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Online PDF & Image Tools - Compress, Convert, Merge | SmallPDF Tools",
    template: "%s | SmallPDF Tools",
  },
  description:
    "Free online tools to compress PDF, convert PDF to Word, Word to PDF, compress images, convert to WebP, merge PDFs & more. No signup required. Fast, secure & 100% free.",
  keywords: [
    "compress pdf online free",
    "pdf to word converter",
    "word to pdf converter",
    "image compressor",
    "compress image online",
    "png to jpg converter",
    "image to webp",
    "pdf merge online",
    "reduce pdf size",
    "online pdf tools",
    "free file converter",
    "qr code generator",
  ],
  authors: [{ name: "SmallPDF Tools" }],
  creator: "SmallPDF Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "SmallPDF Tools",
    title: "Free Online PDF & Image Tools - Compress, Convert, Merge",
    description:
      "Free online tools to compress PDF, convert PDF to Word, compress images & more. No signup. Fast & secure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmallPDF Tools - Free Online File Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online PDF & Image Tools",
    description:
      "Compress PDF, convert files, reduce image size & more. 100% free, no signup.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className={`${poppins.variable}`}
      >
        {/* Google AdSense - Replace ca-pub-XXXXXXXXXXXXXXXX with your actual publisher ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SmallPDF Tools",
            url: "https://yourwebsite.com",
            description:
              "Free online tools to compress PDF, convert files, reduce image size & more.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://yourwebsite.com/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SmallPDF Tools",
            url: "https://yourwebsite.com",
            logo: "https://yourwebsite.com/og-image.png",
            sameAs: [],
          }}
        />
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
