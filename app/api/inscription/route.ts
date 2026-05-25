import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
      modeContact 
    } = body

    // Validation basique
    if (!nom || !prenom || !email || !telephone) {
      return NextResponse.json(
        { error: 'Les champs nom, prénom, email et téléphone sont obligatoires' },
        { status: 400 }
      )
    }

    // Vérifier la clé API Resend
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === 're_xxxxxxxxxxxxxxxxxxxxxxxxxx') {
      console.log('📧 Inscription reçue (mode démo) :', { nom, prenom, email, telephone, formation })
      return NextResponse.json({ 
        success: true, 
        message: 'Inscription enregistrée (mode démo - configurez RESEND_API_KEY pour activer l\'email)' 
      })
    }

    const resend = new Resend(apiKey)

    // Email vers l'auto-école
    const emailToAutoEcole = await resend.emails.send({
      from: 'noreply@autoecole-mortier.vercel.app',
      to: [process.env.AUTO_ECOLE_EMAIL || 'autoecolemortier@gmail.com'],
      subject: `🚗 Nouvelle inscription — ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c0451e; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Nouvelle demande d'inscription</h1>
          </div>
          
          <div style="padding: 30px; background: #faf9f6;">
            <h2 style="color: #c0451e; margin-top: 0;">Informations du candidat</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">Nom complet :</td>
                <td style="padding: 8px 0;">${prenom} ${nom}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">Email :</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">Téléphone :</td>
                <td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">Formation souhaitée :</td>
                <td style="padding: 8px 0;">${formation || 'Non spécifiée'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">Mode de contact préféré :</td>
                <td style="padding: 8px 0;">${modeContact || 'Non spécifié'}</td>
              </tr>
            </table>
            
            ${message ? `
              <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #c0451e;">
                <strong style="color: #1c1917;">Message :</strong><br>
                <em style="color: #57534e;">${message}</em>
              </div>
            ` : ''}
          </div>
          
          <div style="padding: 20px; background: #1a1814; color: white; text-align: center;">
            <p style="margin: 0;">📞 Répondre rapidement pour maximiser les conversions !</p>
          </div>
        </div>
      `,
    })

    // Email de confirmation au candidat
    const emailToCandidat = await resend.emails.send({
      from: 'noreply@autoecole-mortier.vercel.app',
      to: [email],
      subject: `✅ Auto-école Mortier — Votre demande d'inscription est bien reçue`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c0451e; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Auto-école Mortier</h1>
            <p style="margin: 5px 0 0;">Paris 20ème — Note 5.0/5</p>
          </div>
          
          <div style="padding: 30px; background: #faf9f6;">
            <h2 style="color: #1c1917; margin-top: 0;">Bonjour ${prenom} !</h2>
            
            <p>Votre demande d'inscription a bien été reçue. <strong>Oumy</strong>, notre conseillère, va vous recontacter très rapidement.</p>
            
            <div style="background: white; border: 2px solid #c0451e; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
              <h3 style="margin: 0 0 10px; color: #c0451e;">⏰ Réponse sous 2h en moyenne</h3>
              <p style="margin: 0; color: #57534e;">Nous vous rappelons au <strong>${telephone}</strong></p>
            </div>
            
            <h3 style="color: #1c1917;">📍 Nos coordonnées</h3>
            <ul style="color: #57534e; line-height: 1.6;">
              <li><strong>Adresse :</strong> 127 boulevard Mortier, 75020 Paris</li>
              <li><strong>Téléphone :</strong> <a href="tel:0182833126">01 82 83 31 26</a></li>
              <li><strong>Tram :</strong> T3b arrêt "Porte de Bagnolet" (devant la porte)</li>
              <li><strong>Horaires :</strong> Mar-Ven 10h-14h/16h-19h, Sam 10h-14h</li>
            </ul>
            
            <h3 style="color: #1c1917;">✅ Préparez votre dossier</h3>
            <p style="color: #57534e;">En attendant notre appel, vous pouvez préparer :</p>
            <ul style="color: #57534e; line-height: 1.6;">
              <li>Pièce d'identité</li>
              <li>Justificatif de domicile (moins de 6 mois)</li>
              <li>2 photos d'identité</li>
              <li>Si CPF : numéro de sécurité sociale</li>
            </ul>
          </div>
          
          <div style="padding: 20px; background: #1a1814; color: white; text-align: center;">
            <p style="margin: 0;">🏆 <strong>Auto-école la mieux notée du 20ème</strong> — Note 5.0/5 sur 26 avis vérifiés</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Inscription envoyée avec succès' 
    })

  } catch (error) {
    console.error('Erreur envoi inscription:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi de l\'inscription',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}