# 🧪 Guide de test IP, VPN et anti-doublon

**Comment tester la détection IP, VPN et l'anti-doublon avant déploiement.**

---

## 🚀 Test local

### Lancer l'app en local

**Avec Python 3 :**
```bash
cd /chemin/vers/sondage-spp-pats
python3 -m http.server 8000
```

**Avec Node.js :**
```bash
# Si vous avez Node installé
npx http-server
```

**Puis ouvrir :**
```
http://localhost:8000
```

---

## 🔍 Test 1 : Récupération IP

### Vérifier que l'IP est récupérée

**Étapes :**

1. Ouvrir l'app
2. Ouvrir la console (F12 → Console)
3. Exécuter :
   ```javascript
   console.log(app.userIP);
   ```

**Résultat attendu :**
```
"192.168.1.100"  // ou votre IP réelle
```

### Debug IP

**Si vous obtenez "unknown" :**

```javascript
// Vérifier l'erreur réseau
fetch('https://ipapi.co/json/')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error('Erreur IP:', e))
```

**Causes possibles :**
```
❌ Bloqueur de publicités (désactiver pour test)
❌ VPN actif (désactiver pour test)
❌ Pare-feu strict
❌ Pas de connexion internet
❌ Proxy d'entreprise
```

---

## 🛡️ Test 2 : Détection VPN

### Tester la détection VPN

**Si vous n'avez pas de VPN réel :**

1. **Editer la détection en local** (pour test uniquement)
   
   Ouvrir console (F12) et exécuter :
   ```javascript
   // Simuler un VPN
   app.isVPN = true;
   console.log('VPN simulé:', app.isVPN);
   ```

2. **Essayer de voter**
   - Cliquer sur un collège
   - Sélectionner 6 priorités
   - Cliquer "Valider"
   
   **Résultat attendu :**
   ```
   ❌ "L'utilisation d'un VPN a été détectée. 
      Vous ne pouvez pas voter avec un VPN."
   ```

### Test réel avec VPN

**Si vous avez un VPN (NordVPN, ExpressVPN, etc.) :**

1. **Activer le VPN**
2. **Actualiser la page** (Ctrl+R)
3. **Vérifier dans console :**
   ```javascript
   app.isVPN  // doit être true
   ```

4. **Essayer de voter**
   - Doit être rejeté avec message d'erreur

### Vérifier les données API VPN

```javascript
// Voir la réponse complète de l'API
fetch('https://ipapi.co/json/')
  .then(r => r.json())
  .then(d => {
    console.log('IP:', d.ip);
    console.log('VPN:', d.is_vpn);
    console.log('Proxy:', d.is_proxy);
    console.log('Datacenter:', d.is_datacenter);
  })
```

---

## 📝 Test 3 : Anti-doublon (IP unique)

### Tester le premier vote

**Étapes :**

1. **Ouvrir l'app** : http://localhost:8000
2. **Accepter RGPD**
3. **Voter** pour un collège
4. **Vérifier localStorage** (F12 → Application → localStorage)
   ```
   ipVotes: {"192.168.1.100": true}
   ```

### Tester le deuxième vote

**Étapes :**

1. **Retourner aux collèges** (bouton arrière)
2. **Essayer de voter à nouveau**

**Résultat attendu :**
```
⚠️ Alerte
"Cette adresse IP a déjà participé. 
Vous ne pouvez pas voter une autre fois."
```

### Forcer un doublon (test)

**Pour tester manuellement :**

```javascript
// Simuler qu'une IP a déjà voté
const ipVotes = JSON.parse(localStorage.getItem('ipVotes') || '{}');
ipVotes['192.168.1.100'] = true;
localStorage.setItem('ipVotes', JSON.stringify(ipVotes));

// Actualiser la page et essayer de voter
```

---

## 🔐 Test 4 : RGPD et consentement

### Test modale RGPD

**Étapes :**

1. **Vider localStorage**
   ```javascript
   localStorage.clear();
   ```

2. **Actualiser la page**

**Résultat attendu :**
```
┌─────────────────────────────────┐
│ Modale RGPD affichée            │
│ Case "J'accepte" décochée       │
│ Bouton "Accepter" désactivé     │
└─────────────────────────────────┘
```

### Test workflow RGPD

1. **Ne pas cocher** → Bouton grisé
2. **Cocher la case** → Bouton devient actif
3. **Cliquer "Accepter"** → Modale ferme, collèges affichés
4. **Actualiser page** → Modale ne réapparaît plus

**localStorage devrait contenir :**
```
rgpdAccepted: "true"
```

---

## 📊 Test 5 : Données sauvegardées

### Vérifier localStorage après vote

**Ouvrir console :**
```javascript
// Voir tous les résultats
JSON.parse(localStorage.getItem('sondageResults'))
```

**Résultat attendu :**
```json
[
  {
    "college": "Collège Officiers",
    "timestamp": "07/10/2026 14:30:45",
    "ip": "192.168.1.100",
    "priorities": [
      "Adéquation Grade / Emploi",
      "Missions transverses",
      "Régime SHR",
      "Tuilage mobilités",
      "Postes d'adjoints",
      "Cohésion équipe"
    ]
  }
]
```

### Vérifier IPs ayant voté

```javascript
// Voir les IPs qui ont voté
JSON.parse(localStorage.getItem('ipVotes'))
```

**Résultat attendu :**
```json
{
  "192.168.1.100": true,
  "192.168.1.101": true
}
```

---

## 🧪 Test 6 : Intégration Google Sheets

### Configuration de test

1. **Créer un Google Apps Script test**
   - Aller sur https://script.google.com
   - Nouveau projet
   - Copier le code du fichier `google-apps-script.js`
   - Déployer comme "Application Web"
   - Copier l'URL

2. **Configurer dans l'app**
   ```javascript
   // Dans index.html, trouver :
   const GOOGLE_APPS_SCRIPT_URL = '';
   
   // Remplacer par :
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/[ID]/usercontent';
   ```

3. **Tester un vote**
   - Voter normalement
   - Regarder le Google Sheet
   - Le vote doit s'afficher

### Vérifier Google Sheets

**Dans le Google Sheet associé :**

Feuille "Résultats" avec colonnes :
```
| Timestamp      | IP          | Collège    | Pri 1        | Pri 2     |
|------------|-------------|----------|-----------|----------|
| 07/10 14:30 | 192.1.1.100 | Officiers | Adéq Grade | Protect SHR |
```

---

## 🔒 Test 7 : Sécurité HTTPS

### En production (Vercel)

**Vérifier HTTPS :**

1. Aller sur votre URL Vercel
2. Cliquer le 🔒 dans la barre URL
3. "Certificat valide"
4. "Connexion sécurisée"

### En local (HTTP)

```
⚠️ Pas de HTTPS en local
✓ C'est normal pour développement
✓ Sera sécurisé en production (Vercel)
```

---

## 📈 Test 8 : Performance

### Temps de chargement

**Vérifier la performance :**

1. Ouvrir DevTools (F12)
2. Onglet "Réseau"
3. Actualiser la page
4. Observer le temps de chargement

**Attendus :**
```
HTML : < 200ms
CSS/JS : < 100ms
API IP : 200-500ms (dépend de votre réseau)
Total : < 1s
```

### Détection VPN lente

Si `app.isVPN` prend du temps :
```javascript
// Mesurer le temps d'API
console.time('fetchIP');
app.fetchUserIP().then(() => {
  console.timeEnd('fetchIP');
  console.log('Temps écoulé:', app.userIP);
});
```

---

## 🐛 Test 9 : Gestion erreurs

### Test API IP indisponible

**Simuler une erreur réseau :**

```javascript
// Dans console, remplacer la fonction
app.fetchUserIP = async () => {
  throw new Error('Erreur réseau test');
}

// Actualiser la page
```

**Résultat attendu :**
```
✓ App continue à fonctionner
✓ userIP = "unknown"
✓ Vote fonctionnera quand même
```

### Test localStorage indisponible

```javascript
// Désactiver localStorage
Object.defineProperty(window, 'localStorage', { value: null });

// Voter
```

**Résultat attendu :**
```
⚠️ Message dans console
✓ Google Sheets marchera quand même
```

---

## 📋 Checklist de test complet

### ✅ Avant lancement en production

- [ ] **IP**
  - [ ] IP correcte affichée
  - [ ] API ipapi.co fonctionne
  - [ ] Même IP refuse 2e vote

- [ ] **VPN**
  - [ ] VPN détecté avec VPN actif
  - [ ] VPN rejeté avec message
  - [ ] Message clair et explicite

- [ ] **RGPD**
  - [ ] Modale RGPD au premier lancement
  - [ ] Case à cocher obligatoire
  - [ ] Bouton accepter grisé sans consentement
  - [ ] localStorage `rgpdAccepted` après acceptation
  - [ ] Modale ne réapparaît pas après acceptation

- [ ] **Données**
  - [ ] localStorage contient les votes
  - [ ] IP enregistrée avec les votes
  - [ ] Timestamp correct
  - [ ] Priorités correctes

- [ ] **Google Sheets** (si configuré)
  - [ ] URL Google Apps Script valide
  - [ ] Données envoyées après vote
  - [ ] Aucune erreur CORS
  - [ ] Feuille "Résultats" a les bonnes colonnes

- [ ] **UX**
  - [ ] Modale RGPD jolie et lisible
  - [ ] Messages d'erreur clairs
  - [ ] Succès bien affiché
  - [ ] Pas de console errors

- [ ] **Sécurité**
  - [ ] HTTPS en production
  - [ ] Pas de données sensibles en localStorage clair
  - [ ] API IP sécurisée (HTTPS)
  - [ ] Google Sheets authentifiée

- [ ] **Performance**
  - [ ] Chargement < 2s
  - [ ] API IP répond < 500ms
  - [ ] Pas de lag au vote
  - [ ] Pas de memory leak

---

## 🔧 Troubleshooting

### L'app ne se charge pas

**Vérifier :**
```bash
# Vérifier le port
netstat -an | grep 8000

# Relancer le serveur
python3 -m http.server 8000
```

### IP récupérée = "unknown"

```javascript
// Vérifier l'erreur
app.fetchUserIP()
  .then(() => console.log('IP:', app.userIP))
  .catch(e => console.error('Erreur:', e))
```

**Solutions :**
```
✓ Désactiver bloqueur de publicités
✓ Vérifier connexion internet
✓ Attendre quelques secondes
✓ Actualiser la page
✓ Essayer en incognito
```

### VPN non détecté

```javascript
// Forcer VPN pour test
app.isVPN = true;
```

**Note :**
```
La détection VPN n'est pas 100% précise
ipapi.co détecte ~95% des VPN commerciaux
Certains VPN premium peuvent passer
```

### Doublon accepté par erreur

```javascript
// Vérifier ipVotes
localStorage.getItem('ipVotes')

// Réinitialiser pour test
localStorage.removeItem('ipVotes');
```

### Google Sheets ne reçoit pas les données

```
1. Vérifier l'URL Google Apps Script
2. Vérifier que Apps Script est en "Application Web"
3. Vérifier que l'accès est "N'importe qui"
4. Vérifier la feuille s'appelle "Résultats"
5. Ouvrir DevTools → Réseau pour voir l'erreur CORS
```

---

## 📊 Rapports de test

### Modèle de rapport

```
DATE DE TEST : 07/10/2026
TESTEUR : [Votre nom]
NAVIGATEUR : Chrome 120 (PC Windows)

TESTS EFFECTUÉS :
✓ Récupération IP
✓ Détection VPN
✓ Anti-doublon
✓ RGPD et consentement
✓ Sauvegarde localStorage
✓ Google Sheets intégration
✓ Performance

RÉSULTATS :
- 6/7 tests passés
- 1 lenteur détectée (API IP prend 800ms)

RECOMMANDATIONS :
- Ajouter cache pour IP
- Tester avec plus d'utilisateurs

STATUS : ✅ PRÊT POUR PRODUCTION
```

---

## ✅ Prêt pour déploiement ?

**Checklist finale :**

- [ ] Tous les tests passent
- [ ] Aucun erreur console (F12)
- [ ] Google Sheets fonctionne
- [ ] RGPD affiché correctement
- [ ] Messages d'erreur en français
- [ ] Performance acceptable
- [ ] URL Vercel HTTPS valide
- [ ] Repository GitHub créé
- [ ] Lien de production partagé avec syndicat

---

**Une fois tous les tests passés, l'app est prête ! 🎉**
