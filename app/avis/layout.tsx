import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avis Élèves — Note 5.0/5 sur 26 Avis Google | Paris 20',
  description: '26 avis vérifiés, note 5.0/5 sur Google. Découvrez les témoignages de nos élèves ayant obtenu leur permis B à l'auto-école Mortier, Paris 20ème.',
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/avis' },
  openGraph: {
    url: 'https://autoecole-mortier.vercel.app/avis',
    title: 'Avis Élèves — Note 5.0/5 sur 26 Avis Google | Paris 20 | Auto-école Mortier',
    description: '26 avis vérifiés, note 5.0/5 sur Google. Découvrez les témoignages de nos élèves ayant obtenu leur permis B à l'auto-école Mortier, Paris 20ème.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
