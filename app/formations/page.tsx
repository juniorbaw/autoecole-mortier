import type { Metadata } from 'next'
import { Phone, Check, Car, Zap, Rocket, Users, Euro, Eye, Repeat, Smartphone, RefreshCcw } from 'lucide-react'
import TiltCard from '@/components/TiltCard'

export const metadata: Metadata = { title: 'Formations' }

const FORMATIONS = [
  { Icon: Car,        tag: 'Best-seller', tagColor: 'bg-[#2d6a4f]/10 text-[#2d6a4f]', title: 'Permis B Manuel', price: '1 099€', sub: 'Numéro NEPH + code en salle inclus', features: ['Code de la route inclus', '20h de conduite minimum', 'Accompagnement à l\'examen', 'Finançable CPF', 'Compatible permis 1€/jour', 'Moniteurs certifiés'] },
  { Icon: Zap,        tag: 'Spécialité', tagColor: 'bg-blue-100 text-blue-700', title: 'Permis B Automatique', price: '949€', sub: 'Notre spécialité — 13h minimum', features: ['Code de la route inclus', '13h de conduite minimum', 'Plus accessible', 'Idéal mobilité urbaine', 'Finançable CPF', 'Compatible permis 1€/jour'] },
  { Icon: Rocket,     tag: 'Express', tagColor: 'bg-indigo-100 text-indigo-700', title: 'Formule Accélérée', price: '1 399€', sub: 'Permis en 2 à 4 semaines', features: ['Stage code 3 jours', 'Conduite quotidienne intensive', 'Date examen prioritaire', 'Finançable CPF', 'Résultat en 2-4 semaines', 'Suivi personnalisé'] },
  { Icon: Users,      tag: 'Recommandé', tagColor: 'bg-green-100 text-green-700', title: 'Conduite Accompagnée AAC', price: '1 199€', sub: 'Dès 15 ans — La plus économique', features: ['Dès 15 ans', 'Accompagné par un proche', 'Conduite supervisée incluse', 'Finançable CPF', 'Moins d\'heures payantes', 'Bonus assurance'] },
  { Icon: Euro,       tag: '15-25 ans', tagColor: 'bg-green-100 text-green-700', title: 'Permis à 1€/jour', price: '~30€/mois', sub: 'Prêt à taux zéro — pour les 15-25 ans', features: ['Prêt sans intérêt', 'Pour les 15-25 ans', 'On monte le dossier', 'Banque partenaire', 'Remboursement flexible', 'Zéro frais de dossier'] },
  { Icon: Eye,        tag: 'Post-permis', tagColor: 'bg-gray-100 text-gray-700', title: 'Conduite Supervisée', price: 'Sur devis', sub: 'Pour les permis récents', features: ['Après l\'obtention du permis', 'Réduction franchise assurance', 'Accompagné par un proche', 'Période probatoire accélérée', 'Conseils personnalisés', 'Flexibilité totale'] },
  { Icon: Repeat,     tag: 'Passerelle', tagColor: 'bg-orange-100 text-orange-700', title: 'Passerelle BVA→BVM', price: '420€', sub: 'Passer de l\'automatique au manuel', features: ['7h de conduite minimum', 'Examen pratique uniquement', 'Rapide et efficace', 'Moniteurs experts', 'Flexibilité des créneaux', 'Attestation officielle'] },
  { Icon: Smartphone, tag: 'En ligne', tagColor: 'bg-purple-100 text-purple-700', title: 'Code en ligne', price: '50€', sub: 'Accès plateforme illimité', features: ['Accès illimité en ligne', 'Exercices thématiques', 'Statistiques de progression', 'Compatible mobile', 'Disponible 24h/24', 'Mises à jour incluses'] },
  { Icon: RefreshCcw, tag: 'Récupération', tagColor: 'bg-red-100 text-red-700', title: 'Annulation de Permis', price: 'Sur devis', sub: 'Récupérer son permis annulé', features: ['Bilan de compétences', 'Stage de sensibilisation', 'Accompagnement juridique', 'Suivi personnalisé', 'Démarches administratives', 'Discrétion assurée'] },
]

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Formations</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-4">
            Toutes nos formations
          </h1>
          <p className="text-[#4a5a52] text-lg max-w-2xl mx-auto">
            Des formules adaptées à chaque profil, chaque budget, chaque objectif. Certifiées Qualiopi, finançables CPF.
          </p>
        </div>
      </section>

      {/* Grille formations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FORMATIONS.map((f, i) => (
            <TiltCard
              key={f.title}
              className="bg-white rounded-2xl border border-[#dde5dc] overflow-hidden flex flex-col animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                    <f.Icon className="w-6 h-6 text-[#2d6a4f]" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</span>
                </div>
                <h2 className="font-bold text-[#1a2e22] text-xl mb-1">{f.title}</h2>
                <p className="text-xs text-[#8a9690] mb-4">{f.sub}</p>
                <ul className="space-y-2">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-[#4a5a52]">
                      <Check className="w-3.5 h-3.5 text-[#2d6a4f] flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[#dde5dc] p-6 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-black text-[#2d6a4f]">{f.price}</span>
                </div>
                <a href="tel:0182833126" className="flex items-center gap-1.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold px-4 py-2 rounded-[10px] transition-colors text-sm">
                  <Phone className="w-3.5 h-3.5" />
                  S&apos;inscrire
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#4a5a52] mb-4">Vous ne savez pas quelle formation choisir ?</p>
          <a href="tel:0182833126" className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors">
            <Phone className="w-5 h-5" />
            Appelez-nous — 01 82 83 31 26
          </a>
          <p className="text-xs text-[#8a9690] mt-3">Oumy vous conseillera gratuitement</p>
        </div>
      </section>
    </div>
  )
}
