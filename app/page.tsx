'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Phone, Star, Check, ArrowRight, MapPin, ChevronRight,
  Quote, Leaf, Shield, Award, Zap, Clock, Users, TrendingUp,
  Car, Rocket, Trophy, BookOpen, GraduationCap, Wallet,
  Euro, FileText, MessageCircle, BarChart3, Sparkles,
} from 'lucide-react'

// ── Compteur animé ───────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function runAnimation() {
      if (started.current) return
      started.current = true
      let current = 0
      const increment = target / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(parseFloat(current.toFixed(decimals)))
        }
      }, 20)
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { observer.disconnect(); runAnimation() } },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals])

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>
}

// ── Voiture qui roule (Option B) ─────────────────────────────────────────────
function CarDriving() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)', height: '88px' }}>
      {/* Route pointillée */}
      <div className="absolute left-0 right-0" style={{ bottom: '18px', borderBottom: '2px dashed var(--border-color)', opacity: 0.45 }} />

      {/* Voiture animée */}
      <div className="absolute" style={{ bottom: '6px', animationName: 'carDrive', animationDuration: '14s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', animationDelay: '1s' }}>
        {/* Trainée de feuilles */}
        <div className="absolute flex items-end" style={{ right: '100%', gap: '5px', paddingRight: '6px', bottom: '6px' }}>
          {[
            { size: 10, op: 0.9, mb: 0,  rot: -15, a: 'leafDrift1', d: '0s'   },
            { size: 8,  op: 0.7, mb: 8,  rot: 22,  a: 'leafDrift2', d: '0.18s' },
            { size: 12, op: 0.5, mb: 3,  rot: -28, a: 'leafDrift1', d: '0.35s' },
            { size: 7,  op: 0.3, mb: 11, rot: 10,  a: 'leafDrift2', d: '0.52s' },
            { size: 9,  op: 0.15, mb: 1, rot: -32, a: 'leafDrift1', d: '0.7s'  },
          ].map((leaf, i) => (
            <div key={i} style={{ marginBottom: `${leaf.mb}px`, animationName: leaf.a, animationDuration: '1.3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDirection: 'alternate', animationDelay: leaf.d }}>
              <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" style={{ opacity: leaf.op, transform: `rotate(${leaf.rot}deg)`, display: 'block' }}>
                <path d="M12 2C9 4.5 3 9 3 14c0 4.4 3.6 8 9 8s9-3.6 9-8C21 9 15 4.5 12 2z" fill="#2d6a4f" />
              </svg>
            </div>
          ))}
        </div>

        {/* Toyota Yaris — vue latérale */}
        <svg width="148" height="64" viewBox="0 0 148 64">
          {/* Corps bas */}
          <rect x="8" y="32" width="132" height="24" rx="5" fill="white" />
          {/* Toit/cabine */}
          <path d="M 32 32 L 44 13 L 100 13 L 120 32 Z" fill="white" />
          {/* Lunette arrière */}
          <path d="M 32 32 L 44 13 L 60 13 L 46 32 Z" fill="rgba(45,106,79,0.17)" />
          {/* Pare-brise avant */}
          <path d="M 100 13 L 118 32 L 120 32 L 102 13 Z" fill="rgba(45,106,79,0.17)" />
          {/* Contours */}
          <rect x="8" y="32" width="132" height="24" rx="5" fill="none" stroke="#dde5dc" strokeWidth="1.5" />
          <path d="M 32 32 L 44 13 L 100 13 L 120 32" fill="none" stroke="#dde5dc" strokeWidth="1.5" />
          {/* Ligne de porte */}
          <line x1="74" y1="32" x2="76" y2="54" stroke="#e5e7eb" strokeWidth="1.2" />
          {/* Bande verte latérale */}
          <path d="M 10 50 Q 74 48 138 50" stroke="rgba(45,106,79,0.22)" strokeWidth="2.5" fill="none" />
          {/* Roue avant */}
          <circle cx="118" cy="56" r="10" fill="#2a2a2a" />
          <circle cx="118" cy="56" r="6"  fill="#555" />
          <circle cx="118" cy="56" r="2.5" fill="#aaa" />
          {/* Roue arrière */}
          <circle cx="34"  cy="56" r="10" fill="#2a2a2a" />
          <circle cx="34"  cy="56" r="6"  fill="#555" />
          <circle cx="34"  cy="56" r="2.5" fill="#aaa" />
          {/* Phares avant */}
          <rect x="136" y="38" width="7" height="10" rx="2" fill="#fef08a" opacity="0.95" />
          <rect x="136" y="50" width="5" height="4"  rx="1" fill="rgba(254,240,138,0.55)" />
          {/* Feux arrière */}
          <rect x="5" y="38" width="6" height="10" rx="2" fill="#ef4444" opacity="0.85" />
          {/* Rétroviseur */}
          <rect x="122" y="24" width="8" height="4" rx="1.5" fill="#e5e7eb" />
          {/* Pare-chocs */}
          <rect x="139" y="50" width="5" height="6" rx="2" fill="#f0f0f0" />
          <rect x="4"   y="50" width="5" height="6" rx="2" fill="#f0f0f0" />
        </svg>
      </div>
    </div>
  )
}

// ── Feuilles flottantes (éco-conduite) ──────────────────────────────────────
const LEAF_CONFIG = [
  { left:  5, size: 14, delay: 0,   dur: 9  },
  { left: 15, size: 10, delay: 1.2, dur: 11 },
  { left: 28, size: 18, delay: 2.4, dur: 8  },
  { left: 40, size: 12, delay: 0.7, dur: 13 },
  { left: 52, size: 16, delay: 3.1, dur: 10 },
  { left: 63, size: 11, delay: 1.8, dur: 9  },
  { left: 72, size: 15, delay: 4.0, dur: 12 },
  { left: 82, size: 13, delay: 2.6, dur: 8  },
  { left: 90, size: 17, delay: 0.4, dur: 11 },
  { left:  8, size:  9, delay: 5.0, dur: 10 },
  { left: 35, size: 14, delay: 3.5, dur: 9  },
  { left: 58, size: 11, delay: 1.0, dur: 13 },
  { left: 78, size: 16, delay: 4.5, dur: 8  },
  { left: 22, size: 12, delay: 6.0, dur: 12 },
  { left: 47, size: 10, delay: 2.0, dur: 10 },
]

function LeafParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden>
      {LEAF_CONFIG.map((leaf, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `${leaf.left}%`,
            animationName: 'leafFall',
            animationDuration: `${leaf.dur}s`,
            animationDelay: `${leaf.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            animationFillMode: 'both',
          }}
        >
          <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2C9 4.5 3 9 3 14c0 4.4 3.6 8 9 8s9-3.6 9-8C21 9 15 4.5 12 2z" fill="rgba(82,183,136,0.28)" />
            <path d="M12 6v14" stroke="rgba(82,183,136,0.18)" strokeWidth="0.8" fill="none" />
            <path d="M12 8 C 10 10, 8 12, 9 14" stroke="rgba(82,183,136,0.15)" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  )
}

// ── Route animée (parcours) ───────────────────────────────────────────────────
const ROAD_PATH = "M 95,60 C 175,60 220,20 285,20 C 350,20 415,100 475,100 C 545,100 600,60 665,60"

const ROAD_STEPS = [
  { label: 'Inscription', Icon: FileText, cx: 95,  cy: 60,  threshold: 0    },
  { label: 'Code',        Icon: BookOpen, cx: 285, cy: 20,  threshold: 0.28 },
  { label: 'Conduite',    Icon: Car,      cx: 475, cy: 100, threshold: 0.62 },
  { label: 'Permis',      Icon: Trophy,   cx: 665, cy: 60,  threshold: 0.9  },
]

function RoadLabel({ step, progress }: { step: typeof ROAD_STEPS[0]; progress: number }) {
  const active = progress >= step.threshold
  return (
    <div
      className="flex flex-col items-center gap-1.5"
      style={{ opacity: active ? 1 : 0.38, transition: 'opacity 0.45s ease' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: active ? 'var(--brand)' : 'var(--bg-secondary)',
          border: `2px solid ${active ? 'var(--brand)' : 'var(--border-color)'}`,
          transform: active ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.45s ease',
        }}
      >
        <step.Icon className="w-4 h-4" style={{ color: active ? 'white' : 'var(--secondary-text)' }} />
      </div>
      <span
        className="text-xs font-bold text-center leading-tight"
        style={{ color: active ? 'var(--brand)' : 'var(--secondary-text)', transition: 'color 0.45s' }}
      >
        {step.label}
      </span>
    </div>
  )
}

function RoadParcours() {
  const ref = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(680)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 25%'] })

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    return scrollYProgress.on('change', setProgress)
  }, [scrollYProgress])

  const dashOffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0])
  const carX      = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [95, 285, 475, 665])
  const carY      = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [60, 20, 100, 60])
  const carRotate = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], [0, -18, 0, 18, 0, -14, 0])

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
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
          <p className="text-xs mt-2 font-medium" style={{ color: 'var(--secondary-text)' }}>
            ↓ Scrolle pour voir la route se tracer
          </p>
        </motion.div>

        <div className="select-none">
          {/* Rangée du haut : Code (col 2) + Permis (col 4) */}
          <div className="grid grid-cols-4 gap-4 mb-2 items-end">
            <div />
            <RoadLabel step={ROAD_STEPS[1]} progress={progress} />
            <div />
            <RoadLabel step={ROAD_STEPS[3]} progress={progress} />
          </div>

          {/* Route SVG */}
          <div style={{ height: '138px' }}>
            <svg viewBox="0 0 760 120" className="w-full h-full" style={{ overflow: 'visible' }}>
              {/* Ombre route */}
              <path d={ROAD_PATH} stroke="rgba(0,0,0,0.07)" strokeWidth={30} fill="none" strokeLinecap="round" />
              {/* Base route (grise) */}
              <path d={ROAD_PATH} stroke="#dde5dc" strokeWidth={22} fill="none" strokeLinecap="round" />
              {/* Route verte animée */}
              <motion.path
                ref={pathRef}
                d={ROAD_PATH}
                stroke="#2d6a4f"
                strokeWidth={20}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                style={{ strokeDashoffset: dashOffset }}
              />
              {/* Pointillés centre */}
              <motion.path
                d={ROAD_PATH}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={2.5}
                fill="none"
                strokeDasharray="18 14"
                style={{ strokeDashoffset: dashOffset }}
              />
              {/* Bornes étapes */}
              {ROAD_STEPS.map((step, i) => {
                const active = progress >= step.threshold
                return (
                  <g key={step.label}>
                    {active && <circle cx={step.cx} cy={step.cy} r={20} fill="rgba(45,106,79,0.18)" />}
                    <circle
                      cx={step.cx} cy={step.cy} r={13}
                      style={{ fill: active ? '#2d6a4f' : '#f7f9f5', stroke: active ? '#2d6a4f' : '#dde5dc', strokeWidth: 3, transition: 'fill 0.4s, stroke 0.4s' }}
                    />
                    <text x={step.cx} y={step.cy + 4.5} textAnchor="middle" fontSize="11" fontWeight="700"
                      style={{ fill: active ? 'white' : '#8a9690', transition: 'fill 0.4s' }}>
                      {i + 1}
                    </text>
                  </g>
                )
              })}
              {/* Voiture (vue dessus) */}
              <motion.g style={{ x: carX, y: carY, rotate: carRotate }}>
                <rect x="-12" y="-7" width="24" height="14" rx="4" fill="white" stroke="#2d6a4f" strokeWidth="2" />
                <rect x="-5" y="-5" width="10" height="5" rx="1.5" fill="rgba(45,106,79,0.18)" />
                <rect x="-5" y="0" width="10" height="4" rx="1" fill="rgba(45,106,79,0.1)" />
                <rect x="-14" y="-8"  width="5" height="3.5" rx="1.2" fill="#1a2e22" />
                <rect x="-14" y="4.5" width="5" height="3.5" rx="1.2" fill="#1a2e22" />
                <rect x="9"   y="-8"  width="5" height="3.5" rx="1.2" fill="#1a2e22" />
                <rect x="9"   y="4.5" width="5" height="3.5" rx="1.2" fill="#1a2e22" />
                <rect x="11"  y="-5"  width="3" height="2.5" rx="0.5" fill="#fef08a" />
                <rect x="11"  y="2.5" width="3" height="2.5" rx="0.5" fill="#fef08a" />
              </motion.g>
            </svg>
          </div>

          {/* Rangée du bas : Inscription (col 1) + Conduite (col 3) */}
          <div className="grid grid-cols-4 gap-4 mt-2 items-start">
            <RoadLabel step={ROAD_STEPS[0]} progress={progress} />
            <div />
            <RoadLabel step={ROAD_STEPS[2]} progress={progress} />
            <div />
          </div>
        </div>

        <div className="text-center mt-10">
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
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const AVATARS = [
  { initials: 'OK', bg: '#2d6a4f' },
  { initials: 'MM', bg: '#6366f1' },
  { initials: 'SB', bg: '#0891b2' },
  { initials: 'KK', bg: '#16a34a' },
  { initials: 'JB', bg: '#f59e0b' },
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
    Icon: Car, tag: 'Best-seller', tagBg: 'bg-[#2d6a4f]/10 text-[#2d6a4f]',
    title: 'Permis B Manuel', desc: 'La formation complète : code + 20h minimum de conduite.',
    price: '1 099€', unit: '/ forfait 20h',
  },
  {
    Icon: Zap, tag: 'Spécialité', tagBg: 'bg-blue-100 text-blue-700',
    title: 'Permis B Automatique', desc: 'Notre spécialité ! 13h minimum, plus simple et rapide.',
    price: '949€', unit: '/ forfait 13h',
  },
  {
    Icon: Rocket, tag: 'Tendance', tagBg: 'bg-amber-100 text-amber-700',
    title: 'Formule Accélérée', desc: 'Code + conduite intensive en 2 à 4 semaines seulement.',
    price: '1 399€', unit: '/ tout inclus',
  },
]

const FORMATIONS_SIM = [
  { label: 'Permis B Manuel', price: 1099 },
  { label: 'Permis B Auto', price: 949 },
  { label: 'Accéléré', price: 1399 },
  { label: 'Code en ligne', price: 50 },
]

const FINANCEMENTS = [
  { label: 'CPF', id: 'cpf' },
  { label: 'Permis 1€/jour', id: 'permis1' },
  { label: 'Paiement 3x', id: 'x3' },
  { label: 'Paiement personnel', id: 'perso' },
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
    return { main: `${price}€`, sub: 'Paiement comptant', color: '#2d6a4f' }
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
          style={{ background: 'radial-gradient(circle, rgba(45,106,79,0.12) 0%, transparent 70%)' }} />
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
                  backgroundColor: 'rgba(45,106,79,0.08)',
                  border: '1px solid rgba(45,106,79,0.2)',
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
                <Sparkles className="w-4 h-4" />
                Quiz gratuit · 3 min
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
                  <strong style={{ color: 'var(--dark-text)' }}>5.0/5</strong> · 32 avis vérifiés
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
                className="font-semibold mb-6 text-xs uppercase tracking-widest font-mono flex items-center gap-2"
                style={{ color: 'var(--secondary-text)' }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Nos résultats
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { Icon: Star,           value: 5.0, suffix: '/5',  label: 'Note moyenne',    decimals: 1 },
                  { Icon: Trophy,         value: 96,  suffix: '%',   label: 'Satisfaction',    decimals: 0 },
                  { Icon: Euro,           value: 1,   suffix: '€/j', label: 'Permis à 1€',     decimals: 0 },
                  { Icon: MessageCircle,  value: 32,  suffix: '',    label: 'Avis vérifiés',   decimals: 0 },
                ].map(({ Icon, value, suffix, label, decimals }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--brand)' }} />
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
              <Car className="w-4 h-4" style={{ color: 'var(--brand)' }} />
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
            { Icon: Award,          text: 'Qualiopi certifié' },
            { Icon: Wallet,         text: 'CPF accepté' },
            { Icon: Shield,         text: 'Garantie financière' },
            { Icon: GraduationCap,  text: 'Label qualité état' },
            { Icon: Euro,           text: 'Permis 1€/jour' },
            { Icon: Star,           text: '5.0/5 Google' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4" style={{ color: 'var(--brand)' }} />
              <span>{text}</span>
            </div>
          ))}
          <a
            href="https://www.instagram.com/autoecole_mortier"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#2d6a4f] transition-colors"
          >
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#f97316] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
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
              className="md:col-span-2 bg-[#2d6a4f] rounded-2xl p-8 relative overflow-hidden"
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
              <Award className="w-10 h-10 mb-4" style={{ color: 'var(--brand)' }} />
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
              <Wallet className="w-10 h-10 mb-4" style={{ color: 'var(--brand)' }} />
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
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>sur 32 avis vérifiés</p>
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
              <Euro className="w-10 h-10 mb-4" style={{ color: 'var(--brand)' }} />
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <f.Icon className="w-6 h-6" style={{ color: 'var(--brand)' }} />
                    </div>
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
              Calculez votre budget
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

        {/* Feuilles flottantes */}
        <LeafParticles />

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
          VOITURE QUI ROULE
      ══════════════════════════════════════════════════════════════════════ */}
      <CarDriving />

      {/* ══════════════════════════════════════════════════════════════════════
          MESSAGE DU FONDATEUR — Seyba
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
                Seyba
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
          ÉQUIPE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Notre équipe
            </span>
            <h2
              className="font-serif italic font-black mt-2"
              style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Des humains derrière le permis
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: 'var(--secondary-text)' }}>
              Une équipe à taille humaine où chacun vous connaît par votre prénom.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                initial: 'S',
                name: 'Seyba',
                role: 'Directeur & Fondateur',
                desc: 'Il veille à ce que chaque élève soit prêt — sans heure de trop ni pression commerciale.',
                color: '#2d6a4f',
                badges: ['Qualiopi', 'Label qualité État'],
              },
              {
                initial: 'O',
                name: 'Oumy',
                role: 'Accueil & Inscriptions',
                desc: 'Première voix que vous entendez, premier sourire que vous voyez. Elle monte les dossiers CPF et permis à 1€.',
                color: '#6366f1',
                badges: ['CPF', 'Permis 1€/jour'],
              },
              {
                initial: 'I',
                name: 'Ibtissem',
                role: 'Monitrice de conduite',
                desc: 'Pédagogue et patiente, elle forme avec l\'approche éco-conduite et s\'adapte à chaque profil d\'élève.',
                color: '#0891b2',
                badges: ['BVA', 'Éco-conduite'],
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border p-7 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-serif font-black text-2xl mb-5 shadow-md"
                  style={{ backgroundColor: member.color, fontStyle: 'italic' }}
                >
                  {member.initial}
                </div>

                {/* Identity */}
                <h3 className="font-bold text-lg mb-0.5" style={{ color: 'var(--dark-text)' }}>{member.name}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: member.color }}>{member.role}</p>

                {/* Description */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--secondary-text)' }}>{member.desc}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  {member.badges.map(b => (
                    <span
                      key={b}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${member.color}15`, color: member.color }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Google · 5.0/5
              </span>
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--dark-text)',
                }}
              >
                <Award className="w-3.5 h-3.5" style={{ color: 'var(--brand)' }} /> Qualiopi Certifié
              </span>
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--dark-text)',
                }}
              >
                <Check className="w-3 h-3 text-[#16a34a]" /> 32 avis vérifiés
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
              Voir les 32 avis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DEVANTURE — AGENCE PHYSIQUE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
              Notre agence
            </span>
            <h2
              className="font-serif italic font-black mt-2"
              style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Venez nous voir
            </h2>
            <p className="mt-2" style={{ color: 'var(--secondary-text)' }}>
              Une vraie agence, avec de vraies personnes. Tram T3b juste devant.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl border"
            style={{ borderColor: 'var(--border-color)' }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/devanture.jpg"
              alt="Devanture Auto-école Mortier — 127 boulevard Mortier, Paris 20ème"
              width={1200}
              height={500}
              className="w-full h-72 sm:h-96 object-cover object-center"
              priority={false}
            />
            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-8 py-8">
              <div className="flex flex-wrap gap-4 items-end justify-between">
                <div>
                  <p className="text-white font-serif font-black text-xl mb-1">Auto-école Mortier</p>
                  <p className="text-white/80 text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    127 boulevard Mortier, Paris 20ème
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'Tram T3b' },
                    { text: 'Mar-Ven 10h-19h' },
                    { text: 'Sam 10h-14h' },
                  ].map(b => (
                    <span
                      key={b.text}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                      style={{ backgroundColor: 'rgba(45,106,79,0.85)' }}
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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
              { label: '100% satisfait',       Icon: TrendingUp, value: 100,  decimals: 0 },
              { label: 'Note Google',          Icon: Star,       value: 5.0,  decimals: 1 },
              { label: 'Avis vérifiés',        Icon: Check,      value: 32,   decimals: 0 },
              { label: 'Semaines en moyenne',  Icon: Clock,      value: 3,    decimals: 0, unit: 'sem' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
                <stat.Icon className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--brand)' }} />
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
          PARCOURS — ROUTE ANIMÉE
      ══════════════════════════════════════════════════════════════════════ */}
      <RoadParcours />

      {/* ══════════════════════════════════════════════════════════════════════
          QUIZ TEASER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(45,106,79,0.04) 12px, rgba(45,106,79,0.04) 24px)`,
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
            Testez vos connaissances du code
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
                01 82 83 31 26
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
