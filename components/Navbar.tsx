'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useTheme } from './ThemeProvider'

const LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/offres', label: 'Nos Offres' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/avis', label: 'Avis' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'shadow-sm border-b'
            : 'border-b border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottomColor: isScrolled ? 'var(--border-color)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-10 h-10 rounded-full bg-[#c0451e] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden">
              <Image
                src="/logo-mortier.png"
                alt="Logo Mortier"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="font-bold text-sm" style={{ color: 'var(--dark-text)' }}>Mortier</div>
              <div className="font-bold text-xs text-[#c0451e]">Auto-école</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 ml-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 relative"
                style={{
                  color: isActive(link.href) ? 'var(--brand)' : 'var(--secondary-text)',
                  fontWeight: isActive(link.href) ? '600' : '500',
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full animate-fade-in"
                    style={{ backgroundColor: 'var(--brand)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--secondary-text)',
                border: '1px solid var(--border-color)',
              }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Badge "Inscriptions ouvertes" */}
            <div className="px-3 py-1.5 bg-[#16a34a] text-white text-xs font-medium rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              Inscriptions ouvertes
            </div>

            {/* Call Button */}
            <a
              href="tel:0182833126"
              onClick={() => track('call_clicked', { location: 'navbar_desktop' })}
              className="inline-flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">01 82 83 31 26</span>
              <span className="sm:hidden">Appeler</span>
            </a>

            {/* Sign Up Button */}
            <Link
              href="/contact"
              onClick={() => track('signup_clicked', { location: 'navbar_desktop' })}
              className="inline-flex items-center justify-center px-4 py-2 border-2 border-[#c0451e] text-[#c0451e] hover:bg-[#c0451e] hover:text-white font-semibold rounded-lg transition-all duration-200 text-sm"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile: theme + burger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--secondary-text)',
                border: '1px solid var(--border-color)',
              }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 transition-colors duration-300"
              style={{ color: 'var(--secondary-text)' }}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col animate-slide-up"
          style={{ backgroundColor: '#0a0f0b' }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-[#c0451e] flex items-center justify-center overflow-hidden">
                <Image src="/logo-mortier.png" alt="Logo Mortier" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Mortier</div>
                <div className="text-[#c0451e] font-bold text-xs">Auto-école</div>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-2"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col flex-1 justify-center gap-0 overflow-y-auto">
            {LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-lg font-semibold border-b border-white/5 transition-all duration-300"
                style={{
                  color: isActive(link.href) ? '#e05a30' : 'rgba(255,255,255,0.8)',
                  backgroundColor: isActive(link.href) ? 'rgba(255,255,255,0.05)' : 'transparent',
                  animation: `slideInDown 0.4s ease-out`,
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'both',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="p-6 space-y-3 border-t border-white/10">
            <a
              href="tel:0182833126"
              className="flex items-center justify-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold w-full py-4 text-lg rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              01 82 83 31 26
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#0a0f0b] font-bold w-full py-4 text-lg rounded-lg transition-colors"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
