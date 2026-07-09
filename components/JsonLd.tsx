export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'AutomotiveBusiness', 'DrivingSchool'],
        '@id': 'https://autoecole-mortier.vercel.app/#business',
        name: 'Auto-école Mortier',
        alternateName: 'Mortier Auto-école',
        description:
          'Auto-école certifiée Qualiopi à Paris 20ème. Permis B manuel et automatique, conduite accompagnée (AAC), formule accélérée. Financement CPF et permis à 1€/jour disponibles. La mieux notée du 20ème arrondissement.',
        url: 'https://autoecole-mortier.vercel.app',
        telephone: '+33182833126',
        email: 'autoecolemortier@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '127 boulevard Mortier',
          addressLocality: 'Paris',
          postalCode: '75020',
          addressCountry: 'FR',
          addressRegion: 'Île-de-France',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 48.8673,
          longitude: 2.4082,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '10:00',
            closes: '14:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '16:00',
            closes: '19:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '10:00',
            closes: '14:00',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '32',
          bestRating: '5',
          worstRating: '1',
        },
        image: 'https://autoecole-mortier.vercel.app/og-image.png',
        logo: 'https://autoecole-mortier.vercel.app/logo-mortier.png',
        sameAs: [
          'https://www.instagram.com/autoecole_mortier',
          'https://www.google.com/maps/search/Auto-école+Mortier+Paris+20',
        ],
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'CPF, Permis à 1€/jour, Espèces, Chèque, Virement',
        hasMap: 'https://www.google.com/maps/search/127+boulevard+Mortier+Paris+75020',
        publicAccess: true,
        isAccessibleForFree: false,
        knowsAbout: [
          'Permis B manuel',
          'Permis B automatique',
          'Conduite accompagnée AAC',
          'Code de la route',
          'Formation accélérée',
          'Permis à 1€ par jour',
          'Financement CPF',
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certification Qualiopi',
          credentialCategory: 'Certification qualité formations professionnelles',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://autoecole-mortier.vercel.app/#website',
        url: 'https://autoecole-mortier.vercel.app',
        name: 'Auto-école Mortier',
        description: 'La mieux notée du 20ème. Permis B, AAC, Code. Qualiopi, CPF, 1€/jour.',
        inLanguage: 'fr-FR',
        publisher: {
          '@id': 'https://autoecole-mortier.vercel.app/#business',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://autoecole-mortier.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Formations', item: 'https://autoecole-mortier.vercel.app/formations' },
          { '@type': 'ListItem', position: 3, name: 'Tarifs', item: 'https://autoecole-mortier.vercel.app/tarifs' },
          { '@type': 'ListItem', position: 4, name: 'Nos Offres', item: 'https://autoecole-mortier.vercel.app/offres' },
          { '@type': 'ListItem', position: 5, name: 'Contact', item: 'https://autoecole-mortier.vercel.app/contact' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "Où est située l'auto-école Mortier ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Auto-école Mortier est située au 127 boulevard Mortier, 75020 Paris. L'arrêt de tram T3b Adrienne Bolland est juste devant l'auto-école.",
            },
          },
          {
            '@type': 'Question',
            name: "Comment financer son permis à l'auto-école Mortier ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L'auto-école Mortier est certifiée Qualiopi, ce qui permet de financer la formation via le CPF. Le dispositif Permis à 1€/jour est également disponible pour les 15-25 ans.",
            },
          },
          {
            '@type': 'Question',
            name: "Quels sont les tarifs du permis B à l'auto-école Mortier ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Les tarifs sont : Permis B Automatique 13h à partir de 949€, Permis B Manuel 20h à partir de 1099€, Code en ligne à 50€. Des réductions de -15% sont offertes aux étudiants sur présentation de la carte étudiante.",
            },
          },
          {
            '@type': 'Question',
            name: "Quels sont les horaires de l'auto-école Mortier ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L'auto-école Mortier est ouverte du mardi au vendredi de 10h à 14h et de 16h à 19h, et le samedi de 10h à 14h. Fermée le lundi et le dimanche.",
            },
          },
          {
            '@type': 'Question',
            name: "L'auto-école Mortier est-elle bien notée ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Oui, Auto-école Mortier est notée 5.0/5 sur Google avec 32 avis vérifiés. C'est la mieux notée du 20ème arrondissement de Paris.",
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
          }
