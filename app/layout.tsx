import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import OffresPopup from "@/components/OffresPopup";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from '@vercel/analytics/react';
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autoecole-mortier.vercel.app"),
  title: {
    default: "Auto-école Mortier — Paris 20ème | Permis B, AAC, Accéléré | Note 5.0/5",
    template: "%s | Auto-école Mortier — Paris 20ème"
  },
  description: "Auto-école Mortier : la mieux notée du 20ème arrondissement (5.0/5 — 26 avis). Certifiée Qualiopi, finançable CPF, permis à 1€/jour. Tram T3b arrêt Adrienne Bolland, Paris 20.",
  keywords: [
    "auto-école Paris 20",
    "auto école Paris 20ème",
    "permis B Paris",
    "permis pas cher Paris 20",
    "auto école boulevard Mortier",
    "auto école Ménilmontant",
    "auto école tram T3b",
    "auto école T3b Adrienne Bolland",
    "permis à 1€ par jour",
    "permis 1 euro jour Paris",
    "auto-école Qualiopi Paris",
    "permis finançable CPF Paris",
    "auto école pas cher 20ème",
    "permis B accéléré Paris",
    "conduite accompagnée Paris 20",
    "AAC Paris 20",
    "code de la route Paris 20",
  ],
  authors: [{ name: "Auto-école Mortier", url: "https://autoecole-mortier.vercel.app" }],
  creator: "Auto-école Mortier",
  publisher: "Auto-école Mortier",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://autoecole-mortier.vercel.app",
    title: "Auto-école Mortier — Paris 20ème | La mieux notée du 20ème",
    description: "Auto-école certifiée Qualiopi, finançable CPF, note 5.0/5. Permis à 1€/jour. Tram T3b Adrienne Bolland — Paris 20ème.",
    siteName: "Auto-école Mortier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Auto-école Mortier - Paris 20ème",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto-école Mortier — Paris 20ème",
    description: "Permis B certifié Qualiopi, CPF accepté, permis à 1€/jour. Note 5.0/5 sur Google.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://autoecole-mortier.vercel.app",
  },
  verification: {
    google: "vml1zWMaDaGeZfbLw3UJPOD6HhFuG2it0gMDUzTpdGs",
  },
  category: "Education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2d6a4f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Auto-école Mortier" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo-mortier.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-mortier.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Auto-école Mortier",
            "alternateName": "Mortier Auto-École",
            "url": "https://autoecole-mortier.vercel.app",
            "logo": "https://autoecole-mortier.vercel.app/logo-mortier.png",
            "image": "https://autoecole-mortier.vercel.app/devanture.jpg",
            "description": "Auto-école certifiée Qualiopi à Paris 20ème. Permis B boîte manuelle et automatique, conduite accompagnée, formule accélérée. Code en ligne 50€. Finançable CPF, permis à 1€/jour. Note 5.0/5 sur 32 avis.",
            "telephone": "+33182833126",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "127 Boulevard Mortier",
              "addressLocality": "Paris",
              "postalCode": "75020",
              "addressCountry": "FR"
            },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "14:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday"], "opens": "16:00", "closes": "19:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "10:00", "closes": "14:00" }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "32",
              "bestRating": "5"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Formations permis de conduire",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Permis B Boîte Manuelle", "description": "Formation permis B boîte manuelle — NEPH + code inclus, 20h minimum" }, "price": "1099", "priceCurrency": "EUR" },
                { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Permis B Boîte Automatique", "description": "Formation permis B boîte automatique — spécialité Mortier, 13h minimum" }, "price": "949", "priceCurrency": "EUR" },
                { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Code de la route en ligne", "description": "Accès plateforme illimité pour réviser le code de la route" }, "price": "50", "priceCurrency": "EUR" }
              ]
            }
          }) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
          <MobileBar />
          <OffresPopup />
        </ThemeProvider>
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}
