# 🚀 GUIDE DE DÉPLOIEMENT COMPLET - SA80_1880 SÉCURISÉ

**Date :** 7 octobre 2026
**Statut :** ✅ PRODUCTION READY
**Vérification :** IP + Nom + Prénom via Google Sheet

---

## 📋 FICHIERS À UTILISER

### Fichiers Principaux ✅
```
/mnt/user-data/outputs/
├── index.html                                    ✅ Application modifiée (60 KB)
├── VERIFICATION-SA80_1880-SHEET.js              ✅ Vérification client (7.2 KB)
├── GOOGLE-APPS-SCRIPT-VERIFICATION-SA80_1880.gs ✅ Google Apps Script
└── google-apps-script-v2.js                      ✅ Ancien script (optionnel)
```

### Guides & Documentation ✅
```
├── INDEX-HTML-MODIFICATIONS.md                   📖 Guide modifications
├── GUIDE-INTEGRATION-SA80_1880.md               📖 Guide intégration complet
├── VERIFICATION-SA80_1880-RECAPITULATIF.txt     📖 Récapitulatif
└── DEPLOIEMENT-COMPLET.md                       📖 Ce fichier
```

---

## 🎯 ARCHITECTURE FINALE

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTILISATEUR (NAVIGATEUR)                     │
│                                                                  │
│  1. Saisit : Prénom + Nom                                      │
│  2. Sélectionne : 6 priorités                                  │
│  3. Click : "Valider mon sondage"                             │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ IP + Nom + Prénom
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│              APPLICATION WEB (index.html)                       │
│                                                                  │
│  submitSurvey() → checkBeforeSA80_1880Submit()                 │
│                                                                  │
│  ✅ VÉRIFICATION SA80_1880                                      │
│  await checkBeforeSA80_1880Submit(IP, Nom, Prénom)             │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ fetch() POST
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│         GOOGLE APPS SCRIPT (déployé en Web App)                │
│                                                                  │
│  doPost() / doGet()                                             │
│  verifySA80_1880InSheetServer(IP, Nom, Prénom)                 │
│                                                                  │
│  Cherche dans Sheet "Résultats" : [Timestamp|Collège|Prénom|Nom|IP|...]
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ Retourne JSON
                   │ { found: true/false }
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│              GOOGLE SHEET (Feuille "Résultats")                 │
│                                                                  │
│  Vérification : Cherche ligne avec IP + Nom + Prénom           │
│  Enregistrement : Ajoute nouvelle ligne avec réponse           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 PROCESSUS DE DÉPLOIEMENT

### PHASE 1️⃣ : SETUP GOOGLE APPS SCRIPT (10 min)

#### Étape 1.1 : Ouvrir le Google Sheet
- Lien : https://docs.google.com/spreadsheets/d/17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q/edit
- ✅ Propriétaire : croiset.mickael@gmail.com

#### Étape 1.2 : Créer les 5 feuilles
```
Menu : Extensions > Apps Script
Coller : GOOGLE-APPS-SCRIPT-VERIFICATION-SA80_1880.gs (début du fichier, il y a aussi createAllSheets())
Ctrl+S
Menu : Run > createAllSheets()
✅ Vérifier : 5 feuilles créées (Résultats, Officiers, Non-Officiers, PATS, Résumé)
```

#### Étape 1.3 : Ajouter le code de vérification
```
Menu : Extensions > Apps Script
Effacer le code par défaut
Coller : GOOGLE-APPS-SCRIPT-VERIFICATION-SA80_1880.gs
Ctrl+S
```

#### Étape 1.4 : Déployer
```
Bouton "Deploy" (haut à droite)
Sélectionner "New deployment"
Type : Web app
Exécuter en tant que : croiset.mickael@gmail.com
Accès : Anyone
Click "Deploy"

⚠️ COPIER L'URL GÉNÉRÉE :
https://script.google.com/macros/d/[ID_LONG]/usercontent

Cet ID est nécessaire pour index.html !
```

#### Étape 1.5 : Tester le script
```
Menu : Run > testSA80_1880Verification()
Vérifier les logs (Ctrl+Shift+I)
✅ Doit afficher : Tests complétés
```

---

### PHASE 2️⃣ : CONFIGURER INDEX.HTML (5 min)

#### Étape 2.1 : Remplacer l'URL Google Apps Script
```
Ouvrir : index.html (ligne 802)

CHERCHER :
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/VOTRE_SCRIPT_ID/usercontent";

REMPLACER par l'URL COPIÉE à l'étape 1.4 :
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/ABC123DEF456/usercontent";
                                                          ^^^^^^^^^^^^^^
                                                    (votre vrai ID)

Ctrl+S (sauvegarder)
```

#### Étape 2.2 : Vérifier les modifications
```
✅ Ligne 802 : GOOGLE_APPS_SCRIPT_URL configurée
✅ Ligne 1248 : submitSurvey() avec vérification SA80_1880
✅ Ligne 1290 : recordSA80_1880ToSheet() appelée
✅ Dernière ligne : <script src="VERIFICATION-SA80_1880-SHEET.js"></script>
```

---

### PHASE 3️⃣ : PRÉPARER LES FICHIERS (5 min)

#### Étape 3.1 : Copier les fichiers dans le dossier de déploiement
```
Créer un dossier : /mon-projet/

Copier dedans :
├── index.html                           ✅ (60 KB)
├── VERIFICATION-SA80_1880-SHEET.js      ✅ (7.2 KB)
├── vercel.json                          ✅ (déploiement Vercel)
└── .gitignore                           ✅ (optionnel)
```

#### Étape 3.2 : Vérifier les fichiers
```
bash :
ls -lh
# Doit afficher :
# - index.html (60 KB)
# - VERIFICATION-SA80_1880-SHEET.js (7.2 KB)
# - vercel.json (145 bytes)
```

---

### PHASE 4️⃣ : TEST LOCAL (10 min)

#### Étape 4.1 : Lancer un serveur local
```
bash :
cd /mon-projet/
python3 -m http.server 8000

OU :
npx http-server -p 8000
```

#### Étape 4.2 : Ajouter un utilisateur de test au Google Sheet
```
1. Ouvrir Google Sheet
2. Feuille "Résultats"
3. Ajouter une ligne manuellement :

   Timestamp : 2026-10-07T10:00:00Z
   Collège : Collège SA80_1880
   Prénom : Test
   Nom : User
   IP : 127.0.0.1  ← L'IP locale (ou votre IP réelle)
   Priorités : (vides ou remplies)

4. Sauvegarder
```

#### Étape 4.3 : Tester l'application
```
1. Ouvrir : http://localhost:8000
2. Ouvrir console : F12 (Ctrl+Shift+I)
3. Saisir identité :
   Prénom : Test
   Nom : User
   Click "Continuer"
4. Sélectionner un collège
5. Sélectionner 6 priorités
6. Click "Valider mon sondage"

✅ VÉRIFIER CONSOLE :
   🔐 Début vérification SA80_1880...
   ✅ Vérification SA80_1880 réussie
   💾 Enregistrement de la réponse SA80_1880...
   ✅ Réponse enregistrée avec succès dans le Google Sheet

✅ VÉRIFIER GOOGLE SHEET :
   Une nouvelle ligne doit avoir été ajoutée dans "Résultats"
```

#### Étape 4.4 : Test d'erreur
```
1. Changer le prénom en : "Inexistant"
2. Sélectionner 6 priorités
3. Click "Valider mon sondage"

✅ DOIT AFFICHER :
   ❌ Vérification échouée
   "Vous ne figurez pas dans la liste des votants autorisés"
```

---

### PHASE 5️⃣ : DÉPLOIEMENT PRODUCTION (5 min)

#### Option A : Vercel (Recommandé)
```
1. Créer compte : vercel.com
2. Installer Vercel CLI : npm install -g vercel
3. Dans le dossier du projet :
   vercel
4. Suivre les prompts
5. ✅ Récupérer l'URL : https://mon-projet-xyz.vercel.app
```

#### Option B : GitHub Pages
```
1. Créer repo : github.com/mon-repo
2. Ajouter les fichiers
3. Activer GitHub Pages dans Settings
4. ✅ URL : https://username.github.io/mon-repo
```

#### Option C : Autre hébergement
```
1. Copier les fichiers sur le serveur
2. Mettre en ligne
3. Tester l'URL de production
```

---

## ✅ CHECKLIST DE DÉPLOIEMENT

### Google Apps Script
- [ ] Feuilles créées (Résultats, Officiers, Non-Officiers, PATS, Résumé)
- [ ] Code de vérification déployé
- [ ] URL copiée et testée
- [ ] Logs Google Apps Script visibles

### index.html
- [ ] URL Google Apps Script remplacée (ligne 802)
- [ ] Fonction submitSurvey() modifiée (ligne 1248)
- [ ] Enregistrement SA80_1880 activé (ligne 1290)
- [ ] Script chargé avant </body>

### Fichiers du projet
- [ ] index.html copié
- [ ] VERIFICATION-SA80_1880-SHEET.js copié
- [ ] vercel.json présent (optionnel)

### Tests Local
- [ ] Serveur local lancé (http://localhost:8000)
- [ ] Utilisateur de test dans Google Sheet
- [ ] Vérification réussie (console affiche ✅)
- [ ] Données enregistrées dans Google Sheet
- [ ] Erreur correctement affichée pour utilisateur inexistant

### Production
- [ ] Utilisateurs autorisés dans Google Sheet (IP + Prénom + Nom)
- [ ] Déploiement lancé (Vercel/GitHub/autre)
- [ ] URL de production testée
- [ ] Logs consultables
- [ ] Backup des données Google Sheet

---

## 🔧 CONFIGURATION AVANCÉE

### Ajouter des utilisateurs autorisés
```
1. Google Sheet > Feuille "Résultats"
2. Ajouter une ligne pour chaque votant autorisé :
   - Timestamp : date/heure
   - Collège : "Collège SA80_1880"
   - Prénom : le prénom exact (cas sensible)
   - Nom : le nom exact (cas sensible)
   - IP : l'adresse IP de l'utilisateur
   - Priorités : (vides pour juste vérifier)

⚠️ L'IP et les noms DOIVENT être exacts !
```

### Modifier les collèges et revendications
```
1. Ouvrir index.html
2. Chercher la variable `data = { colleges: [...] }`
3. Modifier selon vos besoins
4. Sauvegarder
```

### Activer/Désactiver VPN
```
1. submitSurvey() ligne 1250
2. Commenter pour désactiver la vérification VPN
3. Sauvegarder
```

---

## 🚨 TROUBLESHOOTING

### Erreur : "URL non configurée"
**Cause :** GOOGLE_APPS_SCRIPT_URL n'est pas remplacée
**Solution :**
1. Vérifier ligne 802 de index.html
2. S'assurer que c'est l'URL complète avec `/usercontent`
3. Sauvegarder et recharger

### Erreur : "Vérification toujours échouée"
**Cause :** Les données ne correspondent pas
**Solution :**
1. Vérifier console F12 pour voir l'IP réelle
2. Vérifier que l'utilisateur existe dans Google Sheet
3. Vérifier la correspondance exacte : IP + Prénom + Nom
4. Les majuscules/minuscules COMPTENT

### Erreur : "Feuille 'Résultats' non trouvée"
**Cause :** La feuille n'existe pas dans Google Sheet
**Solution :**
1. Créer manuellement ou exécuter createAllSheets()
2. Vérifier que le nom est exactement "Résultats"

### Logs Google Apps Script vides
**Cause :** Les erreurs ne sont pas tracées
**Solution :**
1. Extensions > Apps Script > Execution log
2. Chercher les erreurs
3. Vérifier les arguments envoyés

---

## 📊 MONITORING & AUDIT

### Vérifier les votes enregistrés
```
Google Sheet > Feuille "Résultats"
Voir toutes les lignes avec :
- IP
- Prénom
- Nom
- Priorités sélectionnées
- Timestamp
```

### Vérifier les tentatives échouées
```
Navigateur console > F12 > Console
Voir les logs :
❌ Vérification SA80_1880 échouée
❌ Utilisateur non trouvé
```

### Exporter les données
```
Google Sheet > Download > CSV/Excel
Analyser dans un tableur
```

---

## 📞 SUPPORT RAPIDE

### Question : Comment ajouter un utilisateur autorisé ?
**Réponse :** Ajouter une ligne dans Google Sheet "Résultats" avec IP + Nom + Prénom

### Question : Que se passe-t-il si l'utilisateur utilise un VPN ?
**Réponse :** Alert "VPN détecté" → Vote rejeté

### Question : Un utilisateur peut-il modifier son vote ?
**Réponse :** 1x seulement (flag `responseModified_` en localStorage)

### Question : Où sont stockées les données ?
**Réponse :** Google Sheet "Résultats" (synchronisation automatique)

---

## 🎯 RÉSUMÉ FINAL

| Étape | Action | Temps | Status |
|-------|--------|-------|--------|
| 1️⃣ | Google Apps Script | 10 min | ✅ |
| 2️⃣ | Configurer index.html | 5 min | ✅ |
| 3️⃣ | Préparer fichiers | 5 min | ✅ |
| 4️⃣ | Test local | 10 min | ✅ |
| 5️⃣ | Déploiement production | 5 min | ✅ |
| **TOTAL** | **35 min** | **✅ READY** |

---

**Créé :** 7 octobre 2026
**Dernière mise à jour :** 7 octobre 2026
**Version :** 3.0 Production Ready

