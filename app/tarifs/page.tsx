import type { Metadata } from 'next'
import { Check, Phone } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Tarifs' }

const PLANS = [
  {
    emoji: '📚', title: 'Code Seul', price: '299€', sub: 'au lieu de 350€ — Économie de 51€', featured: false,
    features: ['Code en ligne illimité', 'Cours collectifs inclus', 'Suivi personnalisé', 'Inscription examen incluse'],
  },
  {
    emoji: '🚗', title: 'Permis B Complet', price: '1 099€', sub: 'au lieu de 1 290€ — Économie de 191€', featured: true,
    features: ['Code de la route inclus', '20h de conduite', 'Accompagnement examen', 'Finançable CPF', 'Compatible permis 1€/jour', 'Moniteurs certifiés'],
  },
  {
    emoji: '⚡', title: 'Formule Accélérée', price: '1 399€', sub: 'au lieu de 1 590€ — Économie de 191€', featured: false,
    features: ['Stage code 3 jours', 'Conduite quotidienne', 'Date examen prioritaire', 'Finançable CPF'],
  },
]

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <section className="py-20 px-4 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Tarifs</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1c1917] mt-2 mb-4">Des prix clairs, sans surprises</h1>
          <p className="text-[#57534e] text-lg max-w-2xl mx-auto">Les tarifs les plus compétitifs du 20ème avec un service 5 étoiles.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((plan) => (
            <div key={plan.title} className={`relative bg-white rounded-2xl border flex flex-col overflow-hidden card-hover ${plan.featured ? 'border-[#c0451e] shadow-xl' : 'border-[#e7e5e4]'}`}>
              {plan.featured && (
                <div className="absolute top-4 right-4 bg-[#c0451e] text-white text-xs font-bold px-3 py-1 rounded-full">★ POPULAIRE</div>
              )}
              <div className="p-8 flex-1">
                <div className="text-4xl mb-4">{plan.emoji}</div>
                <h2 className="font-bold text-[#1c1917] text-xl mb-1">{plan.title}</h2>
                <p className="text-xs text-[#a8a29e] mb-6">{plan.sub}</p>
                <div className="font-serif text-4xl font-black text-[#c0451e] mb-6">{plan.price}</div>
                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#57534e]">
                      <Check className="w-4 h-4 text-[#c0451e] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t border-[#e7e5e4]">
                <a href="tel:0182833126"
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-colors text-sm ${plan.featured ? 'bg-[#c0451e] hover:bg-[#a83a18] text-white' : 'border-2 border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917]'}`}>
                  <Phone className="w-4 h-4" />
                  S&apos;inscrire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Permis 1€/jour banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#16a34a]/10 to-[#16a34a]/5 border border-[#16a34a]/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-5xl flex-shrink-0">💶</div>
          <div className="flex-1">
            <h3 className="font-bold text-[#1c1917] text-xl mb-1">Permis à 1€ par jour</h3>
            <p className="text-[#57534e] text-sm">Pour les 15-25 ans. Prêt à taux zéro, ~30€/mois. On monte le dossier avec vous, banque partenaire disponible.</p>
          </div>
          <a href="tel:0182833126" className="flex-shrink-0 flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
            J&apos;en profite →
          </a>
        </div>
      </section>

      {/* Modes de paiement */}
      <section className="py-12 px-4 bg-[#f5f0eb]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-black text-[#1c1917] mb-8">Modes de paiement acceptés</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['💳 Carte bancaire', '💵 Espèces', '🏦 Virement', '📝 Chèque', '🎓 CPF', '💶 Permis 1€/jour', '🔄 Paiement 3x'].map(m => (
              <div key={m} className="bg-white border border-[#e7e5e4] rounded-xl px-5 py-3 text-sm font-medium text-[#1c1917] shadow-sm">{m}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
