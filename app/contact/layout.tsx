import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Inscription — 127 bd Mortier, Paris 20 | Tram T3b',
  description: 'Contactez Auto-école Mortier : 127 boulevard Mortier, 75020 Paris. Tram T3b arrêt Adrienne Bolland. Tél : 01 82 83 31 26. Mar-Ven 10h-14h/16h-19h, Sam 10h-14h.',
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/contact' },
  openGraph: {
    url: 'https://autoecole-mortier.vercel.app/contact',
    title: 'Contact & Inscription — 127 bd Mortier, Paris 20 | Tram T3b | Auto-école Mortier',
    description: 'Contactez Auto-école Mortier : 127 boulevard Mortier, 75020 Paris. Tram T3b arrêt Adrienne Bolland. Tél : 01 82 83 31 26. Mar-Ven 10h-14h/16h-19h, Sam 10h-14h.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
