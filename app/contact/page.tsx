'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Phone, MapPin, Clock, Train, Mail, ChevronDown, Check, Send, Calendar, FileSignature } from 'lucide-react'

const FORMATIONS_CONTACT = [
  { label: 'Permis B manuel 1 099€', id: 'bvm' },
  { label: 'Permis B auto 949€', id: 'bva' },
  { label: 'Accéléré 1 399€', id: 'accelere' },
  { label: 'AAC 1 199€', id: 'aac' },
  { label: 'Code en ligne 50€', id: 'code' },
  { label: 'Permis à 1€/jour', id: 'permis1' },
]

const FINANCEMENTS_CONTACT = [
  { label: 'CPF', id: 'cpf' },
  { label: 'Aide Région IDF', id: 'region' },
  { label: 'Permis 1€/jour', id: 'permis1' },
  { label: 'Paiement 3x', id: 'x3' },
  { label: 'Personnel', id: 'perso' },
]

const FAQS = [
  { q: 'Combien de temps pour avoir le permis ?', a: 'En moyenne 2-3 mois. En accéléré, 3-4 semaines. Tout dépend de votre rythme et disponibilité.' },
  { q: 'Puis-je utiliser mon CPF ?', a: "Oui ! Nous sommes certifiés Qualiopi. Oumy vous aide dans toutes les démarches CPF, c'est gratuit et simple." },
  { q: 'Avez-vous des facilités de paiement ?', a: "Oui, paiement en plusieurs fois possible. CB, espèces, chèque, virement, CPF, permis 1€/jour — on s'adapte à votre situation." },
  { q: 'Je veux convertir mon permis étranger ?', a: 'Nous accompagnons les titulaires de permis étrangers dans leurs démarches. Appelez-nous pour un devis personnalisé.' },
]

const CRENEAUX = ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']

function getMiniCalendar() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = []
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return { days, month: today.toLocaleString('fr-FR', { month: 'long', year: 'numeric' }) }
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedCreneau, setSelectedCreneau] = useState<string | null>(null)
  const [selectedFormation, setSelectedFormation] = useState<string | null>(null)
  const [selectedFinancement, setSelectedFinancement] = useState<string | null>(null)
  const [form, setForm] = useState({ prenom: '', nom: '', tel: '', email: '', age: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const { days, month } = getMiniCalendar()
  const today = new Date().getDate()
  const currentDayOfWeek = new Date().getDay()

  function isDayClickable(day: number | null) {
    if (!day) return false
    const date = new Date()
    date.setDate(day)
    const dow = date.getDay()
    return dow >= 2 && dow <= 6 && day >= today // Mar=2 à Sam=6
  }

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const formationLabel = FORMATIONS_CONTACT.find(f => f.id === selectedFormation)?.label
      const financementLabel = FINANCEMENTS_CONTACT.find(f => f.id === selectedFinancement)?.label
      const messageParts: string[] = []
      if (form.age)            messageParts.push(`Âge : ${form.age}`)
      if (financementLabel)    messageParts.push(`Financement : ${financementLabel}`)
      if (selectedDay && selectedCreneau) messageParts.push(`RDV souhaité : le ${selectedDay} ${month} à ${selectedCreneau}`)

      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          telephone: form.tel,
          formation: formationLabel,
          modeContact: 'Téléphone',
          message: messageParts.join(' · '),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi")
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#eef2ec]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-xs text-[#2d6a4f] font-semibold tracking-widest uppercase">Contact</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a2e22] mt-2 mb-4">Prenons contact</h1>
          <p className="text-[#4a5a52] text-lg max-w-xl mx-auto">Oumy vous recontactera sous 24h. Ou appelez directement au 01 82 83 31 26.</p>
          <a href="mailto:autoecolemortier@gmail.com"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[#2d6a4f]/10 border border-[#2d6a4f]/30 text-[#2d6a4f] font-semibold text-sm hover:bg-[#2d6a4f]/20 transition-colors">
            <Mail className="w-4 h-4" />
            autoecolemortier@gmail.com
          </a>
        </div>
      </section>

      <section id="contact-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Colonne gauche */}
          <div>
            {/* Cartes contact */}
            <div className="space-y-3 mb-10">
              {[
                { icon: <Phone className="w-5 h-5 text-[#2d6a4f]" />, label: 'Téléphone', value: '01 82 83 31 26', href: 'tel:0182833126' },
                { icon: <Mail className="w-5 h-5 text-[#2d6a4f]" />, label: 'Email', value: 'autoecolemortier@gmail.com', href: 'mailto:autoecolemortier@gmail.com' },
                { icon: <MapPin className="w-5 h-5 text-[#2d6a4f]" />, label: 'Adresse', value: '127 boulevard Mortier, 75020 Paris', href: 'https://maps.google.com/?q=127+boulevard+Mortier+Paris' },
                { icon: <Clock className="w-5 h-5 text-[#2d6a4f]" />, label: 'Horaires', value: "Mar-Ven 10h-14h / 16h-19h · Sam 10h-14h", href: null },
                { icon: <Train className="w-5 h-5 text-[#2d6a4f]" />, label: 'Accès', value: "Tram T3b — Arrêt devant l'auto-école", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="bg-white border border-[#dde5dc] rounded-xl p-4 flex items-center gap-4 hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs text-[#8a9690] font-medium mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} className="text-sm font-semibold text-[#1a2e22] hover:text-[#2d6a4f] transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-[#1a2e22]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Photo devanture */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-[#dde5dc] shadow-sm relative group">
              <Image
                src="/devanture.jpg"
                alt="Devanture Auto-école Mortier — 127 boulevard Mortier, Paris 20ème"
                width={800}
                height={450}
                className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-white text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  127 boulevard Mortier — Paris 20ème · Tram T3b
                </p>
              </div>
            </div>

            {/* FAQ */}
            <h2 className="font-serif text-xl font-black text-[#1a2e22] mb-4">Questions fréquentes</h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white border border-[#dde5dc] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f7f9f5] transition-colors">
                    <span className="font-medium text-[#1a2e22] text-sm pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8a9690] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-[#4a5a52] leading-relaxed border-t border-[#dde5dc] pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite */}
          <div>
            {/* Mini calendrier */}
            <div className="bg-white border border-[#dde5dc] rounded-2xl p-6 mb-6">
              <h2 className="font-serif text-xl font-black text-[#1a2e22] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2d6a4f]" />
                Prendre rendez-vous
              </h2>
              <p className="text-sm text-[#4a5a52] mb-4 capitalize font-medium">{month}</p>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-[#8a9690] py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {days.map((day, i) => (
                  <button key={i} onClick={() => isDayClickable(day) ? setSelectedDay(day) : null}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${!day ? 'invisible' : isDayClickable(day) ? selectedDay === day ? 'bg-[#2d6a4f] text-white font-bold' : 'hover:bg-[#2d6a4f]/10 text-[#1a2e22] font-medium' : 'text-[#dde5dc] cursor-default'}`}>
                    {day}
                  </button>
                ))}
              </div>

              {selectedDay && (
                <div>
                  <p className="text-sm font-semibold text-[#1a2e22] mb-3">Choisissez un créneau</p>
                  <div className="flex flex-wrap gap-2">
                    {CRENEAUX.map(c => (
                      <button key={c} onClick={() => setSelectedCreneau(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${selectedCreneau === c ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'border-[#dde5dc] text-[#4a5a52] hover:border-[#2d6a4f]'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDay && selectedCreneau && (
                <a href="tel:0182833126"
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold py-3 rounded-xl transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  Confirmer le {selectedDay} à {selectedCreneau}
                </a>
              )}
            </div>

            {/* Formulaire */}
            <div className="bg-white border border-[#dde5dc] rounded-2xl p-6">
              <h2 className="font-serif text-xl font-black text-[#1a2e22] mb-6 flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-[#2d6a4f]" />
                Inscription en ligne
              </h2>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#16a34a]" />
                  </div>
                  <h3 className="font-bold text-[#1a2e22] mb-2">Demande envoyée !</h3>
                  <p className="text-sm text-[#4a5a52]">Oumy vous recontactera sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4a5a52] mb-1.5">Prénom</label>
                      <input type="text" required value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-[#dde5dc] rounded-[10px] text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors" placeholder="Marie" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4a5a52] mb-1.5">Nom</label>
                      <input type="text" required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-[#dde5dc] rounded-[10px] text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors" placeholder="Dupont" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5a52] mb-1.5">Téléphone</label>
                    <input type="tel" required value={form.tel} onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-[#dde5dc] rounded-[10px] text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors" placeholder="06 12 34 56 78" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5a52] mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-[#dde5dc] rounded-[10px] text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors" placeholder="marie@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5a52] mb-1.5">Âge</label>
                    <input type="number" min={15} max={99} value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-[#dde5dc] rounded-[10px] text-sm focus:outline-none focus:border-[#2d6a4f] transition-colors" placeholder="18" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#4a5a52] mb-2">Formation souhaitée</p>
                    <div className="flex flex-wrap gap-2">
                      {FORMATIONS_CONTACT.map(f => (
                        <button key={f.id} type="button" onClick={() => setSelectedFormation(f.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedFormation === f.id ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'border-[#dde5dc] text-[#4a5a52] hover:border-[#2d6a4f]'}`}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#4a5a52] mb-2">Financement</p>
                    <div className="flex flex-wrap gap-2">
                      {FINANCEMENTS_CONTACT.map(f => (
                        <button key={f.id} type="button" onClick={() => setSelectedFinancement(f.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedFinancement === f.id ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' : 'border-[#dde5dc] text-[#4a5a52] hover:border-[#2d6a4f]'}`}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {error && (
                    <p className="text-xs text-red-600 text-center">{error}</p>
                  )}
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors">
                    <Send className="w-4 h-4" />
                    {sending ? 'Envoi en cours...' : "Envoyer ma demande d'inscription"}
                  </button>
                  <p className="text-xs text-[#8a9690] text-center">Oumy vous recontactera sous 24h</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
