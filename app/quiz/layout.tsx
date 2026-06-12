import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiz Permis — Teste tes connaissances Gratuitement | Paris 20',
  description: "Quiz code de la route gratuit de l'auto-école Mortier. Teste tes connaissances, prépare ton examen du code. Auto-école certifiée Qualiopi, Paris 20ème.",
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/quiz' },
  openGraph: {
    url: 'https://autoecole-mortier.vercel.app/quiz',
    title: 'Quiz Permis — Teste tes connaissances Gratuitement | Paris 20 | Auto-école Mortier',
    description: "Quiz code de la route gratuit de l'auto-école Mortier. Teste tes connaissances, prépare ton examen du code. Auto-école certifiée Qualiopi, Paris 20ème.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
