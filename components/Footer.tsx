import Link from 'next/link'
import { Phone, MapPin, Clock, Train, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1814] text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#c0451e] flex items-center justify-center">
                <span className="font-serif text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-white text-sm">Mortier <span className="text-[#c0451e]">Auto-école</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Votre auto-école de confiance dans le 20ème. Certifiée Qualiopi, finançable CPF, note 5.0/5.
            </p>
            <div className="flex gap-3 flex-wrap mb-4">
              {['Qualiopi', 'Garantie financière', 'Label qualité'].map(b => (
                <span key={b} className="text-xs bg-white/10 text-white/60 px-2.5 py-1 rounded-full">{b}</span>
              ))}
            </div>
            <a
              href="https://www.instagram.com/autoecole_mortier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="w-4 h-4 text-white" />
              </span>
              @autoecole_mortier
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/formations', label: 'Formations' },
                { href: '/pourquoi-nous', label: 'Pourquoi nous' },
                { href: '/quiz', label: 'Quiz gratuit' },
                { href: '/avis', label: 'Avis' },
                { href: '/tarifs', label: 'Tarifs' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Formations</h4>
            <ul className="space-y-2 text-sm">
              {['Permis B Manuel', 'Permis B Automatique', 'Formule Accélérée', 'Conduite Accompagnée', 'Permis à 1€/jour', 'Code en ligne'].map(f => (
                <li key={f}><Link href="/formations" className="hover:text-white transition-colors">{f}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href="tel:0182833126" className="flex items-center gap-2 text-sm hover:text-white transition-colors"><Phone className="w-4 h-4 text-[#c0451e]" />01 82 83 31 26</a></li>
              <li className="flex items-start gap-2 text-sm"><MapPin className="w-4 h-4 text-[#c0451e] mt-0.5 flex-shrink-0" />127 bd Mortier, 75020 Paris</li>
              <li className="flex items-start gap-2 text-sm"><Clock className="w-4 h-4 text-[#c0451e] mt-0.5 flex-shrink-0" />Mar-Ven 10h-14h / 16h-19h<br />Sam 10h-14h</li>
              <li className="flex items-center gap-2 text-sm"><Train className="w-4 h-4 text-[#c0451e]" />Tram T3b — Arrêt devant</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2025 Auto-école Mortier — Tous droits réservés</p>
          <div className="flex gap-4 text-xs">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
