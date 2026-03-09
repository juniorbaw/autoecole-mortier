import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export const metadata: Metadata = {
  title: {
    default: "Auto-école Mortier — Paris 20ème | Permis B, AAC, Accéléré",
    template: "%s | Auto-école Mortier"
  },
  description: "L'auto-école la mieux notée du 20ème arrondissement. Certifiée Qualiopi, finançable CPF, permis à 1€/jour. Juste devant le tram T3b. Note 5.0/5 — 26 avis vérifiés.",
  keywords: ["auto-école", "Paris 20", "permis B", "CPF", "Qualiopi", "permis 1€", "Mortier"],
  authors: [{ name: "Auto-école Mortier" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://autoecole-mortier.vercel.app",
    title: "Auto-école Mortier — Paris 20ème",
    description: "L'auto-école la mieux notée du 20ème. Certifiée Qualiopi, finançable CPF, permis à 1€/jour.",
    siteName: "Auto-école Mortier",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
