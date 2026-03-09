'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Star, Check, ArrowRight, MapPin, Zap, Shield, Award, CreditCard, ChevronRight, Trophy, BookOpen, Car, FileText } from 'lucide-react'

// ── Compteur animé ───────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = target / 40
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(start))
      }, 30)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ── Avatars sociaux ──────────────────────────────────────────────────────────
const AVATARS = [
  { initials: 'OK', bg: '#c0451e' }, { initials: 'MM', bg: '#6366f1' },
  { initials: 'SB', bg: '#0891b2' }, { initials: 'KK', bg: '#16a34a' },
  { initials: 'JB', bg: '#f59e0b' },
]

// ── Formations accueil ───────────────────────────────────────────────────────
const FORMATIONS_HOME = [
  { emoji: '🚗', tag: 'Populaire', tagColor: 'bg-[#c0451e]/10 text-[#c0451e]', title: 'Permis B Manuel', desc: 'La formation complète : code + 20h minimum de conduite.', price: '1 099€', unit: '/ forfait 20h' },
  { emoji: '⚡', tag: 'Spécialité', tagColor: 'bg-blue-100 text-blue-700', title: 'Permis B Automatique', desc: 'Notre spécialité ! 13h minimum, plus simple et rapide.', price: '899€', unit: '/ forfait 13h' },
  { emoji: '🚀', tag: 'Tendance', tagColor: 'bg-[#c49a2f]/10 text-[#c49a2f]', title: 'Formule Accélérée', desc: 'Code + conduite intensive en 2 à 4 semaines seulement.', price: '1 399€', unit: '/ tout inclus' },
]

// ── Témoignages accueil ──────────────────────────────────────────────────────
const TEMOIGNAGES = [
  { name: 'Merya M.', date: 'Avril 2024', text: "J'ai passé 5 ans à essayer dans d'autres auto-écoles. Il ne m'a fallu que 2 semaines ici. Je recommande à 100%.", badge: 'Permis obtenu', bg: '#6366f1' },
  { name: 'Soane B.', date: 'Mars 2024', text: "Code et permis en moins de 3 mois ! L'accueil est au top et très motivant.", badge: 'Permis BVM', bg: '#0891b2' },
  { name: 'Larose L.', date: 'Mars 2023', text: "Seyba veille à ne pas vous faire payer plus d'heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS.", badge: 'Permis BVA', bg: '#7c3aed' },
]

// ── Simulateur ───────────────────────────────────────────────────────────────
const FORMATIONS_SIM = [
  { label: 'Permis B Manuel 20h', price: 1099 },
  { label: 'Permis B Auto 13h', price: 899 },
  { label: 'Accéléré', price: 1399 },
  { label: 'Code seul', price: 299 },
]
const FINANCEMENTS = [
  { label: '💰 CPF', id: 'cpf' },
  { label: '💶 Permis 1€/jour', id: 'permis1' },
  { label: '💳 Paiement 3x', id: 'x3' },
  { label: '💵 Je paie moi-même', id: 'perso' },
]

export default function HomePage() {
  const [simFormation, setSimFormation] = useState(0)
  const [simFinancement, setSimFinancement] = useState('perso')

  function getSimResult() {
    const price = FORMATIONS_SIM[simFormation].price
    if (simFinancement === 'cpf') return { main: '0€', sub: 'Finançable à 100% par votre CPF', color: '#16a34a' }
    if (simFinancement === 'permis1') return { main: '~' + Math.round(price / 36) + '€/mois', sub: 'Prêt à taux zéro — ~36 mois', color: '#0891b2' }
    if (simFinancement === 'x3') return { main: Math.round(price / 3) + '€/mois', sub: `Paiement en 3 fois — ${price}€ total`, color: '#6366f1' }
    return { main: price + '€', sub: 'Paiement comptant', color: '#c0451e' }
  }

  const simResult = getSimResult()

  // Tracker steps
  const STEPS = [
    { icon: <FileText className="w-5 h-5" />, label: 'Inscription', detail: 'Dossier simple, Oumy vous guide dans toutes les démarches.' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Code de la route', detail: 'Accès illimité en ligne + cours collectifs. Réussite garantie.' },
    { icon: <Car className="w-5 h-5" />, label: 'Heures de conduite', detail: '20h minimum, créneaux 7h-20h, moniteurs bienveillants.' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Permis en poche !', detail: 'Félicitations ! Taux de réussite 96%.' },
  ]

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="min-h-[calc(100vh-64px)] bg-[#faf9f6] flex items-center py-16 px-4">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-[#c0451e]/10 text-[#c0451e] text-sm font-medium px-4 py-2 rounded-full mb-6 border border-[#c0451e]/20">
              <MapPin className="w-3.5 h-3.5" />
              Bd Mortier — Arrêt Tram T3b — Paris 20ème
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 text-[#1c1917]">
              Le permis,<br />
              <span className="text-[#c0451e]">sans prise</span><br />
              de tête.
            </h1>

            <p className="text-[#57534e] text-lg leading-relaxed mb-8 max-w-lg">
              L&apos;auto-école la mieux notée du 20ème. Certifiée Qualiopi, finançable CPF, permis à 1€/jour. Juste devant le tram T3b.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="tel:0182833126" className="flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold px-6 py-4 rounded-[10px] transition-colors text-base">
                <Phone className="w-5 h-5" />
                S&apos;inscrire — 01 82 83 31 26
              </a>
              <Link href="/quiz" className="flex items-center justify-center gap-2 border-2 border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917] font-semibold px-6 py-4 rounded-[10px] transition-colors text-base">
                🎮 Tester le quiz code
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map(a => (
                  <div key={a.initials} style={{ backgroundColor: a.bg }} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {a.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#c49a2f] text-[#c49a2f]" />)}
                </div>
                <p className="text-sm text-[#57534e]">26 élèves ont laissé <strong>5 étoiles</strong> — Note : 5.0/5</p>
              </div>
            </div>
          </div>

          {/* Right — Stats card */}
          <div className="animate-fade-up animate-fade-up-delay-2">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-[#e7e5e4]">
              <div className="absolute -top-3 -right-3 bg-[#16a34a] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Inscriptions ouvertes
              </div>
              <h2 className="font-semibold text-[#1c1917] mb-6 flex items-center gap-2">
                📊 <span>Nos résultats en temps réel</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { emoji: '⭐', value: 5.0, suffix: '/5', label: 'Note moyenne', isFloat: true },
                  { emoji: '🏆', value: 96, suffix: '%', label: 'Satisfaction' },
                  { emoji: '💶', value: 1, suffix: '€/j', label: 'Permis à 1€' },
                  { emoji: '💬', value: 26, suffix: '', label: 'Avis vérifiés' },
                ].map(({ emoji, value, suffix, label, isFloat }) => (
                  <div key={label} className="bg-[#faf9f6] rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="font-serif text-3xl font-black text-[#c0451e] leading-none mb-1">
                      {isFloat ? value.toFixed(1) : <AnimatedCounter target={value} suffix={suffix} />}
                      {isFloat && suffix}
                    </div>
                    <div className="text-xs text-[#57534e] font-medium">{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/tarifs" className="w-full flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold py-3 rounded-xl transition-colors">
                Voir les tarifs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-[#1a1814] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm font-medium">
          {[
            { icon: '🏅', text: 'Qualiopi certifié' },
            { icon: '💰', text: 'CPF accepté' },
            { icon: '🛡️', text: 'Garantie financière' },
            { icon: '🎓', text: 'Label qualité état' },
            { icon: '💶', text: 'Permis 1€/jour' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LICENSE TRACKER ── */}
      <section className="py-20 px-4 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Ton parcours</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1917] mt-2">Vers le permis, étape par étape</h2>
          </div>
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-[#e7e5e4] hidden sm:block" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.label} className="relative flex flex-col items-center text-center group">
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all border-2 ${i < 2 ? 'bg-[#c0451e] border-[#c0451e] text-white shadow-lg' : 'bg-white border-[#e7e5e4] text-[#a8a29e] group-hover:border-[#c0451e] group-hover:text-[#c0451e]'}`}>
                    {i < 2 ? <Check className="w-6 h-6" /> : step.icon}
                  </div>
                  <h3 className="font-semibold text-[#1c1917] text-sm mb-1">{step.label}</h3>
                  <p className="text-xs text-[#57534e] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-16 bg-white shadow-lg rounded-xl p-3 border border-[#e7e5e4] z-20 w-48 left-1/2 -translate-x-1/2">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ── */}
      <section className="py-20 px-4 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Nos formations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1917] mt-2">Choisis la formule qui te ressemble</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {FORMATIONS_HOME.map(f => (
              <Link href="/formations" key={f.title} className="bg-white rounded-2xl border border-[#e7e5e4] p-6 flex flex-col card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{f.emoji}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</span>
                </div>
                <h3 className="font-bold text-[#1c1917] text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-[#57534e] flex-1 mb-4">{f.desc}</p>
                <div className="border-t border-[#e7e5e4] pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#c0451e] font-serif">{f.price}</span>
                    <span className="text-xs text-[#a8a29e] ml-1">{f.unit}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#a8a29e] group-hover:text-[#c0451e] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/formations" className="inline-flex items-center gap-2 border-2 border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917] font-semibold px-6 py-3 rounded-[10px] transition-colors">
              Voir toutes les formations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIMULATEUR ── */}
      <section className="py-20 px-4 bg-[#f5f0eb]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Simulateur</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1917] mt-2">💰 Calcule ton budget en 30 secondes</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-8 shadow-sm">
            {/* Formation */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#1c1917] mb-3">Ta formation</p>
              <div className="flex flex-wrap gap-2">
                {FORMATIONS_SIM.map((f, i) => (
                  <button key={f.label} onClick={() => setSimFormation(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${simFormation === i ? 'bg-[#c0451e] text-white border-[#c0451e]' : 'bg-white text-[#57534e] border-[#e7e5e4] hover:border-[#c0451e]'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Financement */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#1c1917] mb-3">Ton financement</p>
              <div className="flex flex-wrap gap-2">
                {FINANCEMENTS.map(f => (
                  <button key={f.id} onClick={() => setSimFinancement(f.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${simFinancement === f.id ? 'bg-[#c0451e] text-white border-[#c0451e]' : 'bg-white text-[#57534e] border-[#e7e5e4] hover:border-[#c0451e]'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Résultat */}
            <div className="bg-[#faf9f6] rounded-xl p-6 text-center mb-6 border border-[#e7e5e4]">
              <div className="font-serif text-5xl font-black mb-2 transition-all" style={{ color: simResult.color }}>
                {simResult.main}
              </div>
              <p className="text-[#57534e] text-sm">{simResult.sub}</p>
            </div>

            <a href="tel:0182833126" className="w-full flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold py-4 rounded-xl transition-colors">
              <Phone className="w-5 h-5" />
              Réserver mon évaluation gratuite — 01 82 83 31 26
            </a>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 px-4 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Témoignages</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1917] mt-2">Ils l&apos;ont fait. À ton tour.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TEMOIGNAGES.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#e7e5e4] p-6 border-l-4 card-hover flex flex-col" style={{ borderLeftColor: t.bg }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#c49a2f] text-[#c49a2f]" />)}
                </div>
                <p className="text-[#57534e] text-sm italic flex-1 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#e7e5e4]">
                  <div className="flex items-center gap-2">
                    <div style={{ backgroundColor: t.bg }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold text-[#1c1917] text-sm">{t.name}</p>
                      <p className="text-xs text-[#a8a29e]">{t.date}</p>
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
            <Link href="/avis" className="inline-flex items-center gap-2 border-2 border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917] font-semibold px-6 py-3 rounded-[10px] transition-colors">
              Voir les 26 avis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 bg-[#f5f0eb]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#c0451e] rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-white/5" />
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-4xl font-black mb-4">Prêt à prendre la route ?</h2>
              <p className="text-white/80 text-lg mb-8">Inscris-toi aujourd&apos;hui — tes premières leçons peuvent commencer cette semaine.</p>
              <a href="tel:0182833126" className="inline-flex items-center gap-2 bg-white text-[#c0451e] font-bold px-8 py-4 rounded-xl hover:bg-[#faf9f6] transition-colors text-lg">
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
