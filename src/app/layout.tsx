import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gatorinnovation.com"),
  title: {
    default: "gatorinnovation – Digital Solutions for Student Entrepreneurs",
    template: "%s | gatorinnovation",
  },
  description:
    "gatorinnovation empowers student entrepreneurs with cutting-edge web and mobile applications. We turn innovative ideas into reality through expert design and development.",
  keywords: [
    "gatorinnovation",
    "student entrepreneurs",
    "web development",
    "mobile apps",
    "branding",
    "UX design",
    "startup",
  ],
  authors: [{ name: "gatorinnovation" }],
  creator: "gatorinnovation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.gatorinnovation.com/",
    title: "gatorinnovation – Digital Solutions for Student Entrepreneurs",
    description:
      "We build high-performance web and mobile products for student founders.",
    siteName: "gatorinnovation",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "gatorinnovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gatorinnovation",
    creator: "@gatorinnovation",
    title: "gatorinnovation – Digital Solutions for Student Entrepreneurs",
    description:
      "We build high-performance web and mobile products for student founders.",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "gatorinnovation",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/GatorEx.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // Organization schema for richer search results
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "gatorinnovation",
              url: "https://www.gatorinnovation.com/",
              logo: "/favicon.ico",
              sameAs: [
                "https://www.linkedin.com/company/gatorinnovation",
                "https://x.com/gatorinnovation",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  email: "hello@gatorinnovation.com",
                  contactType: "customer support",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
