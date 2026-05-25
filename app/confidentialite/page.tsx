import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, UserCheck, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Auto-école Mortier',
  description: 'Politique de confidentialité et protection des données de l\'Auto-école Mortier'
}

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-[#f7f9f5] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#2d6a4f] hover:text-[#1b4332] font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-serif text-4xl font-black text-[#1a2e22] mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-[#4a5a52] text-lg">
            Votre vie privée est notre priorité. Voici comment nous protégeons vos données.
          </p>
        </div>

        {/* Résumé visuel */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde5dc]">
            <Shield className="w-8 h-8 text-[#16a34a] mx-auto mb-3" />
            <div className="font-bold text-[#1a2e22]">Données sécurisées</div>
            <div className="text-sm text-[#4a5a52]">Chiffrement SSL</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde5dc]">
            <Eye className="w-8 h-8 text-[#3b82f6] mx-auto mb-3" />
            <div className="font-bold text-[#1a2e22]">Usage limité</div>
            <div className="text-sm text-[#4a5a52]">Formation uniquement</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde5dc]">
            <UserCheck className="w-8 h-8 text-[#2d6a4f] mx-auto mb-3" />
            <div className="font-bold text-[#1a2e22]">Vos droits</div>
            <div className="text-sm text-[#4a5a52]">Accès et modification</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde5dc]">
            <Trash2 className="w-8 h-8 text-[#ef4444] mx-auto mb-3" />
            <div className="font-bold text-[#1a2e22]">Suppression</div>
            <div className="text-sm text-[#4a5a52]">Sur simple demande</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#dde5dc] p-8 space-y-10">
          {/* Collecte des données */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              🔍 Quelles données collectons-nous ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#f7f9f5] rounded-xl p-6">
                <h3 className="font-bold text-[#1a2e22] mb-3">Données d'inscription</h3>
                <ul className="space-y-2 text-[#4a5a52]">
                  <li>• Nom et prénom</li>
                  <li>• Date de naissance</li>
                  <li>• Adresse postale</li>
                  <li>• Numéro de téléphone</li>
                  <li>• Adresse email</li>
                  <li>• Formation souhaitée</li>
                </ul>
              </div>
              <div className="bg-[#f7f9f5] rounded-xl p-6">
                <h3 className="font-bold text-[#1a2e22] mb-3">Données techniques</h3>
                <ul className="space-y-2 text-[#4a5a52]">
                  <li>• Adresse IP (anonymisée)</li>
                  <li>• Type de navigateur</li>
                  <li>• Pages visitées</li>
                  <li>• Durée de visite</li>
                  <li>• Référent de visite</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Utilisation */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              Comment utilisons-nous vos données ?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mt-2"></div>
                <div>
                  <strong className="text-[#1a2e22]">Formation et suivi pédagogique</strong>
                  <p className="text-[#4a5a52] mt-1">Gestion de votre dossier, planification des cours, suivi de progression</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-2"></div>
                <div>
                  <strong className="text-[#1a2e22]">Communication</strong>
                  <p className="text-[#4a5a52] mt-1">Confirmation d'inscription, rappels de cours, informations importantes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="w-2 h-2 bg-[#f97316] rounded-full mt-2"></div>
                <div>
                  <strong className="text-[#1a2e22]">Amélioration du service</strong>
                  <p className="text-[#4a5a52] mt-1">Statistiques anonymes pour améliorer notre site et nos services</p>
                </div>
              </div>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              Partage des données
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
              <div className="font-bold text-[#dc2626] mb-2">Nous ne vendons jamais vos données</div>
              <p className="text-[#4a5a52]">
                Vos informations personnelles ne sont jamais vendues, louées ou échangées avec des tiers à des fins commerciales.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mt-2"></div>
                <div className="text-[#4a5a52]">
                  <strong className="text-[#1a2e22]">Préfecture :</strong> transmission obligatoire pour l'obtention du permis de conduire
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mt-2"></div>
                <div className="text-[#4a5a52]">
                  <strong className="text-[#1a2e22]">Organisme de financement :</strong> si utilisation du CPF ou permis à 1€/jour
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mt-2"></div>
                <div className="text-[#4a5a52]">
                  <strong className="text-[#1a2e22]">Prestataires techniques :</strong> uniquement pour le fonctionnement du service (hébergement, emails)
                </div>
              </div>
            </div>
          </section>

          {/* Droits */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              Vos droits sur vos données
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#3b82f6]" />
                  <strong className="text-[#1a2e22]">Droit d'accès</strong>
                </div>
                <p className="text-[#4a5a52] text-sm">Savoir quelles données nous avons sur vous</p>
                
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#16a34a]" />
                  <strong className="text-[#1a2e22]">Droit de rectification</strong>
                </div>
                <p className="text-[#4a5a52] text-sm">Corriger des informations inexactes</p>
                
                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-[#ef4444]" />
                  <strong className="text-[#1a2e22]">Droit d'effacement</strong>
                </div>
                <p className="text-[#4a5a52] text-sm">Supprimer vos données (sauf obligations légales)</p>
              </div>
              
              <div className="bg-[#2d6a4f]/5 border border-[#2d6a4f]/20 rounded-xl p-6">
                <h3 className="font-bold text-[#1a2e22] mb-3">Comment exercer vos droits ?</h3>
                <div className="space-y-2 text-sm text-[#4a5a52]">
                  <p><strong>Téléphone :</strong> 01 82 83 31 26</p>
                  <p><strong>Email :</strong> autoecolemortier@gmail.com</p>
                  <p><strong>Courrier :</strong> 127 bd Mortier, 75020 Paris</p>
                </div>
                <div className="mt-3 text-xs text-[#4a5a52]">
                  Réponse sous 30 jours maximum
                </div>
              </div>
            </div>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              Durée de conservation
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#f7f9f5] rounded-lg">
                <span className="text-[#1a2e22]">Données d'inscription non suivie</span>
                <span className="font-bold text-[#2d6a4f]">1 an</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f7f9f5] rounded-lg">
                <span className="text-[#1a2e22]">Dossier élève en formation</span>
                <span className="font-bold text-[#2d6a4f]">Durée formation + 1 an</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f7f9f5] rounded-lg">
                <span className="text-[#1a2e22]">Dossier permis obtenu</span>
                <span className="font-bold text-[#2d6a4f]">5 ans (obligation légale)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f7f9f5] rounded-lg">
                <span className="text-[#1a2e22]">Statistiques anonymes</span>
                <span className="font-bold text-[#2d6a4f]">Indéfiniment</span>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e22] mb-6">
              🍪 Cookies et technologies similaires
            </h2>
            <p className="text-[#4a5a52] mb-4">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#f7f9f5] rounded-lg p-4">
                <h4 className="font-bold text-[#1a2e22] mb-2">Cookies essentiels</h4>
                <p className="text-xs text-[#4a5a52]">Fonctionnement du site, sécurité, session utilisateur</p>
              </div>
              <div className="bg-[#f7f9f5] rounded-lg p-4">
                <h4 className="font-bold text-[#1a2e22] mb-2">Cookies analytiques</h4>
                <p className="text-xs text-[#4a5a52]">Statistiques de visite anonymes (Google Analytics)</p>
              </div>
              <div className="bg-[#f7f9f5] rounded-lg p-4">
                <h4 className="font-bold text-[#1a2e22] mb-2">Cookies de confort</h4>
                <p className="text-xs text-[#4a5a52]">Préférences, langue, personnalisation</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-[#2d6a4f] text-white rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Une question sur vos données ?
            </h2>
            <p className="mb-6">
              Notre équipe est à votre disposition pour toute question relative à la protection de vos données.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Nous contacter
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}