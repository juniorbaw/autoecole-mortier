# Configuration Domaine Personnalisé

## 🌐 Étapes pour connecter votre domaine

### 1. **Acheter un domaine** (si pas déjà fait)
Recommandations :
- **autoecole-mortier.fr** (idéal)
- **mortier-permis.fr**
- **autoecole-mortier-paris.fr**

Fournisseurs recommandés : Gandi.net, OVH, Namecheap

### 2. **Configurer sur Vercel**
1. Aller sur : https://vercel.com/souleyjr/autoecole-mortier
2. Cliquer **Domains**
3. Ajouter votre domaine : `autoecole-mortier.fr`
4. Vercel va vous donner les DNS à configurer

### 3. **Configurer les DNS chez votre registrar**
Vercel vous donnera quelque chose comme :

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### 4. **Activer HTTPS automatique**
- Vercel gère automatiquement le certificat SSL
- Redirection HTTP → HTTPS automatique

## 📧 Configuration Email (en cours)

### Variables d'environnement Vercel :
```
RESEND_API_KEY = re_ji5iPN3F_Dt5WfevXSQN2QsSa7cxyy8oa ✅
AUTO_ECOLE_EMAIL = autoecolemortier@gmail.com (à corriger)
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX (à configurer)
```

### Pour corriger l'email :
1. Aller sur https://vercel.com/souleyjr/autoecole-mortier/settings/environment-variables
2. Supprimer l'ancienne variable `AUTO_ECOLE_EMAIL`
3. Ajouter : `AUTO_ECOLE_EMAIL` = `autoecolemortier@gmail.com`

## 📊 Google Analytics
1. Créer une propriété sur https://analytics.google.com
2. Récupérer l'ID de mesure (format : G-XXXXXXXXXX)
3. Remplacer `G-XXXXXXXXXX` dans Vercel par votre vrai ID

## 🚀 Une fois terminé
- Le site sera accessible sur votre domaine
- Emails d'inscription fonctionnels
- Statistiques Google Analytics actives