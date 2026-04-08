'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Star, Check, ArrowRight, MapPin, ChevronRight, Trophy, BookOpen, Car, FileText, Instagram } from 'lucide-react'

// ── Compteur animé ───────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = target / 50
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(parseFloat(start.toFixed(decimals)))
      }, 25)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, decimals])
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>
}

const AVATARS = [
  { initials: 'OK', bg: '#c0451e' }, { initials: 'MM', bg: '#6366f1' },
  { initials: 'SB', bg: '#0891b2' }, { initials: 'KK', bg: '#16a34a' },
  { initials: 'JB', bg: '#f59e0b' },
]

const FORMATIONS_HOME = [
  { emoji: '🚗', tag: 'Best-seller', tagBg: 'bg-[#c0451e]/10 text-[#c0451e]', title: 'Permis B Manuel', desc: 'La formation complète : code + 20h minimum de conduite.', price: '1 099€', unit: '/ forfait 20h' },
  { emoji: '⚡', tag: 'Spécialité', tagBg: 'bg-blue-100 text-blue-700', title: 'Permis B Automatique', desc: 'Notre spécialité ! 13h minimum, plus simple et rapide.', price: '899€', unit: '/ forfait 13h' },
  { emoji: '🚀', tag: 'Tendance', tagBg: 'bg-amber-100 text-amber-700', title: 'Formule Accélérée', desc: 'Code + conduite intensive en 2 à 4 semaines seulement.', price: '1 399€', unit: '/ tout inclus' },
]

const TEMOIGNAGES = [
  { name: 'Merya M.', date: 'Avril 2024', text: "J'ai passé 5 ans à essayer dans d'autres auto-écoles. Il ne m'a fallu que 2 semaines ici. Je recommande à 100%.", badge: 'Permis obtenu', bg: '#6366f1' },
  { name: 'Soane B.', date: 'Mars 2024', text: "Code et permis en moins de 3 mois ! L'accueil est au top et très motivant.", badge: 'Permis BVM', bg: '#0891b2' },
  { name: 'Larose L.', date: 'Mars 2023', text: "Seyba veille à ne pas vous faire payer plus d'heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS.", badge: 'Permis BVA', bg: '#7c3aed' },
]

const FORMATIONS_SIM = [
  { label: 'Permis B Manuel', price: 1099 },
  { label: 'Permis B Auto', price: 899 },
  { label: 'Accéléré', price: 1399 },
  { label: 'Code seul', price: 299 },
]
const FINANCEMENTS = [
  { label: '💰 CPF', id: 'cpf' },
  { label: '💶 Permis 1€/jour', id: 'permis1' },
  { label: '💳 Paiement 3x', id: 'x3' },
  { label: '💵 Je paie moi-même', id: 'perso' },
]

const STEPS = [
  { icon: '📝', label: 'Inscription', done: true },
  { icon: '📚', label: 'Code', done: true },
  { icon: '🚗', label: 'Conduite', done: false },
  { icon: '🏆', label: 'Permis !', done: false },
]

export default function HomePage() {
  const [simFormation, setSimFormation] = useState(0)
  const [simFinancement, setSimFinancement] = useState('perso')

  function getSimResult() {
    const price = FORMATIONS_SIM[simFormation].price
    if (simFinancement === 'cpf') return { main: '0€', sub: 'Finançable à 100% par votre CPF', color: '#16a34a' }
    if (simFinancement === 'permis1') return { main: `~${Math.round(price / 36)}€/mois`, sub: 'Prêt à taux zéro — ~36 mois', color: '#0891b2' }
    if (simFinancement === 'x3') return { main: `${Math.round(price / 3)}€/mois`, sub: `Paiement en 3 fois — ${price}€ total`, color: '#6366f1' }
    return { main: `${price}€`, sub: 'Paiement comptant', color: '#c0451e' }
  }

  const simResult = getSimResult()

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Gauche */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#c0451e]/10 text-[#c0451e] text-sm font-medium px-4 py-2 rounded-full mb-8 border border-[#c0451e]/20">
              <MapPin className="w-3.5 h-3.5" />
              Bd Mortier — Tram T3b — Paris 20ème
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-[#1c1917] mb-6">
              Le permis,<br />
              <span className="text-[#c0451e]">sans prise</span><br />
              de tête.
            </h1>

            <p className="text-[#57534e] text-lg leading-relaxed mb-10 max-w-md">
              L&apos;auto-école la mieux notée du 20ème. Certifiée Qualiopi, finançable CPF, permis à 1€/jour.
            </p>

            <div className="flex items-center gap-3 mb-10 flex-wrap">
              <a href="tel:0182833126"
                className="inline-flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] hover:-translate-y-0.5 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm">
                <Phone className="w-4 h-4" />
                S&apos;inscrire — 01 82 83 31 26
              </a>
              <Link href="/quiz"
                className="inline-flex items-center gap-2 border border-stone-300 hover:border-[#c0451e] hover:text-[#c0451e] text-[#57534e] font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">
                🎮 Tester le quiz code
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {AVATARS.map(a => (
                  <div key={a.initials} style={{ backgroundColor: a.bg }}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {a.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-[#57534e]">26 élèves · <strong className="text-[#1c1917]">Note 5.0/5</strong></p>
              </div>
            </div>
          </div>

          {/* Droite — Carte stats */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 relative">
              {/* Badge */}
              <div className="absolute -top-3 right-6 bg-[#16a34a] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Inscriptions ouvertes
              </div>

              <h2 className="font-semibold text-[#1c1917] mb-6 text-sm uppercase tracking-wide font-mono">
                📊 Nos résultats en temps réel
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { emoji: '⭐', value: 5.0, suffix: '/5', label: 'Note moyenne', decimals: 1 },
                  { emoji: '🏆', value: 96, suffix: '%', label: 'Satisfaction', decimals: 0 },
                  { emoji: '💶', value: 1, suffix: '€/j', label: 'Permis à 1€', decimals: 0 },
                  { emoji: '💬', value: 26, suffix: '', label: 'Avis vérifiés', decimals: 0 },
                ].map(({ emoji, value, suffix, label, decimals }) => (
                  <div key={label} className="bg-[#f5f0eb] rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{emoji}</div>
                    <div className="text-2xl font-extrabold text-[#c0451e] leading-none mb-1">
                      <AnimatedCounter target={value} suffix={suffix} decimals={decimals} />
                    </div>
                    <div className="text-xs text-stone-400 uppercase tracking-wide font-mono">{label}</div>
                  </div>
                ))}
              </div>

              <Link href="/tarifs"
                className="w-full flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                Voir les tarifs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="border-y border-stone-200 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-10 text-[#57534e] text-sm font-medium">
          {[
            { icon: '🏅', text: 'Qualiopi certifié' },
            { icon: '💰', text: 'CPF accepté' },
            { icon: '🛡️', text: 'Garantie financière' },
            { icon: '🎓', text: 'Label qualité état' },
            { icon: '💶', text: 'Permis 1€/jour' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
          <a
            href="https://www.instagram.com/autoecole_mortier"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#c0451e] transition-colors"
          >
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#f97316] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center">
              <Instagram className="w-3.5 h-3.5 text-white" />
            </span>
            <span>@autoecole_mortier</span>
          </a>
        </div>
      </section>

      {/* ── LICENSE TRACKER ── */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Ton parcours</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-2">Vers le permis, étape par étape</h2>
          </div>
          <div className="relative flex justify-between items-start">
            {/* Ligne de connexion */}
            <div className="absolute top-7 left-[14%] right-[14%] h-0.5 bg-stone-300" />
            {STEPS.map((step) => (
              <div key={step.label} className="relative flex flex-col items-center gap-3 flex-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 z-10 shadow-sm ${step.done ? 'bg-[#c0451e] border-[#c0451e]' : 'bg-white border-stone-300'}`}>
                  {step.icon}
                </div>
                <span className={`text-xs font-semibold text-center ${step.done ? 'text-[#c0451e]' : 'text-[#57534e]'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ── */}
      <section className="py-20 px-6 bg-[#faf9f6]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Nos formations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-2">Choisir la formule qui te ressemble</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {FORMATIONS_HOME.map(f => (
              <Link href="/formations" key={f.title}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{f.emoji}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${f.tagBg}`}>{f.tag}</span>
                </div>
                <h3 className="font-bold text-[#1c1917] text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-[#57534e] flex-1 mb-0">{f.desc}</p>
                <div className="border-t border-stone-200 mt-4 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-[#c0451e]">{f.price}</span>
                    <span className="text-xs text-stone-400 ml-1">{f.unit}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#f5f0eb] flex items-center justify-center group-hover:bg-[#c0451e]/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-[#c0451e]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/formations"
              className="inline-flex items-center gap-2 border border-stone-300 hover:border-[#c0451e] hover:text-[#c0451e] text-[#57534e] font-semibold px-6 py-3 rounded-xl transition-all text-sm">
              Voir toutes les formations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIMULATEUR ── */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Simulateur</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-2">💰 Calcule ton budget</h2>
            <p className="text-[#57534e] mt-2">En 30 secondes, sans inscription</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#1c1917] mb-3">Ta formation</p>
              <div className="flex flex-wrap gap-2">
                {FORMATIONS_SIM.map((f, i) => (
                  <button key={f.label} onClick={() => setSimFormation(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${simFormation === i ? 'bg-[#c0451e] text-white border-[#c0451e]' : 'bg-white text-[#57534e] border-stone-200 hover:border-[#c0451e]'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#1c1917] mb-3">Ton financement</p>
              <div className="flex flex-wrap gap-2">
                {FINANCEMENTS.map(f => (
                  <button key={f.id} onClick={() => setSimFinancement(f.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${simFinancement === f.id ? 'bg-[#c0451e] text-white border-[#c0451e]' : 'bg-white text-[#57534e] border-stone-200 hover:border-[#c0451e]'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#faf9f6] rounded-xl p-6 text-center mb-6 border border-stone-200">
              <div className="font-serif text-5xl font-extrabold mb-2 transition-all" style={{ color: simResult.color }}>
                {simResult.main}
              </div>
              <p className="text-[#57534e] text-sm">{simResult.sub}</p>
            </div>
            <a href="tel:0182833126"
              className="w-full flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold py-4 rounded-xl transition-colors">
              <Phone className="w-5 h-5" />
              Réserver mon évaluation gratuite
            </a>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 px-6 bg-[#faf9f6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Témoignages</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-2">Ils l&apos;ont fait. À ton tour.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TEMOIGNAGES.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ borderLeftWidth: 3, borderLeftColor: t.bg }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[#57534e] text-sm italic flex-1 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <div style={{ backgroundColor: t.bg }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1c1917] text-sm">{t.name}</p>
                      <p className="text-xs text-stone-400">{t.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#16a34a]/10 text-[#16a34a] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/avis"
              className="inline-flex items-center gap-2 border border-stone-300 hover:border-[#c0451e] hover:text-[#c0451e] text-[#57534e] font-semibold px-6 py-3 rounded-xl transition-all text-sm">
              Voir les 26 avis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#c0451e] rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-14 -left-10 w-44 h-44 rounded-full bg-white/5" />
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold mb-4">Prêt à prendre la route ?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Inscris-toi aujourd&apos;hui — tes premières leçons peuvent commencer cette semaine.
              </p>
              <a href="tel:0182833126"
                className="inline-flex items-center gap-2 bg-white text-[#c0451e] font-bold px-8 py-4 rounded-xl hover:bg-[#faf9f6] transition-colors text-lg shadow-lg">
                <Phone className="w-5 h-5" />
                Appeler le 01 82 83 31 26
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
