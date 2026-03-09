'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/quiz', label: 'Quiz gratuit' },
  { href: '/avis', label: 'Avis' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf9f6]/95 backdrop-blur-md shadow-sm border-b border-[#e7e5e4]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#c0451e] flex items-center justify-center shadow-sm">
              <span className="font-serif text-white font-bold text-lg">M</span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-[#1c1917] text-sm">Mortier</span>
              <span className="text-[#c0451e] font-bold text-sm"> Auto-école</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm text-[#57534e] hover:text-[#1c1917] transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0182833126" className="flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-semibold px-4 py-2 rounded-[10px] transition-colors text-sm">
              <Phone className="w-4 h-4" />
              Appeler
            </a>
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-[#57534e] hover:text-[#1c1917]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-[#1a1814] flex flex-col">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#c0451e] flex items-center justify-center">
                <span className="font-serif text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-white text-sm">Mortier <span className="text-[#c0451e]">Auto-école</span></span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-start px-6 gap-2 flex-1 justify-center">
            {LINKS.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="font-serif text-3xl font-bold text-white/80 hover:text-white transition-colors py-2"
                style={{ animationDelay: `${i * 0.05}s` }}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="p-6">
            <a href="tel:0182833126" className="flex items-center justify-center gap-2 bg-[#c0451e] text-white font-bold py-4 rounded-2xl text-lg w-full">
              <Phone className="w-5 h-5" />
              01 82 83 31 26
            </a>
          </div>
        </div>
      )}
    </>
  )
}
