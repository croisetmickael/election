# 🔐 GUIDE D'INTÉGRATION - VÉRIFICATION SA80_1880 VIA GOOGLE SHEET

## ✅ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION WEB (index.html)                  │
│                                                                  │
│  1. Utilisateur entre : IP + Nom + Prénom                       │
│  2. Click "Soumettre" → fetch() vers Google Apps Script         │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ POST/GET avec IP + Nom + Prénom
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│         GOOGLE APPS SCRIPT (doPost / doGet)                     │
│                                                                  │
│  Reçoit : IP + Nom + Prénom                                     │
│  Cherche dans le Sheet "Résultats"                              │
│  Structure ligne : [Timestamp|Collège|Prénom|Nom|IP|...]       │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ Retourne JSON : { found: true/false }
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│              APPLICATION WEB (gestion réponse)                   │
│                                                                  │
│  Si found = true  → Affiche sondage                             │
│  Si found = false → Message d'erreur "Accès refusé"             │
│  Enregistre réponse → Google Sheet                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 ÉTAPES D'INTÉGRATION

### ÉTAPE 1️⃣ : Déployer le Google Apps Script

1. **Ouvrir le Google Sheet**
   - Lien : https://docs.google.com/spreadsheets/d/17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q/edit

2. **Ajouter le code**
   - Menu : **Extensions** > **Apps Script**
   - Effacer le code par défaut
   - Coller le contenu du fichier : `GOOGLE-APPS-SCRIPT-VERIFICATION-SA80_1880.gs`
   - **Ctrl+S** pour sauvegarder

3. **Déployer le script**
   - Bouton **Deploy** (haut à droite)
   - Sélectionner **New deployment**
   - Type : **Web app**
   - Exécuter en tant que : `ton-email@gmail.com`
   - Accès : **Anyone**
   - Click **Deploy**
   - ✅ Copier l'URL générée (ex: `https://script.google.com/macros/d/...`)

4. **Tester le déploiement**
   - Menu **Run** > `testSA80_1880Verification()`
   - Vérifier console (Ctrl+Shift+I) pour les logs

---

### ÉTAPE 2️⃣ : Configurer l'URL dans index.html

1. **Ouvrir `index.html`**

2. **Trouver la ligne de configuration (environ ligne 50)**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
   ```

3. **Remplacer par votre URL**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/VOTRE_ID/usercontent";
   ```
   ⚠️ **Important** : Utiliser `/usercontent` à la fin (pas `/usercode`)

4. **Sauvegarder**

---

### ÉTAPE 3️⃣ : Ajouter les fichiers JavaScript

1. **Dans `index.html`, ajouter avant `</body>` :**
   ```html
   <!-- Vérification SA80_1880 via Google Sheet -->
   <script src="VERIFICATION-SA80_1880-SHEET.js"></script>
   ```

2. **Copier les fichiers dans le même dossier que `index.html`**
   ```
   /projet
   ├── index.html
   ├── VERIFICATION-SA80_1880-SHEET.js  ← À ajouter
   └── ...
   ```

---

### ÉTAPE 4️⃣ : Intégrer la vérification dans le submitSurvey()

1. **Ouvrir `index.html`**

2. **Trouver la fonction `submitSurvey()` (environ ligne 1300)**

3. **Ajouter cette vérification AU DÉBUT de la fonction**
   ```javascript
   async function submitSurvey() {
     const ip = app.userIP;
     const firstName = app.userName;
     const lastName = app.userLastName;
     const priorities = app.selectedPriorities;
     
     // ✅ VÉRIFICATION SA80_1880 VIA GOOGLE SHEET
     console.log("🔐 Début vérification SA80_1880...");
     
     const verification = await checkBeforeSA80_1880Submit(ip, firstName, lastName);
     
     if (!verification.verified || !verification.canSubmit) {
       showError("❌ Vérification échouée - Utilisateur non autorisé (code SA80_1880)");
       return;
     }
     
     console.log("✅ Vérification SA80_1880 réussie");
     
     // ✅ ENREGISTRER LA RÉPONSE DANS LE SHEET
     const record = await recordSA80_1880ToSheet(ip, firstName, lastName, priorities);
     
     if (!record.success) {
       showError("❌ Erreur lors de l'enregistrement");
       return;
     }
     
     // ✅ AFFICHER LE SUCCÈS
     showSuccess("✅ Réponse enregistrée avec succès");
     
     // Rediriger après succès
     setTimeout(() => {
       window.location.hash = "#identity";
     }, 2000);
   }
   ```

4. **Sauvegarder**

---

## 🧪 TESTS

### Test 1️⃣ : Vérifier le Google Apps Script

```javascript
// Dans la console Apps Script (Extensions > Apps Script > Exécuter)
testSA80_1880Verification();
```

**Résultat attendu :**
```
🧪 TEST VÉRIFICATION SA80_1880

Test 1 : Utilisateur inexistant
Résultat : { success: true, found: false, message: "Utilisateur non trouvé" }

Test 2 : Enregistrer une réponse
Résultat : { success: true, message: "Réponse SA80_1880 enregistrée", ... }

✅ Tests complétés
```

### Test 2️⃣ : Vérifier depuis le navigateur

1. **Ouvrir l'application** : http://localhost:8000
2. **Ouvrir la console** : F12
3. **Saisir dans la console**
   ```javascript
   checkBeforeSA80_1880Submit("192.168.1.1", "Jean", "Dupont");
   ```
4. **Vérifier la réponse** :
   - ✅ `{ verified: true, canSubmit: true }` → OK
   - ❌ `{ verified: false, canSubmit: false, error: "Utilisateur non trouvé" }` → KO

### Test 3️⃣ : Ajouter des données de test

1. **Ouvrir le Google Sheet**
2. **Aller à la feuille "Résultats"**
3. **Ajouter une ligne de test**
   ```
   2026-10-07T10:00:00Z | Collège SA80_1880 | Marie | Dupont | 192.168.1.1 | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6
   ```
4. **Dans la console du navigateur**
   ```javascript
   checkBeforeSA80_1880Submit("192.168.1.1", "Marie", "Dupont");
   ```
   → Doit retourner `{ verified: true, canSubmit: true }`

---

## 📊 STRUCTURE GOOGLE SHEET

**Feuille "Résultats" (où on cherche les données)**

| Timestamp | Collège | Prénom | Nom | IP | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|---|
| `2026-10-07T...` | `Collège SA80_1880` | `Marie` | `Dupont` | `192.168.1.1` | `Prio 1` | `Prio 2` | `Prio 3` | `Prio 4` | `Prio 5` | `Prio 6` |

---

## 🔧 CONFIGURATION AVANCÉE

### Option 1️⃣ : Whitelist IP + Nom + Prénom

Si tu veux pré-autoriser certains utilisateurs, ajoute-les manuellement au Google Sheet avec la structure ci-dessus.

### Option 2️⃣ : Autoriser modifications (1x)

Actuel : Bloqué à la 2e modification
Pour l'autoriser : Modifier la fonction `checkBeforeSA80_1880Submit()` pour retirer le flag de modification.

### Option 3️⃣ : Audit & Logging

Le Google Apps Script enregistre **tous les appels** dans la console Apps Script. Accès :
- **Extensions** > **Apps Script** > **Execution log**

---

## 🚨 TROUBLESHOOTING

### ❌ "URL non configurée"
**Solution** : Remplacer `YOUR_GOOGLE_APPS_SCRIPT_URL` dans `VERIFICATION-SA80_1880-SHEET.js`

### ❌ "Feuille 'Résultats' non trouvée"
**Solution** : S'assurer que la feuille existe dans le Google Sheet (créer avec `createAllSheets()`)

### ❌ CORS Error
**Solution** : Utiliser `mode: 'no-cors'` dans la requête fetch (déjà configuré)

### ❌ Vérification toujours échouée
**Solution** :
1. Vérifier l'IP dans le navigateur : `console.log(app.userIP)`
2. Vérifier que les noms matchent exactement (majuscules/minuscules)
3. Tester manuellement : `checkBeforeSA80_1880Submit("IP", "Prénom", "Nom")`

---

## 📝 CHECKLIST FINAL

- [ ] Google Apps Script déployé
- [ ] URL copiée et configurée dans index.html
- [ ] Fichier `VERIFICATION-SA80_1880-SHEET.js` ajouté
- [ ] Fonction `submitSurvey()` modifiée
- [ ] Test 1️⃣ : Google Apps Script ✅
- [ ] Test 2️⃣ : Navigateur ✅
- [ ] Test 3️⃣ : Avec données réelles ✅
- [ ] Déploiement Vercel / production ✅

---

## 🎯 RÉSUMÉ

**Avant** : SA80_1880 stocké en localStorage (pas sécurisé)
**Après** : Vérification **IP + Nom + Prénom** dans Google Sheet (✅ sécurisé)

**Flux sécurisé :**
```
Utilisateur → Envoie IP + Nom + Prénom → Google Apps Script
                                            ↓
                                     Cherche dans Sheet
                                            ↓
                                    Retourne OK/KO
                                            ↓
                                    Enregistre réponse
```
