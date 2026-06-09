'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Users, GraduationCap, Heart, Calendar, Trophy, Building, ChevronRight, Calculator } from 'lucide-react'

// Simulateur d'économies
function SimulateurEconomies() {
  const [profil, setProfil] = useState({
    etudiant: false,
    famille: false,
    parrainage: false,
    jeune: false,
    cpf: false
  })
  
  const [formation, setFormation] = useState('manuel')
  
  const formations = {
    manuel: { nom: 'Permis B Manuel', prix: 1099 },
    auto: { nom: 'Permis B Auto', prix: 949 },
    accelere: { nom: 'Formule Accélérée', prix: 1399 },
    aac: { nom: 'Conduite Accompagnée', prix: 1199 },
    code: { nom: 'Code seul', prix: 299 }
  }
  
  const calculerPrix = () => {
    let prix = formations[formation as keyof typeof formations].prix
    let reductions = 0
    
    if (profil.etudiant) {
      reductions += prix * 0.15 // -15%
    }
    if (profil.famille) {
      reductions += prix * 0.20 // -20% (2ème enfant)
    }
    if (profil.parrainage) {
      reductions += 50
    }
    
    return {
      prixBase: prix,
      reductions: Math.round(reductions),
      prixFinal: Math.round(prix - reductions)
    }
  }
  
  const { prixBase, reductions, prixFinal } = calculerPrix()
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#dde5dc] p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#2d6a4f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-[#2d6a4f]" />
        </div>
        <h3 className="font-serif text-2xl font-black text-[#1a2e22] mb-2">
          Combien économisez-vous chez Mortier ?
        </h3>
        <p className="text-[#4a5a52]">Coche ce qui s'applique à toi</p>
      </div>
      
      {/* Checkboxes profil */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { key: 'etudiant', label: 'Je suis étudiant(e)', desc: 'Économie de 15%' },
          { key: 'famille', label: 'Un membre de ma famille est déjà inscrit', desc: 'Économie de 20%' },
          { key: 'parrainage', label: 'J\'ai un code parrainage', desc: 'Économie de 50€' },
          { key: 'jeune', label: 'J\'ai entre 15 et 25 ans', desc: 'Éligible permis à 1€/jour' },
          { key: 'cpf', label: 'Je veux utiliser mon CPF', desc: 'Jusqu\'à 100% financé' }
        ].map(({ key, label, desc }) => (
          <label key={key} className="flex items-start gap-3 p-4 border border-[#dde5dc] rounded-xl hover:bg-[#f7f9f5] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={profil[key as keyof typeof profil]}
              onChange={(e) => setProfil(prev => ({ ...prev, [key]: e.target.checked }))}
              className="mt-1 w-4 h-4 text-[#2d6a4f] rounded"
            />
            <div>
              <div className="font-medium text-[#1a2e22]">{label}</div>
              <div className="text-sm text-[#4a5a52]">{desc}</div>
            </div>
          </label>
        ))}
      </div>
      
      {/* Sélecteur formation */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-[#1a2e22] mb-3">Formation souhaitée :</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(formations).map(([key, { nom }]) => (
            <button
              key={key}
              onClick={() => setFormation(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formation === key 
                  ? 'bg-[#2d6a4f] text-white' 
                  : 'bg-[#eef2ec] text-[#1a2e22] hover:bg-[#dde5dc]'
              }`}
            >
              {nom}
            </button>
          ))}
        </div>
      </div>
      
      {/* Résultat */}
      <div className="bg-gradient-to-r from-[#2d6a4f]/10 to-[#2d6a4f]/5 rounded-xl p-6 text-center">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm text-[#4a5a52]">Prix de base</div>
            <div className="text-xl font-bold text-[#1a2e22]">{prixBase}€</div>
          </div>
          <div>
            <div className="text-sm text-[#4a5a52]">Tes réductions</div>
            <div className="text-xl font-bold text-[#16a34a]">-{reductions}€</div>
          </div>
          <div>
            <div className="text-sm text-[#4a5a52]">TON PRIX</div>
            <div className="text-3xl font-black text-[#2d6a4f]">{prixFinal}€</div>
          </div>
        </div>
        
        {prixFinal > 299 && (
          <div className="text-sm text-[#4a5a52] mb-4">
            Ou seulement <strong>{Math.round(prixFinal / 3)}€/mois</strong> en 3x
            {profil.jeune && prixFinal > 800 && (
              <span> • Ou <strong>1€/jour</strong> si éligible</span>
            )}
          </div>
        )}
        
        <a href="tel:0182833126" 
          className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-6 py-3 rounded-lg transition-colors">
          <Phone className="w-4 h-4" />
          Réserver avec ce prix — 01 82 83 31 26
        </a>
      </div>
    </div>
  )
}

export default function OffresPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    // Date de fin de l'offre rentrée (exemple : 31 mars)
    const endDate = new Date('2024-03-31T23:59:59')
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="min-h-screen bg-[#f7f9f5]">
      {/* Hero */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#eef2ec] to-[#f7f9f5]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#2d6a4f]/10 text-[#2d6a4f] text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Trophy className="w-4 h-4" />
            4 programmes d'acquisition
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#1a2e22] mb-6">
            Des offres pensées<br />
            <span className="text-[#2d6a4f]">pour toi</span>
          </h1>
          
          <p className="text-xl text-[#4a5a52] mb-8 max-w-2xl mx-auto">
            Parrainage, réductions étudiants, offre famille... On veut que le prix ne soit jamais un frein.
          </p>
        </div>
      </section>

      {/* Grille des 6 offres */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Carte 1 : Parrainage */}
            <div className="bg-white rounded-2xl shadow-sm border-l-4 border-l-[#2d6a4f] p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#16a34a] text-white text-xs font-bold px-2 py-1 rounded">
                ROI 16x
              </div>
              <div className="w-12 h-12 bg-[#2d6a4f]/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#2d6a4f]" />
              </div>
              
              <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-4">
                Parrainage double bonus
              </h3>
              
              <p className="text-[#2d6a4f] font-bold text-lg mb-6">
                Parraine un ami, gagnez 50€ chacun
              </p>
              
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#16a34a] mt-0.5 flex-shrink-0" />
                  <span><strong>Parrain :</strong> -50€ sur heures supp (1h gratuite)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#16a34a] mt-0.5 flex-shrink-0" />
                  <span><strong>Filleul :</strong> -50€ sur l'inscription</span>
                </li>
              </ul>
              
              <div className="bg-[#f7f9f5] rounded-lg p-4 mb-6">
                <div className="text-xs font-bold text-[#1a2e22] mb-2">PALIERS SUPER PARRAIN :</div>
                <div className="space-y-1 text-xs text-[#4a5a52]">
                  <div className="flex justify-between">
                    <span>3 filleuls →</span>
                    <span className="font-medium">+1h gratuite</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5 filleuls →</span>
                    <span className="font-medium">+2h gratuites</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10 filleuls →</span>
                    <span className="font-medium text-[#2d6a4f]">Passerelle BVA offerte (349€)</span>
                  </div>
                </div>
              </div>
              
              <a href="tel:0182833126" 
                className="block w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-3 rounded-lg text-center transition-colors">
                Demander mon code parrain
              </a>
            </div>

            {/* Carte 2 : Étudiants */}
            <div className="bg-white rounded-2xl shadow-sm border-l-4 border-l-blue-500 p-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-blue-500" />
              </div>
              
              <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-4">
                Offre étudiants — 15%
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">Permis B Manuel :</span>
                  <div className="text-right">
                    <span className="text-sm line-through text-[#8a9690]">1 099€</span>
                    <div className="font-bold text-[#2d6a4f]">935€</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">Permis B Auto :</span>
                  <div className="text-right">
                    <span className="text-sm line-through text-[#8a9690]">949€</span>
                    <div className="font-bold text-[#2d6a4f]">807€</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">Code seul :</span>
                  <div className="text-right">
                    <span className="text-sm line-through text-[#8a9690]">299€</span>
                    <div className="font-bold text-[#2d6a4f]">255€</div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-[#4a5a52] mb-4">
                Condition : carte étudiante valide<br />
                Non cumulable avec le parrainage
              </p>
              
              <a href="tel:0182833126" 
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-center transition-colors">
                J'en profite avec ma carte étudiante
              </a>
            </div>

            {/* Carte 3 : Famille */}
            <div className="bg-white rounded-2xl shadow-sm border-l-4 border-l-amber-500 p-8">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-amber-500" />
              </div>
              
              <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-4">
                Offre famille
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">1er enfant :</span>
                  <span className="font-bold text-[#1a2e22]">Prix normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">2ème enfant :</span>
                  <span className="font-bold text-[#2d6a4f]">-20% (879€)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#4a5a52]">3ème enfant :</span>
                  <span className="font-bold text-[#2d6a4f]">-25% (824€)</span>
                </div>
              </div>
              
              <p className="text-center text-sm font-medium text-[#4a5a52] mb-6">
                "La meilleure auto-école pour toute la famille"
              </p>
              
              <a href="tel:0182833126" 
                className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg text-center transition-colors">
                Inscrire plusieurs membres
              </a>
            </div>

            {/* Carte 4 : Premier de la classe */}
            <div className="bg-white rounded-2xl shadow-sm border-l-4 border-l-amber-500 p-8">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              
              <h3 className="font-serif text-xl font-black text-[#1a2e22] mb-4">
                Premier de la classe
              </h3>
              
              <p className="text-amber-600 font-bold mb-4">
                Permis du 1er coup ? Reçois un bon de 50€ à offrir à un ami
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Passe ton permis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Réussis du 1er coup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="font-bold">Offre 50€ à un ami</span>
                </div>
              </div>
              
              <a href="tel:0182833126" 
                className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg text-center transition-colors">
                Ça me motive
              </a>
            </div>


          </div>
        </div>
      </section>

      {/* Simulateur d'économies */}
      <section className="py-16 px-4 bg-[#eef2ec]">
        <div className="max-w-4xl mx-auto">
          <SimulateurEconomies />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-black text-[#1a2e22] mb-4">
            Une offre te correspond ?
          </h2>
          <p className="text-[#4a5a52] mb-8">
            Oumy calcule avec toi la meilleure combinaison pour ton budget.
          </p>
          <a href="tel:0182833126" 
            className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg">
            <Phone className="w-5 h-5" />
            Appeler Oumy — 01 82 83 31 26
          </a>
          <p className="text-xs text-[#8a9690] mt-3">
            Conseil gratuit • Sans engagement • Disponible maintenant
          </p>
        </div>
      </section>
    </div>
  )
}