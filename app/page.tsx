'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Phone, Star, Check, ArrowRight, MapPin, ChevronRight,
  Quote, Leaf, Shield, Award, Zap, Clock, Users, TrendingUp,
} from 'lucide-react'

// ── Compteur animé ───────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(parseFloat(start.toFixed(decimals)))
    }, 20)
    return () => clearInterval(timer)
  }, [inView, target, decimals])

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>
}

// ── Data ─────────────────────────────────────────────────────────────────────
const AVATARS = [
  { initials: 'OK', bg: '#c0451e' },
  { initials: 'MM', bg: '#6366f1' },
  { initials: 'SB', bg: '#0891b2' },
  { initials: 'KK', bg: '#16a34a' },
  { initials: 'JB', bg: '#f59e0b' },
]

const BENTO_ITEMS = [
  {
    id: 'satisfaction',
    colSpan: 'md:col-span-2',
    rowSpan: '',
    bg: 'bg-[#c0451e]',
    textColor: 'text-white',
    value: '96%',
    label: 'Taux de satisfaction',
    desc: 'Nos élèves recommandent l\'auto-école Mortier à leurs proches.',
    icon: <Users className="w-8 h-8 text-white/40" />,
    accent: 'big',
  },
  {
    id: 'qualiopi',
    colSpan: 'md:col-span-1',
    bg: 'glass',
    value: '🏅',
    label: 'Qualiopi',
    desc: 'Certification nationale qualité formation',
    icon: null,
    accent: 'icon',
  },
  {
    id: 'cpf',
    colSpan: 'md:col-span-1',
    bg: 'glass',
    value: '💰',
    label: 'CPF accepté',
    desc: 'Financement 100% via votre compte formation',
    icon: null,
    accent: 'icon',
  },
  {
    id: 'google',
    colSpan: 'md:col-span-1',
    bg: 'glass',
    value: '5.0',
    suffix: '/5',
    label: 'Note Google',
    desc: '26 avis vérifiés',
    icon: null,
    accent: 'rating',
  },
  {
    id: 'permis1',
    colSpan: 'md:col-span-1',
    bg: 'glass',
    value: '1€',
    suffix: '/jour',
    label: 'Permis à 1€',
    desc: 'Prêt à taux zéro accessible',
    icon: null,
    accent: 'price',
  },
]

const ECO_KPIS = [
  { value: '-30%', label: 'Carburant économisé', desc: 'grâce aux techniques d\'anticipation' },
  { value: '-25%', label: 'CO₂ réduit', desc: 'par rapport à la conduite classique' },
  { value: '100%', label: 'Élèves formés', desc: 'aux gestes éco-responsables' },
  { value: '3×', label: 'Durée de vie pneus', desc: 'avec la conduite douce enseignée' },
]

const TEMOIGNAGES = [
  {
    name: 'Merya M.', date: 'Avril 2024',
    text: "J'ai passé 5 ans à essayer dans d'autres auto-écoles. Il ne m'a fallu que 2 semaines ici. Je recommande à 100%.",
    badge: 'Permis BVA', bg: '#6366f1',
  },
  {
    name: 'Soane B.', date: 'Mars 2024',
    text: "Code et permis en moins de 3 mois ! L'accueil est au top et très motivant. Oumy et Seyba sont au top !",
    badge: 'Permis BVM', bg: '#0891b2',
  },
  {
    name: 'Larose L.', date: 'Mars 2023',
    text: "Seyba veille à ne pas vous faire payer plus d'heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS.",
    badge: 'Permis BVA', bg: '#7c3aed',
  },
]

const FORMATIONS_HOME = [
  {
    emoji: '🚗', tag: 'Best-seller', tagBg: 'bg-[#c0451e]/10 text-[#c0451e]',
    title: 'Permis B Manuel', desc: 'La formation complète : code + 20h minimum de conduite.',
    price: '1 099€', unit: '/ forfait 20h',
  },
  {
    emoji: '⚡', tag: 'Spécialité', tagBg: 'bg-blue-100 text-blue-700',
    title: 'Permis B Automatique', desc: 'Notre spécialité ! 13h minimum, plus simple et rapide.',
    price: '899€', unit: '/ forfait 13h',
  },
  {
    emoji: '🚀', tag: 'Tendance', tagBg: 'bg-amber-100 text-amber-700',
    title: 'Formule Accélérée', desc: 'Code + conduite intensive en 2 à 4 semaines seulement.',
    price: '1 399€', unit: '/ tout inclus',
  },
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

// ── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [simFormation, setSimFormation] = useState(0)
  const [simFinancement, setSimFinancement] = useState('perso')

  function getSimResult() {
    const price = FORMATIONS_SIM[simFormation].price
    if (simFinancement === 'cpf')    return { main: '0€',                 sub: 'Finançable à 100% par votre CPF',            color: '#16a34a' }
    if (simFinancement === 'permis1') return { main: `~${Math.round(price / 36)}€/mois`, sub: 'Prêt à taux zéro — ~36 mois', color: '#0891b2' }
    if (simFinancement === 'x3')     return { main: `${Math.round(price / 3)}€/mois`,   sub: `Paiement en 3 fois — ${price}€ total`, color: '#6366f1' }
    return { main: `${price}€`, sub: 'Paiement comptant', color: '#c0451e' }
  }

  const simResult = getSimResult()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center py-24 px-6 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-24 -left-40 w-96 h-96 rounded-full opacity-40 float-circle"
          style={{ background: 'radial-gradient(circle, rgba(192,69,30,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-24 -right-40 w-[500px] h-[500px] rounded-full opacity-30 animate-float-reverse"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* ── Gauche ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge localisation */}
            <motion.div variants={fadeUp} custom={0}>
              <div
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-6 pulse-badge"
                style={{
                  color: 'var(--brand)',
                  backgroundColor: 'rgba(192,69,30,0.08)',
                  border: '1px solid rgba(192,69,30,0.2)',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
                <MapPin className="w-3.5 h-3.5" />
                Paris 20ème · Tram T3b · Adrienne Bolland
              </div>
            </motion.div>

            {/* Titre — italic serif */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif font-black leading-tight tracking-tight mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                fontStyle: 'italic',
                color: 'var(--dark-text)',
                letterSpacing: '-0.03em',
              }}
            >
              Le permis,<br />
              <span style={{ color: 'var(--brand)' }}>sans prise</span><br />
              <span style={{ fontStyle: 'normal' }}>de tête.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--secondary-text)' }}
            >
              Bienvenue chez l&apos;auto-école la mieux notée du 20ème. Certifiée Qualiopi,
              finançable CPF, permis à 1€/jour.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex items-center gap-3 mb-10 flex-wrap">
              <a
                href="tel:0182833126"
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--brand)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
              >
                <Phone className="w-4 h-4" />
                S&apos;inscrire — 01 82 83 31 26
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm hover:-translate-y-0.5"
                style={{
                  color: 'var(--secondary-text)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--card-bg)',
                }}
              >
                🎮 Quiz gratuit (3 min)
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} custom={4} className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {AVATARS.map(a => (
                  <div
                    key={a.initials}
                    style={{ backgroundColor: a.bg }}
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-[#0a0f0b] flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                  <strong style={{ color: 'var(--dark-text)' }}>5.0/5</strong> · 26 avis vérifiés
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Droite — Stats card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div
              className="rounded-2xl border p-8 relative shadow-2xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Inscriptions badge */}
              <div className="absolute -top-3 right-6 bg-[#16a34a] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Inscriptions ouvertes
              </div>

              <h2
                className="font-semibold mb-6 text-xs uppercase tracking-widest font-mono"
                style={{ color: 'var(--secondary-text)' }}
              >
                📊 Nos résultats
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { emoji: '⭐', value: 5.0, suffix: '/5',  label: 'Note moyenne',    decimals: 1 },
                  { emoji: '🏆', value: 96,  suffix: '%',   label: 'Satisfaction',    decimals: 0 },
                  { emoji: '💶', value: 1,   suffix: '€/j', label: 'Permis à 1€',     decimals: 0 },
                  { emoji: '💬', value: 26,  suffix: '',    label: 'Avis vérifiés',   decimals: 0 },
                ].map(({ emoji, value, suffix, label, decimals }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <div className="text-2xl mb-2">{emoji}</div>
                    <div className="text-2xl font-extrabold leading-none mb-1 font-serif"
                      style={{ color: 'var(--brand)' }}>
                      <AnimatedCounter target={value} suffix={suffix} decimals={decimals} />
                    </div>
                    <div className="text-xs uppercase tracking-wide font-mono"
                      style={{ color: 'var(--light-text)' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/tarifs"
                className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
                style={{ backgroundColor: 'var(--brand)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
              >
                Voir les tarifs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 shadow-lg border text-xs font-semibold flex items-center gap-2 animate-float"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--dark-text)',
              }}
            >
              <span className="text-lg">🚗</span>
              Permis en ~3 semaines
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="border-y py-8 px-6"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-10 text-sm font-medium"
          style={{ color: 'var(--secondary-text)' }}>
          {[
            { icon: '🏅', text: 'Qualiopi certifié' },
            { icon: '💰', text: 'CPF accepté' },
            { icon: '🛡️', text: 'Garantie financière' },
            { icon: '🎓', text: 'Label qualité état' },
            { icon: '💶', text: 'Permis 1€/jour' },
            { icon: '⭐', text: '5.0/5 Google' },
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

      {/* ══════════════════════════════════════════════════════════════════════
          BENTO GRID — Pourquoi choisir Mortier
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="font-mono text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--brand)' }}
            >
              Pourquoi nous choisir
            </span>
            <h2
              className="font-serif italic font-black mt-2"
              style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              L&apos;excellence, au quotidien
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Large card — satisfaction */}
            <motion.div
              className="md:col-span-2 bg-[#c0451e] rounded-2xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-white/10" />
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Users className="w-3.5 h-3.5" /> Satisfaction élèves
                </div>
                <div className="font-serif font-black text-white leading-none mb-3"
                  style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}>
                  96%
                </div>
                <p className="text-white/80 text-base max-w-sm">
                  Nos élèves nous recommandent à leurs proches. Ici, on ne fait pas juste passer un examen — on vous prépare à conduire pour la vie.
                </p>
              </div>
            </motion.div>

            {/* Small card — Qualiopi */}
            <motion.div
              className="glass rounded-2xl p-7 flex flex-col justify-between cursor-default hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">🏅</div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--dark-text)' }}>Qualiopi Certifié</h3>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Certification qualité nationale — gage d&apos;excellence pédagogique</p>
              </div>
            </motion.div>

            {/* Small card — CPF */}
            <motion.div
              className="glass rounded-2xl p-7 flex flex-col justify-between cursor-default hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">💰</div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--dark-text)' }}>CPF Accepté</h3>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Financement 100% possible via votre compte formation</p>
              </div>
            </motion.div>

            {/* Medium card — Note Google */}
            <motion.div
              className="glass rounded-2xl p-7 flex flex-col justify-between cursor-default hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <div
                  className="font-serif font-black leading-none mb-1"
                  style={{ color: 'var(--dark-text)', fontSize: '3rem' }}
                >
                  5.0
                </div>
                <p className="font-bold" style={{ color: 'var(--dark-text)' }}>Note Google</p>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>sur 26 avis vérifiés</p>
              </div>
            </motion.div>

            {/* Small card — Permis 1€/j */}
            <motion.div
              className="glass rounded-2xl p-7 flex flex-col justify-between cursor-default hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">💶</div>
              <div>
                <div className="font-serif font-black text-3xl mb-1" style={{ color: 'var(--brand)' }}>
                  1€<span className="text-base font-semibold">/jour</span>
                </div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--dark-text)' }}>Permis à 1€</h3>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Prêt à taux zéro, accessible à tous</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FORMATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-main)' }} id="formations">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Nos formations
            </span>
            <h2 className="font-serif italic font-black mt-2" style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Choisis la formule qui te ressemble
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FORMATIONS_HOME.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Link
                  href="/formations"
                  className="rounded-2xl border p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer group block"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{f.emoji}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${f.tagBg}`}>{f.tag}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--dark-text)' }}>{f.title}</h3>
                  <p className="text-sm flex-1" style={{ color: 'var(--secondary-text)' }}>{f.desc}</p>
                  <div className="border-t mt-4 pt-3 flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                    <div>
                      <span className="text-xl font-extrabold font-serif" style={{ color: 'var(--brand)' }}>{f.price}</span>
                      <span className="text-xs ml-1" style={{ color: 'var(--light-text)' }}>{f.unit}</span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: 'var(--brand)' }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              style={{
                color: 'var(--secondary-text)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg)',
              }}
            >
              Voir toutes les formations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SIMULATEUR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Simulateur
            </span>
            <h2 className="font-serif italic font-black mt-2" style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              💰 Calcule ton budget
            </h2>
            <p className="mt-2" style={{ color: 'var(--secondary-text)' }}>En 30 secondes, sans inscription</p>
          </motion.div>

          <motion.div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--dark-text)' }}>Ta formation</p>
              <div className="flex flex-wrap gap-2">
                {FORMATIONS_SIM.map((f, i) => (
                  <button
                    key={f.label}
                    onClick={() => setSimFormation(i)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: simFormation === i ? 'var(--brand)' : 'var(--card-bg)',
                      color: simFormation === i ? 'white' : 'var(--secondary-text)',
                      borderColor: simFormation === i ? 'var(--brand)' : 'var(--border-color)',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--dark-text)' }}>Ton financement</p>
              <div className="flex flex-wrap gap-2">
                {FINANCEMENTS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSimFinancement(f.id)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: simFinancement === f.id ? 'var(--brand)' : 'var(--card-bg)',
                      color: simFinancement === f.id ? 'white' : 'var(--secondary-text)',
                      borderColor: simFinancement === f.id ? 'var(--brand)' : 'var(--border-color)',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-6 text-center mb-6 border"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <motion.div
                key={simResult.main}
                className="font-serif font-black mb-2"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', color: simResult.color }}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {simResult.main}
              </motion.div>
              <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>{simResult.sub}</p>
            </div>

            <a
              href="tel:0182833126"
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-colors"
              style={{ backgroundColor: 'var(--brand)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
            >
              <Phone className="w-5 h-5" />
              Calculer mon budget
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ÉCO-CONDUITE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c2416 0%, #143020 60%, #0f2a1e 100%)' }}>
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)`,
          }}
        />
        {/* Floating orb */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 float-circle"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-green-500/20">
                <Leaf className="w-3.5 h-3.5" />
                Éco-conduite
              </div>
              <h2
                className="font-serif italic font-black text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
              >
                Conduire mieux,<br />
                <span className="text-green-300">consommer moins</span>
              </h2>
              <p className="text-green-100/75 text-lg leading-relaxed mb-8">
                Notre approche pédagogique intègre les techniques d&apos;éco-conduite dès le premier cours.
                Vous apprenez à anticiper, à doser l&apos;accélérateur et à préserver votre véhicule —
                des réflexes qui durent toute une vie.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Anticipation', 'Frein moteur', 'Vitesses optimales', 'Charge aérodynamique'].map(tag => (
                  <span key={tag} className="bg-green-500/15 text-green-200 text-xs font-medium px-3 py-1.5 rounded-full border border-green-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — KPI cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {ECO_KPIS.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-6 border"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(8px)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="font-serif font-black text-green-300 leading-none mb-2"
                    style={{ fontSize: '2.25rem' }}>
                    {kpi.value}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{kpi.label}</div>
                  <div className="text-green-100/60 text-xs leading-relaxed">{kpi.desc}</div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MESSAGE DU FONDATEUR — Seyba Doucouré
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
        {/* Decorative quote watermark */}
        <div
          className="absolute top-10 right-10 font-serif font-black opacity-5 select-none pointer-events-none"
          style={{ fontSize: '20rem', color: 'var(--brand)', lineHeight: 1 }}
          aria-hidden
        >
          "
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Left — Identity */}
            <div className="text-center lg:text-left">
              <div
                className="w-28 h-28 text-white rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-5 shadow-2xl font-serif font-black"
                style={{ backgroundColor: 'var(--brand)', fontSize: '3rem', fontStyle: 'italic' }}
              >
                S
              </div>
              <h3 className="font-serif font-black text-xl mb-1" style={{ color: 'var(--dark-text)' }}>
                Seyba Doucouré
              </h3>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--brand)' }}>
                Directeur & Fondateur
              </p>
              <p className="text-xs" style={{ color: 'var(--light-text)' }}>
                Auto-école Mortier, Paris 20ème
              </p>

              {/* Trust indicators */}
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { icon: <Shield className="w-3.5 h-3.5" />, text: 'Qualiopi certifié' },
                  { icon: <Award className="w-3.5 h-3.5" />, text: 'Label qualité état' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-xs justify-center lg:justify-start"
                    style={{ color: 'var(--secondary-text)' }}>
                    <span style={{ color: 'var(--brand)' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quote */}
            <div className="lg:col-span-2 relative">
              <Quote
                className="w-10 h-10 absolute -top-3 -left-3"
                style={{ color: 'var(--brand)', opacity: 0.25 }}
              />
              <blockquote
                className="font-serif italic font-black leading-snug mb-6 pl-4"
                style={{
                  color: 'var(--dark-text)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                }}
              >
                &ldquo;Mon objectif, c&apos;est que vous ayez votre permis sans stress et sans vous ruiner.&rdquo;
              </blockquote>

              <p className="leading-relaxed mb-6" style={{ color: 'var(--secondary-text)' }}>
                Je veille personnellement à ce que personne ne paie une heure de trop.
                Si mes moniteurs disent que vous êtes prêt, c&apos;est que vous l&apos;êtes.
                Pas de course aux heures, pas de pression commerciale —
                juste l&apos;efficacité et l&apos;honnêteté qui ont bâti notre réputation.
              </p>

              {/* Stats inline */}
              <div className="flex flex-wrap gap-6 mb-6">
                {[
                  { value: '5.0', label: 'Note Google' },
                  { value: '96%', label: 'Satisfaction' },
                  { value: '26', label: 'Avis vérifiés' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-serif font-black text-2xl" style={{ color: 'var(--brand)' }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: 'var(--secondary-text)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Signature */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
                <span className="font-serif italic text-sm" style={{ color: 'var(--brand)' }}>
                  — Seyba
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TÉMOIGNAGES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Avatar stacking */}
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-3">
                {AVATARS.map(a => (
                  <div
                    key={a.initials}
                    style={{ backgroundColor: a.bg }}
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  >
                    {a.initials}
                  </div>
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--dark-text)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  +21
                </div>
              </div>
            </div>

            {/* Certification badges */}
            <div className="flex justify-center gap-3 mb-5 flex-wrap">
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--dark-text)',
                }}
              >
                ⭐ Google · 5.0/5
              </span>
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--dark-text)',
                }}
              >
                🏅 Qualiopi Certifié
              </span>
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--dark-text)',
                }}
              >
                <Check className="w-3 h-3 text-[#16a34a]" /> 26 avis vérifiés
              </span>
            </div>

            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Témoignages
            </span>
            <h2
              className="font-serif italic font-black mt-2"
              style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Ils ont leur permis.<br />À toi de jouer.
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TEMOIGNAGES.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  borderLeftWidth: '4px',
                  borderLeftColor: t.bg,
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm italic flex-1 mb-4 leading-relaxed" style={{ color: 'var(--secondary-text)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: t.bg }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--dark-text)' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: 'var(--light-text)' }}>{t.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#16a34a]/10 text-[#16a34a] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              href="/avis"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              style={{
                color: 'var(--secondary-text)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg)',
              }}
            >
              Voir les 26 avis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHIFFRES CLÉS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Statistiques
            </span>
            <h2 className="font-serif italic font-black mt-2" style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Les chiffres qui parlent
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: '100% satisfait',      icon: '😊', value: 100,  decimals: 0 },
              { label: 'Note Google',          icon: '⭐', value: 5.0,  decimals: 1 },
              { label: 'Avis vérifiés',        icon: '✓',  value: 26,   decimals: 0 },
              { label: 'Semaines en moyenne',  icon: '⏱️', value: 3,    decimals: 0, unit: 'sem' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="font-serif font-black mb-2" style={{ fontSize: '3rem', color: 'var(--brand)' }}>
                  <AnimatedCounter target={stat.value} decimals={stat.decimals} />
                  {stat.unit && <span className="text-lg ml-1" style={{ color: 'var(--secondary-text)' }}>{stat.unit}</span>}
                </div>
                <div className="font-medium text-sm" style={{ color: 'var(--secondary-text)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARCOURS GAMIFIÉ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Ton parcours
            </span>
            <h2 className="font-serif italic font-black mt-2" style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Ton chemin vers le permis
            </h2>
          </motion.div>

          <div className="relative flex justify-between items-start">
            <div className="absolute top-7 left-[14%] right-[14%] h-0.5" style={{ backgroundColor: 'var(--border-color)' }} />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className="relative flex flex-col items-center gap-3 flex-1"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 z-10 shadow-sm transition-all"
                  style={{
                    backgroundColor: step.done ? 'var(--brand)' : 'var(--card-bg)',
                    borderColor: step.done ? 'var(--brand)' : 'var(--border-color)',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs font-semibold text-center"
                  style={{ color: step.done ? 'var(--brand)' : 'var(--secondary-text)' }}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="#formations"
              className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              style={{ backgroundColor: 'var(--brand)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
            >
              Commence ton parcours maintenant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          QUIZ TEASER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(192,69,30,0.04) 12px, rgba(192,69,30,0.04) 24px)`,
          }}
        />
        <motion.div
          className="max-w-4xl mx-auto relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif italic font-black mb-4" style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
            🎮 Teste tes connaissances code !
          </h2>
          <p className="text-lg mb-10" style={{ color: 'var(--secondary-text)' }}>
            Gratuit, 100% ludique, résultats instantanés.
          </p>
          <div className="grid grid-cols-3 gap-6 mb-10">
            {[
              { value: '30', label: 'Questions' },
              { value: '~8 min', label: 'Durée' },
              { value: 'Débutant', label: 'Niveau' },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="font-mono text-2xl font-bold mb-1" style={{ color: 'var(--brand)' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--secondary-text)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--brand)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
          >
            Commencer le quiz <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-3xl p-12 text-white text-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--brand)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="relative">
              <h2 className="font-serif italic font-black mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
                Prêt à prendre la route ?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Commence dès cette semaine. Premier cours d&apos;essai gratuit.
              </p>
              <a
                href="tel:0182833126"
                className="inline-flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ color: 'var(--brand)' }}
              >
                <Phone className="w-5 h-5" />
                📞 01 82 83 31 26
              </a>
              <p className="text-white/60 text-xs mt-6 tracking-wide">
                Inscription gratuite · Conseil sans engagement · Résultat garanti
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
