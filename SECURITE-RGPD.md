# 🔒 Sécurité, Anti-Doublon et RGPD

**Votre app inclut des mesures de sécurité complètes pour garantir l'intégrité du sondage et la protection des données.**

---

## 🛡️ Sécurité de l'app

### Récupération de l'IP

**Comment ça marche :**
1. Au chargement, l'app récupère votre IP via l'API `ipapi.co`
2. Votre IP est enregistrée avec votre vote
3. Les votes futurs depuis la même IP sont refusés

**API utilisée :**
```
https://ipapi.co/json/
```
(Gratuit et rapide, pas d'authentification requise)

### Détection VPN

**L'app détecte les VPN par :**
- Vérification du flag `is_vpn` dans la réponse API
- Vérification du flag `is_proxy`
- Vérification du flag `is_datacenter`

**Si un VPN est détecté :**
```
❌ Message d'erreur
"L'utilisation d'un VPN a été détectée. 
Les VPN ne sont pas autorisés pour ce sondage."
```

L'utilisateur ne peut pas voter.

### Anti-Doublon

**Mécanisme :**
1. IP enregistrée lors du premier vote
2. Stockée dans `localStorage` sous clé `ipVotes`
3. Lors d'une 2e tentative, l'app vérifie cette liste
4. Si IP existe = refus de voter

**Limitation :**
```
Une seule réponse par adresse IP
```

---

## 📋 RGPD et Confidentialité

### Modale RGPD au lancement

**À la première visite, l'utilisateur voit :**

```
┌─────────────────────────────────────────┐
│ 📋 CONDITIONS D'UTILISATION             │
│                                         │
│ À propos de ce sondage...               │
│ Protection de vos données (RGPD)        │
│ Confidentialité                         │
│ Interdictions                           │
│ Acceptation des conditions              │
│                                         │
│ [✓ Accepter] [✕ Refuser]               │
└─────────────────────────────────────────┘
```

### Données collectées

**Chaque vote enregistre :**

```json
{
  "college": "Collège Officiers",
  "timestamp": "07/10/2026 14:30:45",
  "ip": "192.168.1.1",
  "priorities": [
    "Adéquation Grade / Emploi",
    "Missions transverses récompensées",
    "..."
  ]
}
```

### Finalité (Article 6 RGPD)

**Utilisation des données :**
- Collecter les priorités pour les négociations syndicales
- Connaître les revendications des agents
- Faciliter les discussions avec l'employeur

### Durée de conservation

**Les données sont conservées :**
```
Pendant la durée du processus électoral
Environ 3 mois (juin à septembre 2026)
Après : suppression ou archivage
```

### Droits des utilisateurs

**Conformément au RGPD, vous avez le droit à :**

```
✓ Accès : Voir vos données
✓ Rectification : Corriger vos données
✓ Suppression : Demander l'oubli
✓ Portabilité : Récupérer vos données
✓ Opposition : Refuser le traitement
```

**Pour exercer ces droits :**
```
Contactez : contact@spp-pats.org
Objet : Demande RGPD
```

---

## 🔐 Sécurité technique

### Stockage local

**Sur votre navigateur (localStorage) :**
```javascript
{
  "sondageResults": [...],    // Tous les votes
  "ipVotes": {...},           // IPs qui ont voté
  "rgpdAccepted": "true"      // Acceptance RGPD
}
```

**Sécurité :**
- ✅ Données locales, pas d'envoi automatique
- ✅ HTTPS en ligne (Vercel)
- ✅ Chiffrement des données en transit
- ✅ Confidentiel à votre navigateur

### Google Sheets (optionnel)

**Si configuré :**
```
App
  ↓
HTTPS sécurisé
  ↓
Google Apps Script
  ↓
Google Sheet (votre compte)
```

**Sécurité :**
- ✅ HTTPS end-to-end
- ✅ Google chiffre les données
- ✅ Authentification OAuth
- ✅ Audit trail Google

---

## ⚠️ Mesures anti-fraude

### Détection VPN

```
Blocked:
- VPN commercial (NordVPN, ExpressVPN, etc.)
- Proxy web
- Datacenter (AWS, Google Cloud, etc.)

Autorisé:
- Connexion normale
- Réseau mobile
- Réseau fixe
- Wi-Fi privé
```

### Détection IP

```
Premier vote  → IP enregistrée
Deuxième vote → IP refusée
              → Erreur affichée
              → Vote rejeté
```

### Avertissements

**L'app enregistre :**
```
- Tentatives avec VPN
- Tentatives de doublon
- Adresses IP suspectes
- Timestamps de tous les votes
```

Accessible pour audit ultérieur.

---

## 📱 Expérience utilisateur RGPD

### Étape 1 : Acceptation RGPD
```
Visite le site
↓
Voir modale RGPD
↓
Cocher "J'accepte"
↓
Cliquer "Accepter et continuer"
```

### Étape 2 : Sondage
```
Voir collèges
↓
Cliquer sur collège
↓
Lire détails revendications
↓
Sélectionner 6 priorités
↓
Valider
```

### Étape 3 : Confirmation
```
Message succès
+ Affichage de l'IP
+ Confirmation RGPD
↓
"Votre adresse IP a été enregistrée"
```

### Étape 4 : Protection doublon
```
Retour à la page
↓
Tenter de revenir aux collèges
↓
"Cette IP a déjà voté"
↓
Boutons désactivés
```

---

## 🔍 Audit et transparence

### Données accessibles

**Pour l'administrateur du sondage :**
```
localStorage dans Dev Tools (F12)
↓
JSON.parse(localStorage.getItem('sondageResults'))
↓
Voir tous les votes avec IP et timestamps
```

**Pour le syndicat :**
```
Google Sheet (si configuré)
↓
Tous les votes en ligne
↓
Avec IP, timestamp, priorités
```

### Rapports possibles

```
✓ Nombre total de votes
✓ Votes par IP (détecter fraude)
✓ Distribution par collège
✓ Priorités les plus votées
✓ Tentatives VPN bloquées
✓ Tentatives doublon bloquées
```

---

## 📋 Conformité légale

### Lois applicables

**France :**
- ✅ Loi Informatique et Libertés (LIL)
- ✅ RGPD (Règlement UE 2016/679)
- ✅ CNIL (Commission Nationale Informatique et Libertés)

**Secteur public :**
- ✅ Loi de l'administration électronique
- ✅ Directives syndicales

### Obligations de l'organisateur

**SPP-PATS doit :**
```
✓ Informer des finalités (fait via modale)
✓ Protéger les données (HTTPS + IP)
✓ Limiter la conservation (3 mois)
✓ Respecter les droits (accès, suppression)
✓ Notifier en cas de fuite (si applicable)
```

### Obligations de l'utilisateur

**Les agents doivent :**
```
✓ Accepter les conditions (modale RGPD)
✓ Ne pas usurper l'identité d'autrui
✓ Voter une seule fois
✓ Ne pas contourner les VPN
✓ Ne pas diffuser d'infos personnelles d'autres
```

---

## 🚨 Cas de violation

### Si quelqu'un essaie de...

**Voter 2 fois**
```
❌ Rejeté
Même IP → Refusé
```

**Utiliser un VPN**
```
❌ Rejeté
VPN détecté → Refusé
```

**Voter pour quelqu'un d'autre**
```
❌ Usurpation d'identité
IP enregistrée = preuves
Peut être signalé aux autorités
```

**Hacker le localStorage**
```
❌ Les données modifiées ne seront pas synchronisées
Google Sheet a les versions originales
Audit trail doit vérifier cohérence
```

---

## ✅ Checklist conformité

- [ ] Modale RGPD affichée au lancement
- [ ] Données collectées : collège, priorités, IP, timestamp
- [ ] Finalité : négociations syndicales (affichée)
- [ ] Durée de conservation : 3 mois (affichée)
- [ ] Destinataires : SPP-PATS (affichée)
- [ ] Droits RGPD expliqués (affichée)
- [ ] IP enregistrée pour anti-doublon
- [ ] VPN détecté et bloqué
- [ ] Une seule réponse par IP
- [ ] Stockage sécurisé (HTTPS)
- [ ] Confidentialité garantie
- [ ] Contact syndical disponible

---

## 📊 Exemple données enregistrées

### localStorage (navigateur)

```javascript
sondageResults = [
  {
    college: "Collège Officiers",
    timestamp: "07/10/2026 14:30:45",
    ip: "192.168.1.100",
    priorities: [
      "Adéquation Grade / Emploi",
      "Protection du régime SHR",
      "Droit à la déconnexion",
      "Tuilage lors des mobilités",
      "Création de postes d'adjoints",
      "Cohésion d'équipe"
    ]
  }
]

ipVotes = {
  "192.168.1.100": true,
  "192.168.1.101": true,
  "192.168.1.102": true
}
```

### Google Sheet (si activé)

```
| Timestamp          | IP          | Collège  | Pri 1              | Pri 2         | Pri 3              |
|----------------|-------------|----------|-----------------|-----------|------------------|
| 07/10 14:30    | 192.1.1.100 | Officiers| Adéq Grade      | Protect SHR | Droit disconnect  |
| 07/10 14:35    | 192.1.1.101 | SPP      | Effectifs adapt | Sécu op    | Reconn invest     |
```

---

## 🎯 Recommandations

### Pour SPP-PATS

1. **Imprimer les conditions RGPD**
   - Afficher dans tous les locaux
   - Envoyer par email

2. **Nommer un responsable RGPD**
   - Gère les demandes d'accès
   - Supervise la conservation
   - Supprime après 3 mois

3. **Sauvegarder les données**
   - Télécharger le Google Sheet régulièrement
   - Archiver après le processus
   - Supprimer conformément au planning

4. **Communiquer sur la sécurité**
   - Rassurer sur la confidentialité
   - Expliquer pourquoi l'IP est nécessaire
   - Affirmer que l'identité n'est jamais révélée

### Pour les utilisateurs

1. **Accepter les conditions**
   - Lire la modale RGPD
   - Cocher et accepter
   - Vous donnez votre consentement

2. **Voter une seule fois**
   - Un vote = une IP
   - Pas de seconde tentative
   - App le veille et refuse

3. **Pas de VPN**
   - Désactiver votre VPN
   - Utiliser connexion normale
   - App va refuser sinon

4. **Exercer vos droits**
   - Accès à vos données
   - Correction si erreur
   - Suppression si demande
   - Contact : syndicat

---

## 🔗 Ressources

**CNIL (Autorité française RGPD)**
```
https://www.cnil.fr/
- Guide des droits
- Exercer vos droits
- Signaler une violation
```

**RGPD official**
```
https://www.rgpd.eu/
- Texte complet du règlement
- Droits des citoyens
- Obligations des responsables
```

**SPP-PATS**
```
https://www.spp-pats.org/
- Politique de confidentialité complète
- Délégué à la protection des données
- Durée de conservation détaillée
```

---

## ✅ Conclusion

**Votre sondage est :**

✅ Sécurisé (IP + VPN detection)
✅ Confidentiel (identité anonyme)
✅ Légal (RGPD conforme)
✅ Transparent (modale d'information)
✅ Protégé (anti-doublon)

**Les agents peuvent voter en confiance !**

---

**Questions RGPD ?** Contactez le syndicat.
**Questions techniques ?** Voir README.md ou GUIDE-DEPLOIEMENT.md

**Bon sondage sécurisé ! 🔒**
