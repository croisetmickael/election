# 📊 Ajouter Google Sheets (Optionnel)

**Collecter automatiquement les votes dans un Google Sheet**

---

## 🎯 Ce que vous allez obtenir

Chaque vote sera automatiquement ajouté à un Google Sheet :

```
Timestamp         | Collège     | Priorité 1 | Priorité 2 | ...
01/01/26 14:30    | Officiers   | Req 1      | Req 2      | ...
01/01/26 14:35    | SPP         | Req 3      | Req 1      | ...
```

---

## 📋 Pré-requis

- ✅ App déployée sur Vercel
- ✅ Google Sheet créé (ou nouveau)
- ✅ 10 minutes

---

## 🚀 Les 3 étapes

```
1. Créer Google Apps Script ........... 5 min
2. Déployer le script ................ 3 min
3. Ajouter l'URL à l'app ............. 2 min
```

---

## 1️⃣ Créer Google Apps Script

### Étape 1.1 : Ouvrir Google Sheet

Aller sur :
```
https://sheets.google.com
```

Créer un nouveau sheet ou ouvrir un existant.

### Étape 1.2 : Ouvrir Apps Script

Cliquer **Extensions** → **Apps Script**

Une nouvelle fenêtre s'ouvre.

### Étape 1.3 : Copier le code

**Supprimer le code par défaut (qui dit "hello world")**

Copier-coller le code de `google-apps-script.js` :

```javascript
// GOOGLE APPS SCRIPT - Collecte des votes

const SHEET_ID = "VOTRE_SHEET_ID";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    let resultsSheet = sheet.getSheetByName("Résultats");
    if (!resultsSheet) {
      resultsSheet = sheet.insertSheet("Résultats");
      resultsSheet.appendRow([
        "Timestamp",
        "Collège",
        "Priorité 1",
        "Priorité 2",
        "Priorité 3",
        "Priorité 4",
        "Priorité 5",
        "Priorité 6"
      ]);
    }
    
    const row = [
      data.timestamp,
      data.college,
      data.priorities[0] || '',
      data.priorities[1] || '',
      data.priorities[2] || '',
      data.priorities[3] || '',
      data.priorities[4] || '',
      data.priorities[5] || ''
    ];
    
    resultsSheet.appendRow(row);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Étape 1.4 : Trouver l'ID du Sheet

Aller dans l'URL du Sheet :

```
https://docs.google.com/spreadsheets/d/VOTRE_ID_ICI/edit
                                        ↑
                                  C'est celui-ci
```

Copier l'ID (c'est une longue chaîne)

### Étape 1.5 : Remplacer dans le code

Trouver cette ligne :
```javascript
const SHEET_ID = "VOTRE_SHEET_ID";
```

Remplacer par :
```javascript
const SHEET_ID = "17BoJUcJzuWlKsmjIbbINeaLQd5AHQYyi_B6innW5xaA"; // Exemple
```

### Étape 1.6 : Sauvegarder

**Ctrl+S** (ou Cmd+S Mac)

Un popup "Enregistrer le projet" apparaît.

Nommer le projet :
```
Sondage SPP-PATS
```

Cliquer **Enregistrer**

✅ Script sauvegardé !

---

## 2️⃣ Déployer le script

### Étape 2.1 : Créer un déploiement

Cliquer **Déployer** en haut à droite → **Nouveau déploiement**

### Étape 2.2 : Type de déploiement

Cliquer sur l'icône ⚙️ → **Application Web**

### Étape 2.3 : Configurer

Remplir :
```
Exécuter en tant que : [Votre email]
Accès autorisé pour : N'importe qui
```

### Étape 2.4 : Déployer

Cliquer **Déployer**

Un popup de permission apparaît :
- Cliquer votre compte
- **Continuer**
- Accepter les permissions

### Étape 2.5 : Copier l'URL

Vous voyez :

```
URL de déploiement

https://script.google.com/macros/d/XXXXXXXXXXXX/usercallable
```

**Copier cette URL exactement**

✅ Script déployé !

---

## 3️⃣ Ajouter l'URL à l'app

### Étape 3.1 : Éditer index.html

Ouvrir le fichier `index.html` avec un éditeur.

### Étape 3.2 : Trouver cette ligne

```javascript
const GOOGLE_APPS_SCRIPT_URL = "";
```

C'est au tout début du tag `<script>`

### Étape 3.3 : Coller l'URL

Remplacer par :

```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/VOTRE_URL/usercallable";
```

**Exemple complet :**
```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/1xYzAbC_D2eF3gHiJ4kL5mNoPqRsTuV6wX7yZ8aBcDeFgHiJkLmN/usercallable";
```

### Étape 3.4 : Sauvegarder

**Ctrl+S** (ou Cmd+S Mac)

### Étape 3.5 : Pousser sur GitHub

```bash
git add .
git commit -m "Add Google Sheets integration"
git push
```

Vercel redéploie automatiquement ! ✅

---

## ✅ Tester

### Local

```bash
python3 -m http.server 8000
```

Ouvrir `http://localhost:8000`

Voter et chercher un message de succès.

### En ligne

Aller sur votre URL Vercel :
```
https://sondage-spp-pats.vercel.app/
```

Voter → message **"✓ Vos données ont été envoyées"**

### Vérifier le Google Sheet

Retourner au Google Sheet.

Vous devez voir une nouvelle feuille **"Résultats"** avec votre vote ! 🎉

---

## 📊 Gérer les résultats

### Voir tous les votes

1. Ouvrir le Google Sheet
2. Onglet **Résultats**
3. Tous les votes s'y trouvent

### Créer des graphiques

```
Menu → Insertion → Graphique
```

Choisir le type de graphique pour analyser les votes.

### Exporter les données

```
Menu → Fichier → Télécharger
→ Excel, CSV, PDF
```

### Filtrer les votes

```
Clic sur les en-têtes
→ Créer un filtre
→ Filtrer par collège
```

---

## 🔧 Troubleshooting

### "Données sauvegardées localement (envoi échoué)"

**Cause :** URL Google Apps Script incorrecte

**Solution :**
1. Vérifier l'URL 3 fois (copier-coller exact)
2. Vérifier le SHEET_ID dans Google Apps Script
3. Redéployer le script si changement

### "404 Not Found"

**Cause :** Déploiement pas fini

**Solution :**
- Attendre 1-2 minutes
- Recharger la page
- Redéployer le script

### Les données ne s'ajoutent pas au Sheet

**Cause :** Permissions manquantes

**Solution :**
1. Dans Google Apps Script
2. Revoir le déploiement
3. Vérifier "Accès autorisé pour : N'importe qui"
4. Redéployer

### Feuille "Résultats" ne se crée pas

**Cause :** Sheet vide ou structure différente

**Solution :**
1. Créer manuellement l'onglet "Résultats"
2. Ajouter les en-têtes
3. Redéployer le script

---

## 🔒 Sécurité

### Qui peut voir les données ?

**Par défaut :** Seulement vous (propriétaire du Sheet)

**Pour partager :**
- Partager le Sheet avec email spécifique
- **Ne pas partager le Sheet publiquement !**
- Partager seulement l'URL de l'app

### Est-ce sécurisé ?

**Oui :**
- ✅ HTTPS de partout
- ✅ Google chiffre les données
- ✅ Respect RGPD
- ✅ Vous contrôlez l'accès

---

## 📝 Modifier le Google Apps Script

Si vous devez changer le code :

1. Aller sur script.google.com
2. Ouvrir votre projet
3. Modifier le code
4. **Ctrl+S** (sauvegarder)
5. **Déployer** → **Gérer les déploiements**
6. Modifier l'URL si besoin

**Note :** L'URL reste la même, juste le code change.

---

## 🚫 Désactiver Google Sheets

Si vous changez d'avis :

1. Ouvrir `index.html`
2. Chercher la ligne :
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "https://...";
   ```
3. Remplacer par :
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "";
   ```
4. Git push

L'app continue de fonctionner sans Google Sheets.

---

## 📈 Cas d'usage réel

**Sondage du 1er au 14 juin :**

- Jour 1-14 : Agents votent
- En direct : Vous voyez les résultats dans Google Sheet
- Jour 14 : Export des données
- Jour 15 : Analyse et rapport
- Jour 16+ : Présentation au syndicat

**Tout automatisé, zéro perte de temps !**

---

## ✅ Checklist Google Sheets

- [ ] Google Sheet créé
- [ ] ID du Sheet copié
- [ ] Google Apps Script créé
- [ ] ID du Sheet ajouté au script
- [ ] Script sauvegardé
- [ ] Script déployé
- [ ] URL copiée
- [ ] URL ajoutée à index.html
- [ ] index.html sauvegardé
- [ ] Git push réussi
- [ ] Vercel redéployé
- [ ] Teste en local OK
- [ ] Teste en ligne OK
- [ ] Données arrivent au Sheet ✅

---

## 🎉 Vous avez réussi !

Votre app collecte maintenant automatiquement les votes dans Google Sheets !

**Avantages :**
- ✅ Données centralisées
- ✅ Analyse en temps réel
- ✅ Export facile
- ✅ Backup Google Drive
- ✅ Zéro serveur à gérer

---

## 📞 Support

**Problème avec Google Apps Script ?**
→ script.google.com/support

**Problème avec Google Sheets ?**
→ support.google.com/sheets

---

**Bon sondage avec collecte automatique ! 🚀**
