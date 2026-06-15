import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Check, Smartphone, Clock, BarChart3, BookOpen, RefreshCw, Wifi, ChevronRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Code de la route en ligne — 50€ accès illimité | Paris 20ème',
  description: 'Révisez le code de la route en ligne pour seulement 50€ — accès illimité, compatible mobile, exercices thématiques, statistiques. Auto-école Mortier, Paris 20ème. Finançable CPF.',
  alternates: { canonical: 'https://autoecole-mortier.vercel.app/code-en-ligne' },
  openGraph: {
    title: 'Code de la route en ligne 50€ — Auto-école Mortier Paris',
    description: 'Accès illimité à la plateforme code en ligne. Révisez quand vous voulez, depuis n\'importe quel appareil. 50€ seulement.',
  },
}

const FEATURES = [
  { Icon: Wifi,        title: 'Accès 100% en ligne',      desc: 'Révisez depuis chez vous, dans les transports, partout. Aucun déplacement nécessaire.' },
  { Icon: Clock,       title: 'Disponible 24h/24, 7j/7',  desc: 'La plateforme est accessible à toute heure. Révisez à votre rythme, sans contrainte d\'horaire.' },
  { Icon: Smartphone,  title: 'Compatible mobile',         desc: 'L\'interface s\'adapte à votre téléphone, tablette ou ordinateur. Aucune application à télécharger.' },
  { Icon: BarChart3,   title: 'Statistiques de progression', desc: 'Suivez vos progrès en temps réel : thèmes maîtrisés, taux de réussite, points à retravailler.' },
  { Icon: BookOpen,    title: 'Exercices thématiques',     desc: 'Panneaux, priorités, vitesse, alcool… Travaillez chaque thème avec des séries ciblées.' },
  { Icon: RefreshCw,   title: 'Mises à jour incluses',     desc: 'Le contenu est mis à jour en permanence avec les dernières modifications du code de la route.' },
]

const FAQ = [
  {
    q: 'Comment accéder à la plateforme après mon inscription ?',
    a: 'Après votre inscription et le paiement des 50€, vous recevez vos identifiants par email sous 24h. La plateforme est accessible immédiatement depuis n\'importe quel navigateur.',
  },
  {
    q: 'Combien de temps dure l\'accès ?',
    a: 'L\'accès est illimité dans le temps. Vous pouvez réviser à votre rythme jusqu\'à l\'obtention de votre code, sans date d\'expiration.',
  },
  {
    q: 'Puis-je financer le code en ligne avec le CPF ?',
    a: 'Le code en ligne à 50€ n\'est pas éligible au CPF seul, mais il est inclus dans nos forfaits BVM (1 099€) et BVA (949€) qui, eux, sont finançables CPF.',
  },
  {
    q: 'Est-ce que cela remplace le passage de l\'examen du code ?',
    a: 'La plateforme vous prépare à l\'examen officiel. L\'inscription à l\'examen est gérée par l\'auto-école via le numéro NEPH — nous l\'intégrons dans nos forfaits complets.',
  },
  {
    q: 'La plateforme ressemble-t-elle aux vraies questions d\'examen ?',
    a: 'Oui. Les séries reproduisent le format officiel : 40 questions, thèmes mélangés, chronométré. Vous serez en conditions réelles dès le premier test.',
  },
]

export default function CodeEnLignePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Code de la route</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-4 leading-tight">
            Révisez le code en ligne.<br />
            <span className="text-[#2d6a4f]">Seulement 50€.</span>
          </h1>
          <p className="text-[#4a5a52] text-lg max-w-2xl mx-auto mb-8">
            Accès illimité à notre plateforme de révision — compatible mobile, exercices thématiques, statistiques de progression. Révisez quand vous voulez, où vous voulez.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:0182833126"
              className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              S&apos;inscrire — 01 82 83 31 26
            </a>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 border-2 border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Voir nos forfaits complets
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Badge social proof */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#dde5dc] rounded-full px-5 py-2.5 text-sm font-medium text-[#2d6a4f]">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#2d6a4f] text-[#2d6a4f]" />
              ))}
            </div>
            <span className="text-[#4a5a52]">5.0/5 — 32 avis vérifiés · Auto-école Mortier Paris 20ème</span>
          </div>
        </div>
      </section>

      {/* ── Prix ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code seul */}
            <div className="bg-white rounded-2xl border border-[#dde5dc] p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">En ligne</span>
                <h2 className="font-serif text-2xl font-black text-[#1a2e22] mt-3 mb-1">Code en ligne seul</h2>
                <p className="text-sm text-[#8a9690]">Vous avez déjà votre permis en cours ailleurs</p>
              </div>
              <div className="text-4xl font-serif font-black text-[#2d6a4f] mb-6">50€</div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Accès illimité à la plateforme', 'Compatible mobile & tablette', 'Exercices thématiques (40 thèmes)', 'Statistiques de progression', 'Disponible 24h/24, 7j/7', 'Mises à jour incluses'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#4a5a52]">
                    <Check className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="tel:0182833126" className="flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                <Phone className="w-4 h-4" />
                S&apos;inscrire
              </a>
            </div>

            {/* Code inclus dans forfait */}
            <div className="bg-[#1b4332] rounded-2xl border border-[#1b4332] p-8 flex flex-col text-white">
              <div className="mb-6">
                <span className="text-xs font-semibold bg-[#2d6a4f] text-[#74c69d] px-3 py-1 rounded-full">Recommandé</span>
                <h2 className="font-serif text-2xl font-black text-white mt-3 mb-1">Code inclus dans le forfait</h2>
                <p className="text-sm text-[#9ccdb5]">Permis B BVA ou BVM — code en ligne offert</p>
              </div>
              <div className="text-4xl font-serif font-black text-[#74c69d] mb-2">à partir de 949€</div>
              <p className="text-sm text-[#9ccdb5] mb-6">Permis B Automatique — notre spécialité</p>
              <ul className="space-y-3 flex-1 mb-8">
                {['Code en ligne inclus (valeur 50€)', 'Numéro NEPH inclus', '13h de conduite minimum', 'Finançable CPF', 'Compatible permis 1€/jour', 'Accompagnement à l\'examen'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#cfe9da]">
                    <Check className="w-4 h-4 text-[#74c69d] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/formations" className="flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Voir tous les forfaits
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Plateforme</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a2e22] mt-2">
              Tout ce qu&apos;il vous faut pour réussir
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-[#dde5dc] p-6">
                <div className="w-11 h-11 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <h3 className="font-bold text-[#1a2e22] mb-2">{title}</h3>
                <p className="text-sm text-[#4a5a52] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">3 étapes</span>
            <h2 className="font-serif text-3xl font-black text-[#1a2e22] mt-2">Comment ça marche ?</h2>
          </div>
          <div className="space-y-6">
            {[
              { n: '1', t: 'Appelez ou passez à l\'agence', d: '127 bd Mortier, Paris 20ème — Mar-Ven 10h-19h, Sam 10h-14h. Oumy ou l\'équipe s\'occupe de votre inscription en 5 minutes.' },
              { n: '2', t: 'Recevez vos accès par email', d: 'Sous 24h, vous recevez vos identifiants. Connectez-vous depuis n\'importe quel appareil, aucune installation requise.' },
              { n: '3', t: 'Révisez à votre rythme', d: 'Séries thématiques, séries aléatoires, examen blanc… Travaillez les points faibles, consultez vos stats, passez l\'examen confiant.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white font-bold font-serif text-lg">{n}</div>
                <div>
                  <h3 className="font-bold text-[#1a2e22] mb-1">{t}</h3>
                  <p className="text-sm text-[#4a5a52] leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">FAQ</span>
            <h2 className="font-serif text-3xl font-black text-[#1a2e22] mt-2">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-[#dde5dc] p-6">
                <h3 className="font-bold text-[#1a2e22] mb-3">{q}</h3>
                <p className="text-sm text-[#4a5a52] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-black text-[#1a2e22] mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-[#4a5a52] mb-8">
            50€ pour un accès illimité. Appelez-nous ou passez directement à l&apos;agence — on s&apos;occupe de tout.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0182833126" className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors">
              <Phone className="w-5 h-5" />
              01 82 83 31 26
            </a>
            <Link href="/tarifs" className="inline-flex items-center gap-2 border-2 border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Comparer les forfaits
            </Link>
          </div>
          <p className="text-xs text-[#8a9690] mt-4">127 bd Mortier, Paris 20ème · Tram T3b arrêt Adrienne Bolland</p>
        </div>
      </section>
    </div>
  )
}
