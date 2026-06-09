'use client'
import { useEffect, useRef, useState } from 'react'
import type { Metadata } from 'next'
import { Phone, Check, X, Minus } from 'lucide-react'

const COMPARATIF = [
  { critere: 'Note VroomVroom', mortier: '5.0/5', fargeau: '4.8/5', cer: '4.5/5', ornikar: '3.8/5', gambetta: '4.2/5' },
  { critere: 'Nombre d\'avis', mortier: '26 avis', fargeau: '231', cer: '~80', ornikar: 'Variable', gambetta: '~40' },
  { critere: 'Forfait 20h BVM', mortier: '1 099€', fargeau: '1 390€', cer: '~1 400€', ornikar: '~1 100€*', gambetta: '~1 350€' },
  { critere: 'Forfait BVA 13h', mortier: '949€', fargeau: '~1 100€', cer: '~1 100€', ornikar: '~850€*', gambetta: '~1 050€' },
  { critere: 'Formule accélérée', mortier: true, fargeau: true, cer: true, ornikar: false, gambetta: null },
  { critere: 'Permis à 1€/jour', mortier: true, fargeau: true, cer: true, ornikar: false, gambetta: true },
  { critere: 'CPF / Qualiopi', mortier: true, fargeau: true, cer: true, ornikar: true, gambetta: null },
  { critere: 'Inscription en ligne', mortier: true, fargeau: false, cer: false, ornikar: true, gambetta: false },
  { critere: 'Agence physique', mortier: true, fargeau: true, cer: true, ornikar: false, gambetta: true },
  { critere: 'Tram devant la porte', mortier: 'T3b', fargeau: false, cer: null, ornikar: '—', gambetta: false },
]

function CellValue({ val }: { val: unknown }) {
  if (val === true) return <span className="flex justify-center"><span className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center"><Check className="w-3.5 h-3.5" /></span></span>
  if (val === false) return <span className="flex justify-center"><span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center"><X className="w-3.5 h-3.5" /></span></span>
  if (val === null) return <span className="flex justify-center"><span className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></span></span>
  return <span className="text-xs text-[#4a5a52] font-medium">{val as string}</span>
}

function AnimatedBar({ label, value, max, color, suffix }: { label: string; value: number; max: number; color: string; suffix: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      setTimeout(() => setWidth((value / max) * 100), 100)
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, max])
  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[#1a2e22]">{label}</span>
        <span className="font-mono text-sm font-bold" style={{ color }}>{value}{suffix}</span>
      </div>
      <div className="h-3 bg-[#dde5dc] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function PourquoiNousPage() {
  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Pourquoi nous</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-4">
            La meilleure du 20ème, chiffres à l&apos;appui
          </h1>
          <p className="text-[#4a5a52] text-lg max-w-2xl mx-auto">
            Comparez objectivement — nous n&apos;avons rien à cacher. Note parfaite, prix imbattables, accès unique en tram.
          </p>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl font-black text-[#1a2e22] mb-8">Comparatif concurrentiel</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#dde5dc] shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead>
                <tr className="border-b border-[#dde5dc]">
                  <th className="text-left p-4 text-[#4a5a52] font-semibold">Critère</th>
                  <th className="p-4 bg-[#2d6a4f]/5 text-[#2d6a4f] font-bold">Auto-école Mortier</th>
                  <th className="p-4 text-[#4a5a52] font-semibold">Saint-Fargeau</th>
                  <th className="p-4 text-[#4a5a52] font-semibold">CER P. des Lilas</th>
                  <th className="p-4 text-[#4a5a52] font-semibold">Ornikar</th>
                  <th className="p-4 text-[#4a5a52] font-semibold">Gambetta Permis</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIF.map((row, i) => (
                  <tr key={row.critere} className={`border-b border-[#dde5dc] ${i % 2 === 0 ? '' : 'bg-[#f7f9f5]'}`}>
                    <td className="p-4 font-medium text-[#1a2e22]">{row.critere}</td>
                    <td className="p-4 bg-[#2d6a4f]/5 text-center font-bold text-[#2d6a4f]"><CellValue val={row.mortier} /></td>
                    <td className="p-4 text-center"><CellValue val={row.fargeau} /></td>
                    <td className="p-4 text-center"><CellValue val={row.cer} /></td>
                    <td className="p-4 text-center"><CellValue val={row.ornikar} /></td>
                    <td className="p-4 text-center"><CellValue val={row.gambetta} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#8a9690] mt-3">*Ornikar n&apos;a pas d&apos;agence — accompagnement limité.</p>
        </div>
      </section>

      {/* Graphiques */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl border border-[#dde5dc] p-8">
            <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-6">Satisfaction client (note /5)</h3>
            <AnimatedBar label="Auto-école Mortier" value={5.0} max={5} color="#2d6a4f" suffix="/5" />
            <AnimatedBar label="Saint-Fargeau" value={4.8} max={5} color="#6366f1" suffix="/5" />
            <AnimatedBar label="CER Porte des Lilas" value={4.5} max={5} color="#0891b2" suffix="/5" />
            <AnimatedBar label="Gambetta Permis" value={4.2} max={5} color="#f59e0b" suffix="/5" />
            <AnimatedBar label="Ornikar" value={3.8} max={5} color="#84cc16" suffix="/5" />
          </div>
          <div className="bg-white rounded-2xl border border-[#dde5dc] p-8">
            <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-6">Prix forfait 20h BVM (€)</h3>
            <AnimatedBar label="Mortier" value={1099} max={1500} color="#2d6a4f" suffix="€" />
            <AnimatedBar label="Ornikar*" value={1100} max={1500} color="#84cc16" suffix="€" />
            <AnimatedBar label="Gambetta" value={1350} max={1500} color="#f59e0b" suffix="€" />
            <AnimatedBar label="Saint-Fargeau" value={1390} max={1500} color="#6366f1" suffix="€" />
            <AnimatedBar label="CER" value={1400} max={1500} color="#0891b2" suffix="€" />
            <p className="text-xs text-[#8a9690] mt-2">*sans agence physique</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-black text-[#1a2e22] mb-4">Convaincu ?</h2>
          <p className="text-[#4a5a52] mb-6">Appelez Oumy pour une évaluation gratuite et sans engagement.</p>
          <a href="tel:0182833126" className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg">
            <Phone className="w-5 h-5" />
            01 82 83 31 26
          </a>
        </div>
      </section>
    </div>
  )
}
