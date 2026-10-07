# ⚙️ CONFIGURATION FINALE - FAIRE REMONTER LES VOTES

## 🎯 OBJECTIF

Faire en sorte que les votes remontent dans le Google Sheet en temps réel quand les utilisateurs votent.

---

## 📋 FICHIERS PRÊTS

```
✅ index.html                              (V3.2 - Accès libre)
✅ VERIFICATION-SA80_1880-SHEET.js         (Fonction recordSA80_1880ToSheet)
✅ GOOGLE-APPS-SCRIPT-COMPLET.gs           (Script à copier dans Google Apps Script)
✅ INSTALLATION-GOOGLE-APPS-SCRIPT.md      (Guide étape par étape)
```

---

## 🚀 CONFIGURATION RAPIDE (5 MIN)

### Étape 1️⃣ : Ouvrir Google Sheet
```
https://docs.google.com/spreadsheets/d/17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q/edit
```

### Étape 2️⃣ : Créer la feuille "Résultats"
```
Click "+" → Ajouter feuille → "Résultats"

Colonnes :
A: Timestamp
B: Collège
C: Prénom
D: Nom
E: IP
F-K: Pri1-Pri6
```

### Étape 3️⃣ : Ajouter Google Apps Script
1. **Extensions → Apps Script**
2. **Effacer** le code par défaut (myFunction)
3. **Copier-coller** le code de : `GOOGLE-APPS-SCRIPT-COMPLET.gs`
4. **Sauvegarder** (Ctrl+S)

### Étape 4️⃣ : Déployer
1. Click **"Déployer"** (bouton bleu)
2. Click **"Nouveau déploiement"**
3. Sélectionner :
   ```
   Type : Application Web
   Execute as : [Votre compte]
   Who has access : Anyone
   ```
4. Click **"Déployer"**
5. **COPIER l'URL** qui apparaît

### Étape 5️⃣ : Configurer index.html
**Fichier :** `index.html`
**Ligne :** 983

**Avant :**
```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/VOTRE_SCRIPT_ID/usercontent";
```

**Après :** (coller l'URL du déploiement)
```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw.../usercontent";
```

### Étape 6️⃣ : Tester localement
```bash
python3 -m http.server 8000
```

1. Ouvrir http://localhost:8000
2. Accepter RGPD
3. Entrer nom/prénom
4. Choisir collège
5. Sélectionner 6 priorités
6. Click "Voter"
7. ✅ **Vérifier le Google Sheet** → Les données doivent apparaître

---

## 📊 STRUCTURE DES DONNÉES

### Ce qui remonte au Google Sheet

```
| Timestamp | Collège | Prénom | Nom | IP | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|-----------|---------|--------|-----|----|----- |----- |----- |----- |----- |------|
| 7/10 14:30| Officiers| Jean  | Martin|127.0.0.1| Adéq... | Missions... | ... |
```

**Colonnes automatiques :**
- A: Timestamp (date/heure du vote)
- B: Collège (Officiers, SPP, PATS)
- C: Prénom
- D: Nom
- E: IP (pour les doublons)
- F-K: Pri1-Pri6 (les 6 priorités sélectionnées)

---

## 🔧 ARCHITECTURE

### Flux de données

```
App (index.html)
    ↓
submitSurvey()
    ↓
recordSA80_1880ToSheet() [VERIFICATION-SA80_1880-SHEET.js]
    ↓
GOOGLE_APPS_SCRIPT_URL (fetch POST)
    ↓
Google Apps Script (doPost)
    ↓
Google Sheet "Résultats"
    ↓
✅ Données enregistrées
```

### Fichiers en place

1. **index.html** - App principale
   - Inclut VERIFICATION-SA80_1880-SHEET.js
   - Appelle `recordSA80_1880ToSheet()` après vote

2. **VERIFICATION-SA80_1880-SHEET.js** - Fonction client
   - Envoie les données au Google Apps Script via fetch
   - Gère les erreurs
   - Utilise `no-cors` pour éviter les problèmes CORS

3. **GOOGLE-APPS-SCRIPT-COMPLET.gs** - Fonction serveur
   - Reçoit POST du client
   - Ajoute une ligne au Google Sheet
   - Retourne succès/erreur

---

## ⚠️ POINTS CRITIQUES

| Point | Important |
|-------|-----------|
| **Feuille "Résultats"** | DOIT exister avant déploiement |
| **URL Google Apps Script** | DOIT terminer par `/usercontent` |
| **Who has access** | DOIT être "Anyone" (pas private) |
| **Copier l'URL complète** | Ne pas oublier `/usercontent` à la fin |
| **Recharger la page** | Après modification de index.html |

---

## 🧪 VÉRIFIER QUE ÇA FONCTIONNE

### Dans le navigateur (F12 → Console)

**Après avoir voté, vous devriez voir :**
```
🔓 Accès libre activé
📤 Envoi des données au Google Sheet...
📊 Données à envoyer : {ip: "...", firstName: "...", ...}
✅ Réponse du serveur : 200
✅ Réponse enregistrée avec succès dans le Google Sheet
```

### Dans le Google Sheet

**Feuille "Résultats" :**
- Nouvelle ligne avec vos données
- Timestamp, Collège, Prénom, Nom, IP, 6 priorités

---

## 🐛 DÉPANNAGE

### Les données ne remontent pas

**Cause 1 :** Feuille "Résultats" n'existe pas
```
Solution : Créer la feuille "Résultats" dans le Google Sheet
```

**Cause 2 :** URL Google Apps Script pas configurée
```
Solution : Vérifier ligne 983 de index.html
           Doit terminer par /usercontent
           Copier l'URL COMPLÈTE du déploiement
```

**Cause 3 :** Google Apps Script pas déployé
```
Solution : 
1. Extensions → Apps Script
2. Copier le code de GOOGLE-APPS-SCRIPT-COMPLET.gs
3. Sauvegarder
4. Déployer → Nouveau déploiement → Application Web
```

**Cause 4 :** Who has access = Private
```
Solution :
1. Redéployer
2. Changer "Who has access" → "Anyone"
```

### Erreur : "Feuille Résultats introuvable"

```
Dans la console (F12) :
❌ Erreur : Feuille 'Résultats' introuvable

Solution : Créer la feuille "Résultats" dans le Google Sheet
```

### Erreur : "Une erreur s'est produite"

```
Solution :
1. Vérifier que l'URL est correcte (ligne 983)
2. Vérifier que c'est /usercontent pas /exec
3. Recharger la page
4. Tester à nouveau
```

---

## ✅ CHECKLIST FINALE

- [ ] Google Sheet créé (ID: 17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q)
- [ ] Feuille "Résultats" créée
- [ ] Google Apps Script copié
- [ ] Google Apps Script sauvegardé
- [ ] Google Apps Script déployé (New deployment)
- [ ] URL copiée (termine par /usercontent)
- [ ] URL collée dans index.html ligne 983
- [ ] File VERIFICATION-SA80_1880-SHEET.js présent
- [ ] Test local réussi
- [ ] Données visibles dans Google Sheet ✅

---

## 🎉 RÉSUMÉ

**Configuration :** ✅ **COMPLÈTE**

Tout est prêt. Il suffit de :
1. Ajouter Google Apps Script
2. Déployer et copier l'URL
3. Coller l'URL dans index.html ligne 983
4. Tester

Après cela, **tous les votes remonteront automatiquement** au Google Sheet en temps réel.

---

**Modifié :** 7 octobre 2026
**Version :** 1.0 Configuration finale
**Status :** ✅ PRÊT PRODUCTION

