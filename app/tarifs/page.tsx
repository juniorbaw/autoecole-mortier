import type { Metadata } from 'next'
import { Check, Phone, AlertTriangle, BookOpen, Car, Zap, Rocket, CreditCard, Banknote, Landmark, FileText, GraduationCap, Euro, Info } from 'lucide-react'

export const metadata: Metadata = { title: 'Tarifs' }

// ── Forfaits principaux ───────────────────────────────────────────────────────
const PLANS = [
  {
    Icon: BookOpen, title: 'Code Seul', price: '299€', sub: 'Cours en salle', featured: false,
    features: ['Code en salle', 'Cours collectifs inclus', 'Suivi personnalisé', 'Inscription examen incluse'],
  },
  {
    Icon: Car, title: 'Permis B Manuel', price: '1 100€', sub: 'Forfait 20h de conduite', featured: false,
    features: ['Numéro NEPH inclus', 'Code en salle inclus', '20h de conduite', 'Finançable CPF', 'Compatible permis 1€/jour', 'Moniteurs certifiés'],
  },
  {
    Icon: Zap, title: 'Permis B Automatique', price: '950€', sub: 'Notre spécialité — forfait 13h', featured: true,
    features: ['Numéro NEPH inclus', 'Code en salle inclus', '13h de conduite', 'Plus accessible & rapide', 'Finançable CPF', 'Compatible permis 1€/jour'],
  },
  {
    Icon: Rocket, title: 'Formule Accélérée', price: '1 399€', sub: 'Code + conduite en 2-4 semaines', featured: false,
    features: ['Numéro NEPH inclus', 'Stage code 3 jours en salle', 'Conduite quotidienne intensive', 'Date examen prioritaire', 'Finançable CPF'],
  },
]

// ── Grilles tarifaires complètes ─────────────────────────────────────────────
const BVM_TABLE = [
  { heures: 20, normal: 1100, accelere: 1300 },
  { heures: 25, normal: 1400, accelere: 1600 },
  { heures: 30, normal: 1700, accelere: 1900 },
  { heures: 35, normal: 2000, accelere: 2200 },
  { heures: 40, normal: 2300, accelere: 2500 },
]

const BVA_TABLE = [
  { heures: 13, normal: 950,  accelere: null },
  { heures: 20, normal: 1350, accelere: 1500 },
  { heures: 25, normal: 1675, accelere: 1825 },
  { heures: 30, normal: 2050, accelere: 2200 },
  { heures: 35, normal: 2375, accelere: 2525 },
  { heures: 40, normal: 2650, accelere: 2800 },
]

// ── Modes de paiement ─────────────────────────────────────────────────────────
const PAIEMENTS = [
  { Icon: CreditCard,    label: 'Carte bancaire' },
  { Icon: Banknote,      label: 'Espèces' },
  { Icon: Landmark,      label: 'Virement' },
  { Icon: FileText,      label: 'Chèque' },
  { Icon: GraduationCap, label: 'CPF' },
  { Icon: Euro,          label: 'Permis 1€/jour' },
]

// ── Aides ─────────────────────────────────────────────────────────────────────
const AIDES = [
  { label: 'Permis à 1€/jour (15-25 ans)', value: 'Prêt taux 0', color: '#16a34a' },
  { label: 'Aide Région IDF — app LABAZ', value: "Jusqu'à 1 300€", color: '#0891b2' },
  { label: "CPF (demandeurs d'emploi)", value: "Jusqu'à 900€", color: '#6366f1' },
  { label: 'Mission locale / FAJ (18-25 ans)', value: 'Variable', color: '#f59e0b' },
  { label: 'Contrat Engagement Jeune (CEJ)', value: 'Cas par cas', color: '#ec4899' },
]

function fmt(n: number) {
  return n.toLocaleString('fr-FR') + '€'
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9f5]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Tarifs</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-4">Des prix clairs, sans surprises</h1>
          <p className="text-[#4a5a52] text-lg max-w-2xl mx-auto">
            Les tarifs les plus compétitifs du 20ème avec un service 5 étoiles.
          </p>
          {/* Ce que comprend chaque forfait */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-white border border-[#dde5dc] rounded-2xl px-8 py-4 shadow-sm">
            <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest w-full sm:w-auto">Chaque forfait comprend :</span>
            {['Numéro NEPH', 'Code en salle', 'Conduite'].map((item, i) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-[#1a2e22] font-medium">
                {i > 0 && <span className="text-[#dde5dc] hidden sm:inline">·</span>}
                <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forfaits principaux ─────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {PLANS.map((plan) => (
            <div key={plan.title} className={`relative bg-white rounded-2xl border flex flex-col overflow-hidden card-hover ${plan.featured ? 'border-[#2d6a4f] shadow-xl' : 'border-[#dde5dc]'}`}>
              {plan.featured && (
                <div className="absolute top-4 right-4 bg-[#2d6a4f] text-white text-xs font-bold px-3 py-1 rounded-full">★ SPÉCIALITÉ</div>
              )}
              <div className="p-8 flex-1">
                <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-4">
                  <plan.Icon className="w-6 h-6 text-[#2d6a4f]" />
                </div>
                <h2 className="font-bold text-[#1a2e22] text-xl mb-1">{plan.title}</h2>
                <p className="text-xs text-[#8a9690] mb-6">{plan.sub}</p>
                <div className="font-serif text-4xl font-black text-[#2d6a4f] mb-6">{plan.price}</div>
                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#4a5a52]">
                      <Check className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t border-[#dde5dc]">
                <a href="tel:0182833126"
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-colors text-sm ${plan.featured ? 'bg-[#2d6a4f] hover:bg-[#1b4332] text-white' : 'border-2 border-[#dde5dc] hover:border-[#2d6a4f] text-[#1a2e22]'}`}>
                  <Phone className="w-4 h-4" />
                  S&apos;inscrire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Heures supplémentaires */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-white rounded-2xl border border-[#dde5dc] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
              <Car className="w-6 h-6 text-[#2d6a4f]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-[#1a2e22] text-lg mb-1">Heures supplémentaires</h3>
              <p className="text-sm text-[#4a5a52]">Au-delà du forfait, chaque heure supplémentaire est facturée :</p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center bg-[#f7f9f5] rounded-xl px-5 py-3 border border-[#dde5dc]">
                <div className="font-serif font-black text-2xl text-[#2d6a4f]">60€</div>
                <div className="text-xs font-semibold text-[#4a5a52] mt-0.5">/ heure BVM</div>
                <div className="text-[10px] text-[#8a9690]">Boîte manuelle</div>
              </div>
              <div className="text-center bg-[#f7f9f5] rounded-xl px-5 py-3 border border-[#dde5dc]">
                <div className="font-serif font-black text-2xl text-[#2d6a4f]">65€</div>
                <div className="text-xs font-semibold text-[#4a5a52] mt-0.5">/ heure BVA</div>
                <div className="text-[10px] text-[#8a9690]">Boîte automatique</div>
              </div>
            </div>
          </div>
        </div>

        {/* Permis 1€/jour banner */}
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#16a34a]/10 to-[#16a34a]/5 border border-[#16a34a]/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0">
            <Euro className="w-7 h-7 text-[#16a34a]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#1a2e22] text-xl mb-1">Permis à 1€ par jour</h3>
            <p className="text-[#4a5a52] text-sm">Pour les 15-25 ans. Prêt à taux zéro, ~26€/mois. On monte le dossier avec vous, banque partenaire disponible.</p>
          </div>
          <a href="tel:0182833126" className="flex-shrink-0 flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
            J&apos;en profite →
          </a>
        </div>
      </section>

      {/* ── Grille tarifaire complète ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Grille tarifaire</span>
            <h2 className="font-serif text-3xl font-black text-[#1a2e22] mt-2">Forfaits par nombre d&apos;heures</h2>
            <p className="text-[#4a5a52] mt-2">Choisissez le volume qui correspond à votre niveau</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* BVM */}
            <div className="bg-white rounded-2xl border border-[#dde5dc] overflow-hidden shadow-sm">
              <div className="bg-[#eef2ec] px-6 py-4 border-b border-[#dde5dc] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1a2e22] text-lg">Boîte Manuelle (BVM)</h3>
                  <p className="text-xs text-[#8a9690] mt-0.5">1h supp = 60€ · Perfectionnement 10h = 600€</p>
                </div>
                <Car className="w-6 h-6 text-[#2d6a4f]" />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#dde5dc] bg-[#f7f9f5]">
                    <th className="text-left px-5 py-3 text-[#4a5a52] font-semibold">Heures</th>
                    <th className="px-5 py-3 text-[#4a5a52] font-semibold text-right">Normal</th>
                    <th className="px-5 py-3 text-[#2d6a4f] font-semibold text-right">Accéléré</th>
                  </tr>
                </thead>
                <tbody>
                  {BVM_TABLE.map((row, i) => (
                    <tr key={row.heures} className={`border-b border-[#dde5dc] ${i % 2 === 0 ? '' : 'bg-[#f7f9f5]'} ${row.heures === 20 ? 'ring-1 ring-inset ring-[#2d6a4f]/20' : ''}`}>
                      <td className="px-5 py-3.5 font-medium text-[#1a2e22]">
                        {row.heures}h
                        {row.heures === 20 && <span className="ml-2 text-[10px] font-bold bg-[#2d6a4f]/10 text-[#2d6a4f] px-2 py-0.5 rounded-full">Forfait de base</span>}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-[#1a2e22]">{fmt(row.normal)}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-[#2d6a4f]">{fmt(row.accelere)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BVA */}
            <div className="bg-white rounded-2xl border border-[#2d6a4f] overflow-hidden shadow-xl">
              <div className="bg-[#2d6a4f] px-6 py-4 border-b border-[#2d6a4f] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">Boîte Automatique (BVA)</h3>
                  <p className="text-xs text-white/70 mt-0.5">1h supp = 65€ · Perfectionnement 10h = 650€</p>
                </div>
                <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">★ Spécialité</div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#dde5dc] bg-[#f7f9f5]">
                    <th className="text-left px-5 py-3 text-[#4a5a52] font-semibold">Heures</th>
                    <th className="px-5 py-3 text-[#4a5a52] font-semibold text-right">Normal</th>
                    <th className="px-5 py-3 text-[#2d6a4f] font-semibold text-right">Accéléré</th>
                  </tr>
                </thead>
                <tbody>
                  {BVA_TABLE.map((row, i) => (
                    <tr key={row.heures} className={`border-b border-[#dde5dc] ${i % 2 === 0 ? '' : 'bg-[#f7f9f5]'} ${row.heures === 13 ? 'ring-1 ring-inset ring-[#2d6a4f]/20' : ''}`}>
                      <td className="px-5 py-3.5 font-medium text-[#1a2e22]">
                        {row.heures}h
                        {row.heures === 13 && <span className="ml-2 text-[10px] font-bold bg-[#2d6a4f]/10 text-[#2d6a4f] px-2 py-0.5 rounded-full">Forfait de base</span>}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-[#1a2e22]">{fmt(row.normal)}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-[#2d6a4f]">
                        {row.accelere ? fmt(row.accelere) : <span className="text-[#8a9690] font-normal text-xs">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note accéléré */}
          <div className="mt-4 flex items-start gap-3 bg-white border border-[#dde5dc] rounded-xl px-5 py-4 max-w-2xl mx-auto">
            <Info className="w-4 h-4 text-[#2d6a4f] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#4a5a52]">
              <strong className="text-[#1a2e22]">Formule accélérée</strong> : code en salle intensif 3 jours + conduite quotidienne. Délai obtention permis réduit à 2-4 semaines.
            </p>
          </div>
        </div>
      </section>

      {/* ── Perfectionnement ────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-[#f7f9f5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Post-forfait</span>
            <h2 className="font-serif text-2xl font-black text-[#1a2e22] mt-2">Perfectionnement</h2>
            <p className="text-[#4a5a52] mt-1 text-sm">Pour les élèves qui souhaitent consolider leur conduite après le forfait</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#dde5dc] p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                <Car className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="font-bold text-[#1a2e22] mb-0.5">Perfectionnement BVM</p>
                <p className="text-sm text-[#4a5a52]">10 heures de conduite boîte manuelle</p>
                <p className="font-serif font-black text-2xl text-[#2d6a4f] mt-1">600€</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#2d6a4f] p-6 flex items-center gap-5 shadow-md">
              <div className="w-14 h-14 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="font-bold text-[#1a2e22] mb-0.5">Perfectionnement BVA</p>
                <p className="text-sm text-[#4a5a52]">10 heures de conduite boîte automatique</p>
                <p className="font-serif font-black text-2xl text-[#2d6a4f] mt-1">650€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Offres Spéciales ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Offres spéciales</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a2e22] mt-2">-15% sur ton permis</h2>
            <p className="text-[#4a5a52] mt-2">Deux offres exclusives pour payer moins cher</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offre Étudiants */}
            <div className="bg-white rounded-2xl border border-[#dde5dc] overflow-hidden shadow-sm">
              <div className="bg-[#eef2ec] px-6 py-4 border-b border-[#dde5dc]">
                <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest">Offre Étudiants</span>
                <h3 className="font-serif text-2xl font-black text-[#1a2e22] mt-1">-15% avec ta carte étudiante</h3>
                <p className="text-sm text-[#4a5a52] mt-1">Carte étudiante ou lycéen valide</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#f7f9f5] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Permis B Manuel 20h</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#2d6a4f] text-xl">935€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">1 100€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f7f9f5] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Permis B Auto 13h</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#2d6a4f] text-xl">808€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">950€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f7f9f5] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Code Seul</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#2d6a4f] text-xl">254€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">299€</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#16a34a]/10 border border-[#16a34a]/20 rounded-xl p-3 mb-4 text-center">
                  <span className="text-sm font-bold text-[#16a34a]">15-25 ans ? Permis à 1€/jour — soit ~26€/mois !</span>
                </div>
                <p className="text-xs text-[#8a9690]">Non cumulable avec l&apos;offre QPV.</p>
              </div>
            </div>

            {/* Offre QPV */}
            <div className="bg-white rounded-2xl border border-[#3b82f6]/40 overflow-hidden shadow-sm">
              <div className="bg-[#eff6ff] px-6 py-4 border-b border-[#3b82f6]/20">
                <span className="text-xs font-bold text-[#3b82f6] uppercase tracking-widest">Offre Quartier Solidaire</span>
                <h3 className="font-serif text-2xl font-black text-[#1a2e22] mt-1">-15% pour le 20ème QPV</h3>
                <p className="text-sm text-[#4a5a52] mt-1">Habitants des quartiers prioritaires du 20ème</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#f0f9ff] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Permis B Manuel 20h</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#3b82f6] text-xl">935€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">1 100€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f0f9ff] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Permis B Auto 13h</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#3b82f6] text-xl">808€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">950€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f0f9ff] rounded-xl">
                    <span className="text-sm font-medium text-[#4a5a52]">Code Seul</span>
                    <div className="text-right">
                      <span className="font-serif font-black text-[#3b82f6] text-xl">254€</span>
                      <span className="text-xs text-[#8a9690] ml-1 line-through">299€</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#8a9690]">Justificatif de domicile en QPV du 20e requis. Non cumulable avec l&apos;offre étudiante.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aides disponibles ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#f7f9f5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Financement</span>
            <h2 className="font-serif text-3xl font-black text-[#1a2e22] mt-2">Aides disponibles en 2026</h2>
            <p className="text-[#4a5a52] mt-2">Jusqu&apos;à 0€ de reste à charge !</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#dde5dc] overflow-hidden mb-6">
            {AIDES.map((aide, i) => (
              <div key={aide.label} className={`flex items-center justify-between px-6 py-4 ${i < AIDES.length - 1 ? 'border-b border-[#eef2ec]' : ''}`}>
                <span className="text-sm text-[#4a5a52]">{aide.label}</span>
                <span className="font-bold text-sm" style={{ color: aide.color }}>{aide.value}</span>
              </div>
            ))}
            <div className="px-6 py-4 bg-[#16a34a]/5 border-t border-[#16a34a]/20 text-center">
              <span className="font-bold text-[#16a34a]">= Jusqu&apos;à 0€ de reste à charge</span>
            </div>
          </div>

          {/* Alerte aides supprimées */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm mb-1">Aides récemment supprimées</p>
              <p className="text-amber-700 text-sm">Aide France Travail (1 200€) supprimée au 1er avril 2026</p>
              <p className="text-amber-700 text-sm">Aide apprentis (500€) supprimée en février 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parrainage ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#0a1410]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Parrainage Double Bonus</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mt-2">Parraine un ami</h2>
            <p className="text-white/60 mt-2">Tout le monde y gagne !</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest mb-3">CE QUE TU REÇOIS</p>
              <div className="font-serif text-3xl font-black text-white mb-1">1h de conduite offerte</div>
              <p className="text-white/60 text-sm mb-2">+ 50€ de réduction sur tes heures</p>
              <div className="bg-[#2d6a4f]/20 border border-[#2d6a4f]/30 rounded-xl px-4 py-2 inline-block">
                <span className="text-[#2d6a4f] font-bold text-sm">Valeur totale : jusqu&apos;à 110€ d&apos;avantage</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest mb-3">CE QUE TON AMI REÇOIT</p>
              <div className="font-serif text-3xl font-black text-white mb-1">-50€ sur son inscription</div>
              <p className="text-white/60 text-sm">Sur n&apos;importe quel forfait</p>
            </div>
          </div>

          <div className="bg-white/5 border border-[#2d6a4f]/30 rounded-2xl p-6">
            <p className="text-xs font-bold text-[#2d6a4f] uppercase tracking-widest mb-5 text-center">SUPER PARRAIN — PALIERS</p>
            <div className="space-y-4">
              {[
                { seuil: '3 amis inscrits',  reward: '+1h conduite gratuite',          valeur: '(60€ de valeur)' },
                { seuil: '5 amis inscrits',  reward: '+2h conduite gratuites',          valeur: '(120€ de valeur)' },
                { seuil: '10 amis inscrits', reward: 'Conversion BVA→BVM OFFERTE',      valeur: '(345€ de valeur)' },
              ].map((p, i) => (
                <div key={p.seuil}>
                  {i > 0 && <div className="h-px bg-white/10 mb-4" />}
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-medium">{p.seuil}</span>
                    <div className="text-right">
                      <span className="font-bold text-[#2d6a4f]">{p.reward}</span>
                      <span className="text-white/40 text-xs ml-2">{p.valeur}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-white/40 text-sm mt-6">
            Pour obtenir ton code parrain, demande à Oumy — <a href="tel:0182833126" className="text-[#2d6a4f] hover:underline">01 82 83 31 26</a>
          </p>
        </div>
      </section>

      {/* ── Modalité de paiement ─────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-[#eef2ec]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Modalités</span>
          <h2 className="font-serif text-2xl font-black text-[#1a2e22] mt-2 mb-2">Modes de paiement acceptés</h2>
          <p className="text-sm text-[#4a5a52] mb-8">Règlement à l&apos;inscription. Financement CPF et Permis 1€/jour possibles.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PAIEMENTS.map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-[#dde5dc] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1a2e22] shadow-sm flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#2d6a4f]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
