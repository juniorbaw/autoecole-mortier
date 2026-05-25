'use client'
import { Phone, MapPin, Gamepad2 } from 'lucide-react'
import Link from 'next/link'

export default function MobileBar() {
  function scrollToContact() {
    const el = document.getElementById('contact-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/contact'
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="m-3 bg-[#0a1410]/95 backdrop-blur-md rounded-2xl p-3 flex gap-2 shadow-2xl border border-white/10">
        <a href="tel:0182833126"
          className="flex-1 flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-3 rounded-xl transition-colors text-sm">
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <button onClick={scrollToContact}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors text-sm">
          <MapPin className="w-4 h-4" />
          Venir
        </button>
        <Link href="/quiz"
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors text-sm">
          <Gamepad2 className="w-4 h-4" />
          Quiz
        </Link>
      </div>
    </div>
  )
}
