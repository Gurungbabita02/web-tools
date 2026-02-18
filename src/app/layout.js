import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import Script from "next/script";
import JsonLd from "./components/JsonLd";

const SITE_URL = "https://web-tool-tawny.vercel.app";

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
  authors: [{ name: "FileToolsPro" }],
  creator: "FileToolsPro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FileToolsPro",
    title: "Free Online PDF & Image Tools - Compress, Convert, Merge",
    description:
      "Free online tools to compress PDF, convert PDF to Word, compress images & more. No signup. Fast & secure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FileToolsPro - Free Online File Tools",
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7641843461158094"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FileToolsPro",
            url: "https://web-tool-tawny.vercel.app",
            description:
              "Free online tools to compress PDF, convert files, reduce image size & more.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://web-tool-tawny.vercel.app/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FileToolsPro",
            url: "https://web-tool-tawny.vercel.app",
            logo: "https://web-tool-tawny.vercel.app/og-image.png",
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
