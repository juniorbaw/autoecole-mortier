import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const AUTO_ECOLE_EMAIL = 'autoecolemortier@gmail.com'
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || 'Auto-école Mortier <onboarding@resend.dev>'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nom,
      prenom,
      email,
      telephone,
      formation,
      message,
      modeContact,
    } = body

    if (!nom || !prenom || !email || !telephone) {
      return NextResponse.json(
        { error: 'Les champs nom, prénom, email et téléphone sont obligatoires' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === 're_xxxxxxxxxxxxxxxxxxxxxxxxxx') {
      console.log('Inscription reçue (mode démo) :', { nom, prenom, email, telephone, formation })
      return NextResponse.json({
        success: true,
        message: 'Inscription enregistrée (mode démo — configurez RESEND_API_KEY pour activer l\'email)',
      })
    }

    const resend = new Resend(apiKey)
    const targetEmail = process.env.AUTO_ECOLE_EMAIL || AUTO_ECOLE_EMAIL

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [targetEmail],
      replyTo: email,
      subject: `Nouvelle inscription — ${prenom} ${nom}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a2e22;">
          <div style="background: #2d6a4f; color: white; padding: 28px 24px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em;">Nouvelle demande d'inscription</h1>
            <p style="margin: 6px 0 0; opacity: 0.85; font-size: 14px;">Auto-école Mortier · Paris 20ème</p>
          </div>

          <div style="padding: 28px 24px; background: #f7f9f5;">
            <h2 style="color: #2d6a4f; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Informations du candidat</h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #1a2e22; width: 40%;">Nom complet</td>
                <td style="padding: 10px 0; color: #4a5a52;">${prenom} ${nom}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #1a2e22;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2d6a4f; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #1a2e22;">Téléphone</td>
                <td style="padding: 10px 0;"><a href="tel:${telephone}" style="color: #2d6a4f; text-decoration: none;">${telephone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #1a2e22;">Formation souhaitée</td>
                <td style="padding: 10px 0; color: #4a5a52;">${formation || 'Non spécifiée'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #1a2e22;">Mode de contact préféré</td>
                <td style="padding: 10px 0; color: #4a5a52;">${modeContact || 'Non spécifié'}</td>
              </tr>
            </table>

            ${message ? `
              <div style="margin-top: 24px; padding: 16px; background: white; border-left: 3px solid #2d6a4f; border-radius: 4px;">
                <p style="margin: 0 0 6px; font-weight: 600; color: #1a2e22; font-size: 13px;">Message du candidat</p>
                <p style="margin: 0; color: #4a5a52; font-size: 14px; line-height: 1.5;">${message}</p>
              </div>
            ` : ''}
          </div>

          <div style="padding: 20px 24px; background: #1a2e22; color: #b5c4bb; text-align: center; font-size: 13px;">
            Répondez directement à cet email pour contacter ${prenom}.
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: targetEmail,
      subject: 'Auto-école Mortier — Votre demande d\'inscription est bien reçue',
      html: `
        <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a2e22;">
          <div style="background: #2d6a4f; color: white; padding: 28px 24px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Auto-école Mortier</h1>
            <p style="margin: 6px 0 0; opacity: 0.85; font-size: 14px;">Paris 20ème — Note 5.0/5</p>
          </div>

          <div style="padding: 28px 24px; background: #f7f9f5;">
            <h2 style="color: #1a2e22; margin: 0 0 12px; font-size: 20px;">Bonjour ${prenom},</h2>

            <p style="color: #4a5a52; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              Votre demande d'inscription a bien été reçue. <strong style="color: #1a2e22;">Oumy</strong>, notre conseillère, vous recontactera très rapidement.
            </p>

            <div style="background: white; border: 1px solid #dde5dc; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
              <h3 style="margin: 0 0 8px; color: #2d6a4f; font-size: 16px;">Réponse sous 2h en moyenne</h3>
              <p style="margin: 0; color: #4a5a52; font-size: 14px;">Nous vous rappelons au <strong style="color: #1a2e22;">${telephone}</strong></p>
            </div>

            <h3 style="color: #1a2e22; font-size: 15px; margin: 24px 0 10px;">Nos coordonnées</h3>
            <ul style="color: #4a5a52; line-height: 1.7; padding-left: 20px; font-size: 14px;">
              <li><strong style="color: #1a2e22;">Adresse :</strong> 127 boulevard Mortier, 75020 Paris</li>
              <li><strong style="color: #1a2e22;">Téléphone :</strong> <a href="tel:0182833126" style="color: #2d6a4f; text-decoration: none;">01 82 83 31 26</a></li>
              <li><strong style="color: #1a2e22;">Email :</strong> <a href="mailto:autoecolemortier@gmail.com" style="color: #2d6a4f; text-decoration: none;">autoecolemortier@gmail.com</a></li>
              <li><strong style="color: #1a2e22;">Tram :</strong> T3b arrêt « Porte de Bagnolet » (devant la porte)</li>
              <li><strong style="color: #1a2e22;">Horaires :</strong> Mar-Ven 10h-14h / 16h-19h, Sam 10h-14h</li>
            </ul>

            <h3 style="color: #1a2e22; font-size: 15px; margin: 24px 0 10px;">Préparez votre dossier</h3>
            <p style="color: #4a5a52; font-size: 14px; margin: 0 0 8px;">En attendant notre appel, vous pouvez préparer :</p>
            <ul style="color: #4a5a52; line-height: 1.7; padding-left: 20px; font-size: 14px;">
              <li>Pièce d'identité</li>
              <li>Justificatif de domicile de moins de 6 mois</li>
              <li>Deux photos d'identité</li>
              <li>Si financement CPF : numéro de sécurité sociale</li>
            </ul>
          </div>

          <div style="padding: 20px 24px; background: #1a2e22; color: #b5c4bb; text-align: center; font-size: 13px; line-height: 1.5;">
            Auto-école la mieux notée du 20ème · Note 5.0/5 sur 32 avis vérifiés
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription envoyée avec succès',
    })

  } catch (error) {
    console.error('Erreur envoi inscription:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors de l\'envoi de l\'inscription',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    )
  }
}
