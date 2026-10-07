# ⚡ SETUP GOOGLE SHEETS EN 5 MINUTES

**Vous êtes pressé ? Suivez ce guide !**

---

## 🎯 OBJECTIF

Connecter l'app à Google Sheets pour récolter automatiquement les votes par collège.

---

## ⏱️ ÉTAPES (5 min)

### 1️⃣ Créer le Sheet (1 min)

```
1. Aller https://sheets.google.com
2. Cliquer "+ Nouveau classeur"
3. Nommer : "Sondage SPP-PATS 2026"
4. Copier l'ID dans l'URL :
   https://docs.google.com/spreadsheets/d/[COPIEZ_CEL_CI]/edit
   
ID = [COPIEZ_CEL_CI]
```

**Garder l'ID pour l'étape 2 ✓**

---

### 2️⃣ Ajouter Apps Script (2 min)

```
1. Dans votre Sheet → Extensions > Apps Script
2. Supprimer myFunction (le code par défaut)
3. Copier TOUT le code : google-apps-script-v2.js
4. Coller dans l'éditeur
5. Ligne 10 : Remplacer l'ID
   const SHEET_ID = "[VOTRE_ID]";  ← Mettre ID de l'étape 1
6. Ctrl+S pour enregistrer
```

---

### 3️⃣ Déployer (1 min)

```
1. Menu "Nouveau déploiement"
2. Type : "Application Web"
3. Qui a accès : "N'importe qui"
4. Cliquer "Déployer"
5. COPIER l'URL du déploiement :
   https://script.google.com/macros/d/[COPIEZ_CEL_CI]/userwithscript
   
URL = https://script.google.com/macros/d/[COPIEZ_CEL_CI]/userwithscript
```

**Garder l'URL pour l'étape 4 ✓**

---

### 4️⃣ Configurer index.html (1 min)

```
1. Ouvrir : index.html
2. Chercher ligne ~800 : GOOGLE_APPS_SCRIPT_URL
3. Remplacer :
   const GOOGLE_APPS_SCRIPT_URL = "";
   
   par :
   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/...";
                                   ↑ Mettre votre URL de l'étape 3
4. Enregistrer
```

---

## ✅ TEST (avant de lancer)

```
1. Ouvrir app localement : python3 -m http.server 8000
2. Voter pour un collège
3. Aller à Google Sheet
4. Les données apparaissent ? ✅
5. Colonnes par collège créées ? ✅
   - Officiers
   - Non-Officiers
   - PATS
   ✅ C'EST BON !
```

**Si erreur :** Voir section "Dépannage" ci-bas

---

## 🔍 DÉPANNAGE RAPIDE

| Erreur | Solution |
|--------|----------|
| "Service échoué" | Vérifier URL de déploiement est correcte (pas d'espaces) |
| "Permission refusée" | Retour Apps Script → Exécuter doPost → Autoriser |
| "Feuille n'existe pas" | Exécuter initializeSheets() dans Apps Script |
| Rien n'apparaît dans Sheet | Vérifier GOOGLE_APPS_SCRIPT_URL n'est pas "" |

---

## 📊 CE QUE VOUS ALLEZ VOIR

**Google Sheet avec 5 onglets :**

```
Onglet 1: "Résultats" (tous les votes)
Onglet 2: "Officiers" (votes du collège)
Onglet 3: "Non-Officiers" (votes du collège)
Onglet 4: "PATS" (votes du collège)
Onglet 5: "Résumé" (nombre de votes par collège)
```

**Exemple "Officiers" :**
```
| Timestamp    | Prénom | Nom    | IP        | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:30 | Marie  | Dupont | 192.1.100 | Adé  | Rég  | Cohé | Simp | Act  | RIE  |
| 07/10 14:35 | Jean   | Martin | 203.5.77  | Sim  | Post | Tui  | Rég  | Adé  | Act  |
```

Chaque vote est une ligne, un collège par onglet = **Facile à analyser** 📊

---

## 🚀 C'EST FINI !

Votre app est maintenant connectée à Google Sheets ! 🎉

**Prochaines étapes :**
- Déployer sur Vercel (voir GUIDE-DEPLOIEMENT.md)
- Tester en production
- Lancer le sondage

---

## 📖 POUR PLUS DE DÉTAILS

Voir : **GOOGLE-SHEETS-V2-PAR-COLLEGE.md** (guide complet)

---

**Résumé :**
- ID du Sheet : `[NOTEZ_ICI]`
- URL Apps Script : `[NOTEZ_ICI]`
- Testé localement ? ✓
- Configuré dans index.html ? ✓
- Prêt à lancer ! 🚀
