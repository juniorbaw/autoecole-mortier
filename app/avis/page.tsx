import type { Metadata } from 'next'
import { Star, Check, Phone } from 'lucide-react'

export const metadata: Metadata = { title: 'Avis élèves' }

const AVIS = [
  { name: 'Jean B.', date: 'Oct 2023', bg: '#c0451e', badge: 'Permis BVM · Moniteur : Seyba', text: "S'il y a une auto-école que je peux conseiller, c'est bien celle-là. Le professionnalisme de Seyba balaie toute anxiété. On sent vraiment qu'il tient à ce que vous réussissiez." },
  { name: 'Merya M.', date: 'Avr 2024', bg: '#6366f1', badge: 'Permis obtenu', text: "J'ai passé 5 ans à essayer dans d'autres auto-écoles. Il ne m'a fallu que 2 semaines ici. Je recommande à 100%." },
  { name: 'Jeff M.', date: 'Jan 2024', bg: '#0891b2', badge: 'Permis BVM · Mention : Oumy', text: "Après une auto-école catastrophique, j'ai découvert celle-ci comme un oasis. Oumy est l'âme de cette auto-école. Accueil chaleureux, suivi rigoureux." },
  { name: 'Mireille G.', date: 'Déc 2023', bg: '#16a34a', badge: 'Mention : Oumy & Seyba', text: "Pour en avoir fait plusieurs, je sais de quoi je parle. Oumy a la conscience professionnelle que beaucoup devraient avoir. Je recommande les yeux fermés." },
  { name: 'Keren K.', date: 'Avr 2024', bg: '#f59e0b', badge: '1er coup', text: "Permis du premier coup ! Super profs, cours bien complets, moniteurs à l'écoute. Je recommande vraiment cette auto-école." },
  { name: 'Larose L.', date: 'Mars 2023', bg: '#7c3aed', badge: 'Permis BVA · Moniteur : Seyba', text: "Seyba veille à ne pas vous faire payer plus d'heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS." },
]

export default function AvisPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#c0451e] font-semibold tracking-widest uppercase">Avis élèves</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1c1917] mt-2">
                Ce que nos élèves pensent
              </h1>
            </div>
            <div className="bg-white rounded-2xl border border-[#e7e5e4] p-6 text-center shadow-sm flex-shrink-0">
              <div className="font-serif text-6xl font-black text-[#c0451e] leading-none mb-2">5.0</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#c49a2f] text-[#c49a2f]" />)}
              </div>
              <p className="text-sm text-[#57534e] font-medium">26 avis vérifiés</p>
              <p className="text-xs text-[#a8a29e]">VroomVroom.fr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grille avis */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVIS.map((a) => (
            <div key={a.name} className="bg-white rounded-2xl border border-[#e7e5e4] p-6 flex flex-col card-hover" style={{ borderLeftWidth: 4, borderLeftColor: a.bg }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ backgroundColor: a.bg }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {a.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#1c1917] text-sm">{a.name}</p>
                    <p className="text-xs text-[#a8a29e]">{a.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#c49a2f] text-[#c49a2f]" />)}
                </div>
              </div>
              <p className="text-sm text-[#57534e] italic flex-1 mb-4 leading-relaxed">&ldquo;{a.text}&rdquo;</p>
              <div className="flex items-center gap-1.5 bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                <Check className="w-3 h-3" />
                Vérifié — {a.badge}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-[#f5f0eb]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-black text-[#1c1917] mb-4">À ton tour de rejoindre l&apos;aventure</h2>
          <a href="tel:0182833126" className="inline-flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold px-8 py-4 rounded-xl transition-colors">
            <Phone className="w-5 h-5" />
            Appeler — 01 82 83 31 26
          </a>
        </div>
      </section>
    </div>
  )
}
