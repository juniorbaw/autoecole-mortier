import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales | Auto-école Mortier',
  description: 'Mentions légales de l\'Auto-école Mortier, Paris 20ème'
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#c0451e] hover:text-[#a83a18] font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-serif text-4xl font-black text-[#1c1917] mb-4">
            Mentions légales
          </h1>
          <p className="text-[#57534e]">
            Informations légales concernant l'Auto-école Mortier
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e4] p-8 space-y-8">
          {/* Identification */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Identification de l'établissement
            </h2>
            <div className="space-y-2 text-[#57534e]">
              <p><strong className="text-[#1c1917]">Raison sociale :</strong> Auto-école Mortier</p>
              <p><strong className="text-[#1c1917]">SIRET :</strong> 93345595800019</p>
              <p><strong className="text-[#1c1917]">Adresse :</strong> 127 boulevard Mortier, 75020 Paris</p>
              <p><strong className="text-[#1c1917]">Téléphone :</strong> 01 82 83 31 26</p>
              <p><strong className="text-[#1c1917]">Email :</strong> autoecolemortier@gmail.com</p>
              <p><strong className="text-[#1c1917]">Directeur de publication :</strong> Seyba D.</p>
            </div>
          </section>

          {/* Certification */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Certification et agréments
            </h2>
            <div className="space-y-2 text-[#57534e]">
              <p><strong className="text-[#1c1917]">Certification Qualiopi :</strong> Actions de formation</p>
              <p><strong className="text-[#1c1917]">Agrément préfectoral :</strong> E2002075200</p>
              <p><strong className="text-[#1c1917]">Organisme de formation :</strong> 11755964675</p>
              <p><strong className="text-[#1c1917]">Garantie financière :</strong> Assurée auprès de la MAAF</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Hébergement du site web
            </h2>
            <div className="space-y-2 text-[#57534e]">
              <p><strong className="text-[#1c1917]">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-[#1c1917]">Adresse :</strong> 340 S Lemon Ave #4133, Walnut CA 91789, États-Unis</p>
              <p><strong className="text-[#1c1917]">Site web :</strong> <a href="https://vercel.com" className="text-[#c0451e] hover:underline">vercel.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Propriété intellectuelle
            </h2>
            <p className="text-[#57534e] leading-relaxed">
              L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos) sont la propriété 
              exclusive de l'Auto-école Mortier et sont protégés par les dispositions du Code de la propriété 
              intellectuelle. Toute reproduction, représentation, modification, publication, adaptation, 
              traduction de tout ou partie des éléments de ce site, quel que soit le moyen ou le procédé utilisé, 
              est interdite sans l'autorisation écrite préalable de l'Auto-école Mortier.
            </p>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Protection des données personnelles
            </h2>
            <div className="space-y-4 text-[#57534e] leading-relaxed">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                "Informatique et Libertés", vous disposez d'un droit d'accès, de rectification, de 
                portabilité et d'effacement de vos données ou encore de limitation du traitement.
              </p>
              <p>
                Les données collectées via les formulaires de contact sont utilisées uniquement pour 
                répondre à vos demandes d'informations et ne sont jamais transmises à des tiers.
              </p>
              <p>
                Pour exercer ces droits ou pour toute question relative au traitement de vos données, 
                vous pouvez nous contacter par téléphone au 01 82 83 31 26 ou par email à l'adresse 
                autoecolemortier@gmail.com.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1c1917] mb-4">
              Limitation de responsabilité
            </h2>
            <p className="text-[#57534e] leading-relaxed">
              L'Auto-école Mortier s'efforce de fournir des informations aussi précises que possible sur ce site. 
              Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences 
              dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui 
              fournissent ces informations.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c0451e] hover:bg-[#a83a18] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Une question ? Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  )
}