import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pourquoi Nous Choisir — 5.0/5 Google, Qualiopi, Paris 20',
  description: 'Auto-école Mortier : note 5.0/5 sur 26 avis Google, certifiée Qualiopi, finançable CPF. Boulevard Mortier Paris 20, arrêt tram T3b Adrienne Bolland juste devant.',
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/pourquoi-nous' },
  openGraph: {
    url: 'https://autoecole-mortier.vercel.app/pourquoi-nous',
    title: 'Pourquoi Nous Choisir — 5.0/5 Google, Qualiopi, Paris 20 | Auto-école Mortier',
    description: 'Auto-école Mortier : note 5.0/5 sur 26 avis Google, certifiée Qualiopi, finançable CPF. Boulevard Mortier Paris 20, arrêt tram T3b Adrienne Bolland juste devant.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
