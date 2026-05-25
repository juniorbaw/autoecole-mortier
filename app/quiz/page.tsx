'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, RotateCcw, Trophy, Star, Check, X, ArrowRight, Zap, TrafficCone, ClipboardList, Brain, BookOpen, Car, ThumbsUp, Award } from 'lucide-react'

const QUESTIONS = [
  // Signalisation (10)
  { q: 'En agglomération, vitesse max ?', options: ['30 km/h', '50 km/h', '70 km/h', '90 km/h'], answer: 1, category: 'Signalisation', explanation: 'En ville, la limite est 50 km/h sauf indication contraire.' },
  { q: 'Feu orange fixe signifie :', options: ['Accélérer', "S'arrêter sauf danger", 'Passer doucement', 'Reculer'], answer: 1, category: 'Signalisation', explanation: "Le feu orange fixe vous oblige à vous arrêter. Vous ne pouvez passer que s'il est trop tard pour freiner." },
  { q: 'Panneau triangle rouge =', options: ['Obligation', 'Danger, cédez le passage', 'Interdiction', 'Information'], answer: 1, category: 'Signalisation', explanation: 'Les panneaux triangles rouges signalent des dangers : zones école, courbes, etc.' },
  { q: 'Ligne blanche continue =', options: ['Dépassement autorisé', 'Interdiction de dépasser', 'Zone parking', 'Ralentisseur'], answer: 1, category: 'Signalisation', explanation: 'Une ligne continue blanche ou jaune interdit tout dépassement.' },
  { q: 'Panneau rond bleu =', options: ['Obligation', 'Interdiction', 'Danger', 'Information'], answer: 0, category: 'Signalisation', explanation: 'Les panneaux ronds bleus imposent une obligation (feu vert, sens unique, etc.).' },
  { q: 'Feux clignotants jaunes =', options: ['Danger grave', 'Prudence, ralentir', 'Cédez le passage', 'Stop obligatoire'], answer: 1, category: 'Signalisation', explanation: 'Les feux jaunes clignotants signalent un carrefour non prioritaire. Ralentissez et cédez le passage.' },
  { q: 'Panneau "Stop" impose :', options: ['Ralentir', 'Arrêt total obligatoire', 'Cédez le passage', 'Attention'], answer: 1, category: 'Signalisation', explanation: 'Un panneau Stop impose un arrêt complet du véhicule avant le carrefour.' },
  { q: 'Flèche verte clignotante =', options: ['Arrêtez-vous', 'Tourner si voie libre', 'Passez sans vérifier', 'Interdiction'], answer: 1, category: 'Signalisation', explanation: 'La flèche verte clignotante vous permet de tourner dans ce sens si la voie est dégagée.' },
  { q: 'Panneau vitesse barré =', options: ['Limitation maintenue', 'Fin de limitation', 'Demi-tour interdit', 'Zone à risque'], answer: 1, category: 'Signalisation', explanation: 'Un panneau de limitation barré signifie la fin de cette limitation de vitesse.' },
  { q: 'Losange jaune =', options: ['Danger', 'Priorité sur la route', 'Information', 'Interdiction'], answer: 1, category: 'Signalisation', explanation: 'Le losange jaune signifie que vous avez la priorité sur ce carrefour.' },
  // Règles (10)
  { q: 'Taux alcool jeune conducteur ?', options: ['0,5 g/L', '0,2 g/L', '0,8 g/L', '0 g/L'], answer: 1, category: 'Règles', explanation: 'Pour un permis probatoire : max 0,2 g/L (vs 0,5 pour conducteur expérimenté).' },
  { q: 'Distance sécurité autoroute ?', options: ['1 seconde', '2 secondes', '3 secondes', '5 secondes'], answer: 1, category: 'Règles', explanation: 'Maintenez 2 secondes de distance avec le véhicule devant vous. À 130 km/h ≈ 70 mètres.' },
  { q: 'Triangle signalisation à quelle distance ?', options: ['10 m', '20 m', '30 m minimum', '50 m'], answer: 2, category: 'Règles', explanation: "En cas d'arrêt, le triangle de signalisation doit être placé 30 mètres minimum avant le véhicule." },
  { q: 'AAC âge minimum ?', options: ['14 ans', '15 ans', '16 ans', '17 ans'], answer: 1, category: 'Règles', explanation: 'La conduite accompagnée débute à 15 ans minimum. Elle dure au moins 1 an.' },
  { q: 'Vitesse autoroute par temps de pluie ?', options: ['90 km/h', '100 km/h', '110 km/h', '120 km/h'], answer: 2, category: 'Règles', explanation: 'Par temps de pluie, vitesse max 110 km/h sur autoroute (vs 130 habituellement).' },
  { q: 'Points sur permis probatoire ?', options: ['4 points', '6 points', '8 points', '12 points'], answer: 1, category: 'Règles', explanation: 'Un permis probatoire commence avec 6 points au lieu de 12. Chaque infraction en enlève.' },
  { q: 'Téléphone au volant : amende ?', options: ['90€ + 2 pts', '135€ + 3 pts', '135€ + 4 pts', '200€ + 6 pts'], answer: 1, category: 'Règles', explanation: "Utiliser son téléphone coûte 135€ d'amende + 3 points de permis." },
  { q: 'Ceinture non portée : amende ?', options: ['90€', '110€', '135€ + 3 pts', '200€ + 4 pts'], answer: 2, category: 'Règles', explanation: 'Ne pas porter la ceinture : 135€ + 3 points retirés.' },
  { q: 'Priorité à droite dans carrefour ?', options: ['Jamais', 'Parfois', 'Toujours sauf panneau', 'Seulement en ville'], answer: 2, category: 'Règles', explanation: 'La priorité à droite s\'applique toujours sauf si un panneau indique le contraire.' },
  { q: 'Vitesse zone 30 ?', options: ['20 km/h', '30 km/h max', '40 km/h', '50 km/h'], answer: 1, category: 'Règles', explanation: 'En zone 30, respectez strictement les 30 km/h. C\'est une limite de sécurité.' },
  // Comportement (10)
  { q: 'Crevaison : que faire ?', options: ['Freiner brusquement', 'Ralentir prog., ne pas freiner sec', 'Accélérer', 'Braquer sec'], answer: 1, category: 'Comportement', explanation: 'En cas de crevaison, ralentissez progressivement sans freiner brusquement. Dirigez-vous vers le bas-côté.' },
  { q: 'Fatigue au volant : action ?', options: ['Boire du café', 'S\'arrêter et se reposer', 'Augmenter le chauffage', 'Appuyer sur champagne'], answer: 1, category: 'Comportement', explanation: 'La fatigue tue au volant. Arrêtez-vous immédiatement et reposez-vous 15-20 min.' },
  { q: "Distance d'arrêt à 130 km/h ?", options: ['100 m', '150 m', '170 m approx', '200 m'], answer: 2, category: 'Comportement', explanation: '130 km/h = ~170 m pour s\'arrêter (40 m temps réaction + 130 m freinage).' },
  { q: 'Piéton hors passage : action ?', options: ['Continuer', 'Laisser passer quand même', 'Klaxonner', 'Accélérer'], answer: 1, category: 'Comportement', explanation: "Même s'il traverse hors clou, vous avez le devoir de laisser passer le piéton." },
  { q: 'Accident : procédure ?', options: ['Partir vite', 'PLSS (Protection/Lancer/Secourir/Sécuriser)', 'Appeler le 15 d\'abord', 'Remplir le constat'], answer: 1, category: 'Comportement', explanation: 'PLSS : Protéger (feux de détresse), Lancer alerte (17/15), Secourir, Sécuriser.' },
  { q: 'Conduite sous médicaments ?', options: ['Sans risque', 'Lire pictogrammes boîte', "Ignorer l'emballage", 'Doubler la dose'], answer: 1, category: 'Comportement', explanation: 'Certains médicaments affectent la conduite. Vérifiez les pictogrammes sur la boîte.' },
  { q: 'Éclairage nuit en ville ?', options: ['Feux de route', 'Feux de croisement', "Pas d'éclairage", 'Feux de détresse'], answer: 1, category: 'Comportement', explanation: 'En ville, la nuit, utilisez les feux de croisement (pas les feux route qui éblouissent).' },
  { q: 'Queue de poisson : pourquoi dangereux ?', options: ['Signe de fatigue', 'Risque accident + agressivité', 'Usure pneus', 'Consommation essence'], answer: 1, category: 'Comportement', explanation: 'Doubler sans vérifier (queue de poisson) cause des accidents et crée des situations de rage au volant.' },
  { q: 'Céder à piéton : quand ?', options: ['Jamais en route', 'Passage protégé', "N'importe quand", 'Seulement le jour'], answer: 1, category: 'Comportement', explanation: 'Vous devez céder le passage au piéton sur un passage protégé (clou) ou quand il demande.' },
  { q: 'Dépassement interdit quand ?', options: ['Jamais', 'Ligne continue, sommet, virage', 'Seulement la nuit', 'Jamais en autoroute'], answer: 1, category: 'Comportement', explanation: 'Dépassement interdit : ligne continue, sommet de côte, virages, visibilité insuffisante.' },
]

const LETTERS = ['A', 'B', 'C', 'D']

const CATEGORIES = [
  { key: 'Signalisation', Icon: TrafficCone,    range: [0, 9] },
  { key: 'Règles',        Icon: ClipboardList,  range: [10, 19] },
  { key: 'Comportement',  Icon: Brain,          range: [20, 29] },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({ Signalisation: 0, Règles: 0, Comportement: 0 })
  const [done, setDone] = useState(false)
  const [direction, setDirection] = useState(1)

  function handleAnswer(idx: number) {
    if (selected !== null) return
    const isCorrect = idx === QUESTIONS[current].answer
    setSelected(idx)
    setCorrect(isCorrect)
    if (isCorrect) {
      const cat = QUESTIONS[current].category
      setScores(s => ({ ...s, [cat]: s[cat] + 1 }))
    }
    setTimeout(() => {
      if (current + 1 >= QUESTIONS.length) {
        setDone(true)
      } else {
        setDirection(1)
        setCurrent(c => c + 1)
        setSelected(null)
        setCorrect(null)
      }
    }, 2200)
  }

  function restart() {
    setDirection(1)
    setCurrent(0)
    setSelected(null)
    setCorrect(null)
    setScores({ Signalisation: 0, Règles: 0, Comportement: 0 })
    setDone(false)
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const percentage = Math.round((totalScore / QUESTIONS.length) * 100)
  const progressWidth = ((current + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100

  function getResultConfig() {
    if (percentage >= 80) return { label: 'Excellent, vous êtes prêt',     Icon: Trophy,   color: '#16a34a', grade: 'Expert' }
    if (percentage >= 70) return { label: 'Très bien, presque prêt',       Icon: Award,    color: '#0891b2', grade: 'Avancé' }
    if (percentage >= 50) return { label: 'Bien, encore un effort',        Icon: ThumbsUp, color: '#f59e0b', grade: 'Intermédiaire' }
    return                       { label: 'Continuez à réviser',           Icon: BookOpen, color: '#2d6a4f', grade: 'Débutant' }
  }

  const resultConfig = getResultConfig()
  const q = QUESTIONS[current]

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--brand)' }}>
            Test Mortier
          </span>
          <h1
            className="font-serif italic font-black mt-2 mb-2"
            style={{ color: 'var(--dark-text)', fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            Quiz du Code de la Route
          </h1>
          <p style={{ color: 'var(--secondary-text)' }}>30 questions · 3 catégories · Résultats instantanés</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            /* ── RÉSULTATS ── */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-5"
            >
              {/* Score principal */}
              <div
                className="rounded-2xl border p-10 text-center shadow-lg"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <motion.div
                  className="animate-celebrate inline-flex items-center justify-center rounded-full"
                  style={{ width: '6rem', height: '6rem', backgroundColor: `${resultConfig.color}15` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <resultConfig.Icon className="w-12 h-12" style={{ color: resultConfig.color }} />
                </motion.div>

                <motion.div
                  className="font-serif font-black my-3"
                  style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', color: resultConfig.color, lineHeight: 1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {totalScore}/30
                </motion.div>

                <motion.div
                  className="font-mono text-2xl font-bold mb-4"
                  style={{ color: resultConfig.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  {percentage}%
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <p className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-text)' }}>
                    {resultConfig.label}
                  </p>
                  <span
                    className="inline-block text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{
                      backgroundColor: `${resultConfig.color}15`,
                      color: resultConfig.color,
                    }}
                  >
                    Niveau : {resultConfig.grade}
                  </span>
                </motion.div>
              </div>

              {/* Scores par catégorie avec barres */}
              <motion.div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="font-bold mb-5 text-sm uppercase tracking-wide font-mono" style={{ color: 'var(--secondary-text)' }}>
                  Résultats par catégorie
                </h3>
                <div className="space-y-5">
                  {CATEGORIES.map(({ key, Icon }, i) => {
                    const catScore = scores[key] ?? 0
                    const catPct = (catScore / 10) * 100
                    const catColor = catPct >= 70 ? '#16a34a' : catPct >= 50 ? '#f59e0b' : '#2d6a4f'
                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--dark-text)' }}>
                            <Icon className="w-4 h-4" style={{ color: catColor }} /> {key}
                          </span>
                          <span className="font-mono font-bold text-sm" style={{ color: catColor }}>
                            {catScore}/10
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: catColor }}
                            initial={{ width: 0 }}
                            animate={{ width: `${catPct}%` }}
                            transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <button
                  onClick={restart}
                  className="flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all border"
                  style={{
                    color: 'var(--dark-text)',
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--card-bg)',
                  }}
                >
                  <RotateCcw className="w-4 h-4" /> Recommencer
                </button>
                <Link
                  href="/formations"
                  className="flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all border"
                  style={{
                    color: '#0891b2',
                    borderColor: '#0891b2',
                    backgroundColor: 'rgba(8,145,178,0.06)',
                  }}
                >
                  <BookOpen className="w-4 h-4" /> Voir les formations
                </Link>
                <a
                  href="tel:0182833126"
                  className="flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors flex-1"
                  style={{ backgroundColor: 'var(--brand)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
                >
                  <Phone className="w-4 h-4" /> S&apos;inscrire
                </a>
              </motion.div>
            </motion.div>

          ) : (
            /* ── QUESTION EN COURS ── */
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Carte quiz */}
              <div
                className="rounded-2xl border shadow-lg overflow-hidden"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                {/* ── Progress header ── */}
                <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  {/* Barre de progression globale */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--brand)' }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold tabular-nums" style={{ color: 'var(--brand)', minWidth: '3.5rem', textAlign: 'right' }}>
                      {current + 1} / 30
                    </span>
                  </div>

                  {/* Segments de catégorie */}
                  <div className="flex gap-1.5 mb-3">
                    {QUESTIONS.map((_, i) => {
                      let bg: string
                      if (i < current) bg = 'var(--success)'
                      else if (i === current) bg = 'var(--brand)'
                      else bg = 'var(--border-color)'
                      return (
                        <div key={i} className="h-1 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: bg }} />
                      )
                    })}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-wider" style={{ color: 'var(--light-text)' }}>
                      QUESTION {current + 1}/30
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--brand)',
                        }}
                      >
                        {q.category}
                      </span>
                      {/* Score courant */}
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--secondary-text)' }}>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {totalScore} pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Question ── */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, x: 30 * direction }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 * direction }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <h2
                        className="font-serif italic font-bold leading-relaxed mb-8"
                        style={{ color: 'var(--dark-text)', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}
                      >
                        {q.q}
                      </h2>

                      {/* Options */}
                      <div className="space-y-3 mb-6">
                        {q.options.map((opt, i) => {
                          const isAnswer = i === q.answer
                          const isSelected = i === selected

                          let bgColor = 'var(--card-bg)'
                          let borderColor = 'var(--border-color)'
                          let textColor = 'var(--dark-text)'
                          let letterBg = 'var(--bg-secondary)'
                          let letterColor = 'var(--brand)'

                          if (selected !== null) {
                            if (isAnswer) {
                              bgColor = 'rgba(22,163,74,0.06)'
                              borderColor = '#16a34a'
                              textColor = '#16a34a'
                              letterBg = 'rgba(22,163,74,0.12)'
                              letterColor = '#16a34a'
                            } else if (isSelected) {
                              bgColor = 'rgba(239,68,68,0.06)'
                              borderColor = '#ef4444'
                              textColor = '#ef4444'
                              letterBg = 'rgba(239,68,68,0.12)'
                              letterColor = '#ef4444'
                            } else {
                              textColor = 'var(--light-text)'
                              borderColor = 'var(--border-light)'
                            }
                          }

                          return (
                            <motion.button
                              key={i}
                              onClick={() => handleAnswer(i)}
                              disabled={selected !== null}
                              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
                              style={{
                                backgroundColor: bgColor,
                                borderColor,
                                color: textColor,
                                cursor: selected !== null ? 'default' : 'pointer',
                              }}
                              whileHover={selected === null ? { scale: 1.01, translateY: -1 } : {}}
                              whileTap={selected === null ? { scale: 0.99 } : {}}
                            >
                              <span
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors"
                                style={{ backgroundColor: letterBg, color: letterColor }}
                              >
                                {selected !== null && isAnswer ? <Check className="w-4 h-4" /> :
                                 selected !== null && isSelected && !isAnswer ? <X className="w-4 h-4" /> :
                                 LETTERS[i]}
                              </span>
                              <span className="font-medium">{opt}</span>
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Explication */}
                      <AnimatePresence>
                        {selected !== null && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl p-4 border-l-4 overflow-hidden"
                            style={{
                              backgroundColor: correct ? 'rgba(22,163,74,0.06)' : 'rgba(239,68,68,0.06)',
                              borderLeftColor: correct ? '#16a34a' : '#ef4444',
                            }}
                          >
                            <div className="flex items-start gap-2">
                              <span className="flex-shrink-0 mt-0.5">
                                {correct
                                  ? <Check className="w-4 h-4 text-[#16a34a]" />
                                  : <X className="w-4 h-4 text-red-500" />}
                              </span>
                              <p
                                className="text-sm font-medium leading-relaxed"
                                style={{ color: correct ? '#16a34a' : '#ef4444' }}
                              >
                                {q.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Footer ── */}
                <div
                  className="px-6 py-4 border-t flex items-center justify-between"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="flex items-center gap-3">
                    {CATEGORIES.map(cat => (
                      <div key={cat.key} className="flex items-center gap-1 text-xs" style={{ color: 'var(--secondary-text)' }}>
                        <cat.Icon className="w-3.5 h-3.5" style={{ color: 'var(--brand)' }} />
                        <span className="font-mono font-bold" style={{ color: 'var(--dark-text)' }}>
                          {scores[cat.key]}
                        </span>
                        <span>/10</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--secondary-text)' }}>
                    <Zap className="w-3.5 h-3.5" style={{ color: 'var(--brand)' }} />
                    Score : <span className="font-bold ml-1" style={{ color: 'var(--dark-text)' }}>{totalScore}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
