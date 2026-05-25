'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Trophy, Users, GraduationCap, Heart, Gift } from 'lucide-react'

export default function OffresPopup() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Afficher le popup après 3 secondes si pas encore vu dans cette session
    const hasSeenPopup = sessionStorage.getItem('offresPopupSeen')
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('offresPopupSeen', 'true')
  }
  
  const handleViewOffers = () => {
    sessionStorage.setItem('offresPopupSeen', 'true')
    setIsVisible(false)
  }
  
  if (!isVisible) return null
  
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]" onClick={handleClose} />
      
      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[80] w-full max-w-lg mx-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#e7e5e4] overflow-hidden animate-scale-in">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-[#c0451e] to-[#e8593a] text-white p-6 text-center relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="font-serif text-2xl font-black mb-2">
              🎉 Des offres rien que pour toi !
            </h2>
            <p className="text-white/90 text-sm">
              Économise jusqu'à 15% sur ton permis
            </p>
          </div>
          
          {/* Contenu */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Étudiant */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <GraduationCap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-bold text-[#1c1917] text-sm">🎓 Étudiant</div>
                <div className="text-blue-600 font-bold">-15%</div>
              </div>
              
              {/* Parrainage */}
              <div className="bg-[#c0451e]/5 border border-[#c0451e]/20 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-[#c0451e] mx-auto mb-2" />
                <div className="font-bold text-[#1c1917] text-sm">🤝 Parrainage</div>
                <div className="text-[#c0451e] font-bold">50€ offerts</div>
              </div>
              
              {/* Famille */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <Heart className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <div className="font-bold text-[#1c1917] text-sm">👨‍👩‍👧‍👦 Famille</div>
                <div className="text-amber-600 font-bold">-20%</div>
              </div>
              
              {/* Premier coup */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold text-[#1c1917] text-sm">🏆 1er coup</div>
                <div className="text-green-600 font-bold">50€ bonus</div>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                href="/offres"
                onClick={handleViewOffers}
                className="inline-flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-bold px-6 py-3 rounded-lg transition-colors w-full justify-center mb-3"
              >
                <Gift className="w-4 h-4" />
                Découvrir toutes les offres
              </Link>
              
              <button
                onClick={handleClose}
                className="text-sm text-[#57534e] hover:text-[#1c1917] transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}