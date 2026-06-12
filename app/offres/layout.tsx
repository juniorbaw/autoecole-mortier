import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Offres — -15% Étudiants, Permis à 1€/jour, CPF',
  description: '-15% sur le permis avec ta carte étudiante. Permis à 1€/jour si tu as 15-25 ans. Financement CPF disponible. Auto-école Mortier Paris 20, tram T3b Adrienne Bolland.',
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/offres' },
  openGraph: {
    url: 'https://autoecole-mortier.vercel.app/offres',
    title: 'Nos Offres — -15% Étudiants, Permis à 1€/jour, CPF | Auto-école Mortier',
    description: '-15% sur le permis avec ta carte étudiante. Permis à 1€/jour si tu as 15-25 ans. Financement CPF disponible. Auto-école Mortier Paris 20, tram T3b Adrienne Bolland.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
