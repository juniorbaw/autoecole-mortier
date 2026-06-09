'use client'
import { useState } from 'react'
import { Star, Check, Phone, ChevronDown, ChevronUp, Award, TrendingUp } from 'lucide-react'

const AVIS = [
  {
    name: 'Marie Anne Laure S.', date: 'Mai 2026', bg: '#2d6a4f', badge: 'Accéléré · 30/31 points',
    text: "J'ai passé mon permis en accéléré et je l'ai obtenu en 4 semaines avec 30/31 points du premier coup ! Une équipe formidable, très professionnelle et à l'écoute.",
    highlight: true,
  },
  {
    name: 'Lucie M.', date: 'Juin 2026', bg: '#6366f1', badge: 'Permis obtenu',
    text: "J'ai eu mon permis grâce à une équipe pédagogique au top et à l'écoute des élèves ! Je recommande vraiment cette auto-école.",
    highlight: false,
  },
  {
    name: 'Rahma B.', date: 'Avr 2026', bg: '#0891b2', badge: 'Permis BVA',
    text: "Moniteur vraiment au top. Très pédagogue, patient et toujours à l'écoute. Je suis arrivée stressée et je suis repartie avec le permis. Merci !",
    highlight: false,
  },
  {
    name: 'Polly-lou M.', date: 'Avr 2026', bg: '#7c3aed', badge: 'Permis BVM',
    text: "Une pédagogie soignée qui nous apprend la joie de conduire dans un environnement sain. Je recommande chaleureusement.",
    highlight: false,
  },
  {
    name: 'Merya M.', date: 'Avr 2024', bg: '#f59e0b', badge: 'Permis obtenu · Mention : Seyba',
    text: "J'ai passé 5 ans à essayer dans d'autres auto-écoles. Il ne m'a fallu que 2 semaines ici. Je recommande à 100%.",
    highlight: false,
  },
  {
    name: 'Jeff M.', date: 'Jan 2024', bg: '#16a34a', badge: 'Permis BVM · Mention : Oumy',
    text: "Après une auto-école catastrophique, j'ai découvert celle-ci comme un oasis. Oumy est l'âme de cette auto-école. Accueil chaleureux, suivi rigoureux.",
    highlight: false,
  },
  {
    name: 'Keren K.', date: 'Avr 2024', bg: '#ec4899', badge: '1er coup',
    text: "Permis du premier coup ! Super profs, cours bien complets, moniteurs à l'écoute. Je recommande vraiment cette auto-école.",
    highlight: false,
  },
  {
    name: 'Larose L.', date: 'Mars 2023', bg: '#8b5cf6', badge: 'Permis BVA · Moniteur : Seyba',
    text: "Seyba veille à ne pas vous faire payer plus d'heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS.",
    highlight: false,
  },
  {
    name: 'Jean B.', date: 'Oct 2023', bg: '#2d6a4f', badge: 'Permis BVM · Moniteur : Seyba',
    text: "S'il y a une auto-école que je peux conseiller, c'est bien celle-là. Le professionnalisme de Seyba balaie toute anxiété. On sent vraiment qu'il tient à ce que vous réussissiez.",
    highlight: false,
  },
  {
    name: 'Mireille G.', date: 'Déc 2023', bg: '#0891b2', badge: 'Mention : Oumy & Seyba',
    text: "Pour en avoir fait plusieurs, je sais de quoi je parle. Oumy a la conscience professionnelle que beaucoup devraient avoir. Je recommande les yeux fermés.",
    highlight: false,
  },
  {
    name: 'Soane B.', date: 'Mars 2024', bg: '#6366f1', badge: 'Permis BVM · Code + Permis 3 mois',
    text: "Auto école super ! J'ai eu mon code et mon permis en moins de 3 mois. L'accueil est au top et très motivant. Oumy et Seyba sont au top !",
    highlight: false,
  },
  {
    name: 'Martin M.', date: 'Avr 2026', bg: '#f59e0b', badge: 'Permis obtenu',
    text: "Des enseignants exceptionnels, qui sauront vous faire progresser rapidement. Ambiance bienveillante et sérieuse à la fois.",
    highlight: false,
  },
]

const STATS = [
  { value: '32', label: 'Avis vérifiés', Icon: Check },
  { value: '5.0', label: 'Note moyenne /5', Icon: Star },
  { value: '100%', label: 'Recommandent', Icon: TrendingUp },
  { value: '#1', label: 'Du 20ème', Icon: Award },
]

export default function AvisPage() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? AVIS : AVIS.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Avis élèves</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-2">
                Ce que nos élèves pensent
              </h1>
              <p className="text-[#4a5a52]">Tous nos avis sont vérifiés — aucun n&apos;est supprimé.</p>
            </div>
            {/* Score card */}
            <div className="bg-white rounded-2xl border border-[#dde5dc] p-6 text-center shadow-sm flex-shrink-0">
              <div className="font-serif text-6xl font-black text-[#2d6a4f] leading-none mb-2">5.0</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#c49a2f] text-[#c49a2f]" />
                ))}
              </div>
              <p className="text-sm text-[#4a5a52] font-bold">32 avis vérifiés</p>
              <p className="text-xs text-[#8a9690]">VroomVroom.fr</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {STATS.map(({ value, label, Icon }, i) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-[#dde5dc] p-4 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon className="w-5 h-5 text-[#2d6a4f] mx-auto mb-2" />
                <div className="font-serif font-black text-2xl text-[#2d6a4f]">{value}</div>
                <div className="text-xs text-[#4a5a52] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grille avis */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((a, i) => (
              <div
                key={a.name}
                className="bg-white rounded-2xl border border-[#dde5dc] p-6 flex flex-col card-hover animate-fade-up"
                style={{
                  borderLeftWidth: 4,
                  borderLeftColor: a.bg,
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                {/* Coup de projecteur */}
                {a.highlight && (
                  <div className="bg-[#2d6a4f]/8 border border-[#2d6a4f]/20 rounded-lg px-3 py-1.5 text-xs font-bold text-[#2d6a4f] mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    30/31 points du 1er coup
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: a.bg }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    >
                      {a.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#1a2e22] text-sm">{a.name}</p>
                      <p className="text-xs text-[#8a9690]">{a.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c49a2f] text-[#c49a2f]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#4a5a52] italic flex-1 mb-4 leading-relaxed">
                  &ldquo;{a.text}&rdquo;
                </p>
                <div className="flex items-center gap-1.5 bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                  <Check className="w-3 h-3" />
                  Vérifié — {a.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Voir plus / moins */}
          {AVIS.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(v => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold hover:bg-[#2d6a4f] hover:text-white transition-all text-sm"
              >
                {showAll ? (
                  <><ChevronUp className="w-4 h-4" /> Voir moins</>
                ) : (
                  <><ChevronDown className="w-4 h-4" /> Voir les {AVIS.length - 6} autres avis</>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-[#eef2ec]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-black text-[#1a2e22] mb-2">À ton tour de rejoindre l&apos;aventure</h2>
          <p className="text-[#4a5a52] mb-6">Plus de 32 élèves nous font confiance. Le prochain, c&apos;est toi.</p>
          <a
            href="tel:0182833126"
            className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <Phone className="w-5 h-5" />
            Appeler — 01 82 83 31 26
          </a>
        </div>
      </section>
    </div>
  )
}
