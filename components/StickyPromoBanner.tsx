'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, GraduationCap, Users, Euro } from 'lucide-react'

export default function StickyPromoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Vérifier si la bannière a déjà été fermée dans cette session
    const isClosed = sessionStorage.getItem('promoBannerClosed')
    if (!isClosed) {
      setIsVisible(true)
    }
  }, [])
  
  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('promoBannerClosed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#2d6a4f] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-center w-full">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span className="font-semibold">-15% étudiants</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="font-semibold">Parrainage : 50€ offerts</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-1.5">
            <Euro className="w-4 h-4" />
            <span className="font-semibold">Permis à 1€/jour</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <Link href="/offres" className="text-white hover:text-yellow-200 font-bold underline">
            Voir les offres
          </Link>
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Fermer la bannière"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}