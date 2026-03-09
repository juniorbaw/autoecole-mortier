'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, RotateCcw, Trophy } from 'lucide-react'

const QUESTIONS = [
  { q: 'En agglomération, la vitesse est limitée à :', options: ['30 km/h', '50 km/h', '70 km/h', '90 km/h'], answer: 1 },
  { q: "Taux d'alcoolémie max pour un jeune conducteur ?", options: ['0,5 g/L', '0,2 g/L', '0,8 g/L', '0 g/L'], answer: 1 },
  { q: 'Un feu orange fixe signifie :', options: ['Accélérer', "S'arrêter sauf danger", 'Passer doucement', 'Reculer'], answer: 1 },
  { q: 'Distance de sécurité sur autoroute :', options: ['1 seconde', '2 secondes', '3 secondes', '5 secondes'], answer: 1 },
  { q: 'Le triangle de signalisation se place à :', options: ['10 m', '20 m', '30 m', '50 m'], answer: 2 },
  { q: 'Âge minimum pour la conduite accompagnée (AAC) ?', options: ['14 ans', '15 ans', '16 ans', '17 ans'], answer: 1 },
  { q: 'Vitesse max autoroute par temps de pluie :', options: ['90 km/h', '100 km/h', '110 km/h', '120 km/h'], answer: 2 },
  { q: 'Points sur un permis probatoire :', options: ['4 points', '6 points', '8 points', '12 points'], answer: 1 },
  { q: 'Interdit de doubler sur un pont :', options: ['Toujours', 'Si marquage continu', 'Si pont à 2 voies', "Jamais interdit"], answer: 1 },
  { q: "Usage du téléphone au volant coûte :", options: ['90€ + 2 pts', '135€ + 3 pts', '135€ + 4 pts', '200€ + 6 pts'], answer: 1 },
]

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === QUESTIONS[current].answer) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 >= QUESTIONS.length) {
        setDone(true)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
      }
    }, 1000)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  const q = QUESTIONS[current]
  const pct = Math.round((score / QUESTIONS.length) * 100)

  return (
    <div className="min-h-screen bg-[#faf9f6] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Quiz code</span>
          <h1 className="font-serif text-4xl font-black text-[#1c1917] mt-2 mb-2">Teste tes connaissances 🎮</h1>
          <p className="text-[#57534e]">10 questions pour voir si tu es prêt. Gratuit, 3 minutes.</p>
        </div>

        {done ? (
          /* Résultat */
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-10 text-center shadow-sm">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-[#c49a2f]" />
            <div className="font-serif text-7xl font-black mb-2" style={{ color: pct >= 70 ? '#c0451e' : '#57534e' }}>
              {score}/10
            </div>
            <div className="font-mono text-2xl font-semibold mb-4" style={{ color: pct >= 70 ? '#16a34a' : '#c0451e' }}>
              {pct}%
            </div>
            <p className="text-[#57534e] text-lg mb-2">
              {pct >= 80 ? '🎉 Excellent ! Tu es prêt pour l\'examen !' :
               pct >= 60 ? '👍 Bien ! Encore un peu de révision.' :
               '📚 Continue à réviser, tu vas y arriver !'}
            </p>
            <p className="text-sm text-[#a8a29e] mb-8">
              {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur 10
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={restart} className="flex items-center justify-center gap-2 border-2 border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917] font-semibold px-6 py-3 rounded-xl transition-colors">
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </button>
              <a href="tel:0182833126" className="flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                <Phone className="w-4 h-4" />
                S&apos;inscrire maintenant
              </a>
            </div>
          </div>
        ) : (
          /* Quiz */
          <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
            {/* Progress dots */}
            <div className="p-6 border-b border-[#e7e5e4]">
              <div className="flex items-center gap-1.5 mb-3">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i < current ? 'bg-[#16a34a]' : i === current ? 'bg-[#c0451e]' : 'bg-[#e7e5e4]'}`} />
                ))}
              </div>
              <span className="font-mono text-xs text-[#a8a29e] font-semibold tracking-wider">QUESTION {current + 1}/10</span>
            </div>

            <div className="p-8">
              <h2 className="font-serif text-xl font-bold text-[#1c1917] mb-6 leading-relaxed">{q.q}</h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let style = 'border-[#e7e5e4] hover:border-[#c0451e] text-[#1c1917]'
                  if (selected !== null) {
                    if (i === q.answer) style = 'border-[#16a34a] bg-[#16a34a]/5 text-[#16a34a]'
                    else if (i === selected && i !== q.answer) style = 'border-red-400 bg-red-50 text-red-600'
                    else style = 'border-[#e7e5e4] text-[#a8a29e]'
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${style} ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${selected !== null ? 'bg-[#f5f0eb]' : 'bg-[#c0451e]/10 text-[#c0451e]'}`}>
                        {LETTERS[i]}
                      </span>
                      <span className="font-medium">{opt}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
