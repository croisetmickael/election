# 🚀 Guide Complet : GitHub + Vercel

**Déployez votre app en 20 minutes. Guide avec TOUS les détails.**

---

## 📋 Pré-requis

- [ ] Compte GitHub (github.com) - gratuit
- [ ] Compte Vercel (vercel.com) - gratuit, login avec GitHub
- [ ] Git installé sur votre PC
- [ ] Les fichiers de l'app

### Vérifier git

```bash
git --version
```

Si erreur → installer depuis **git-scm.com**

---

## 🎯 Les 5 étapes

```
1. Créer repo GitHub ................... 3 min
2. Préparer en local ................... 2 min
3. Git push ........................... 3 min
4. Connecter Vercel ................... 5 min
5. ✅ App en ligne !
```

---

## 1️⃣ Créer un repo GitHub

### Étape 1.1 : Aller sur GitHub

```
https://github.com/
```

Se connecter (ou créer compte si nécessaire)

### Étape 1.2 : Créer le repo

Cliquer sur le **+** en haut à droite → **New repository**

Remplir :
```
Repository name: sondage-spp-pats
Description: Sondage SPP-PATS 2026
Visibility: Public
Initialize: ❌ (rien cocher)
```

Cliquer **Create repository**

### Étape 1.3 : Copier l'URL

La page affiche :
```
https://github.com/VOTRENOM/sondage-spp-pats.git
```

**Copier cette URL, vous en aurez besoin**

✅ Repo créé !

---

## 2️⃣ Préparer en local

### Étape 2.1 : Créer le dossier

Sur votre PC, créer un dossier :

**Windows :** `C:\Projets\sondage-spp-pats`
**Mac/Linux :** `~/Projects/sondage-spp-pats`

### Étape 2.2 : Copier les fichiers

Dans ce dossier, copier :
- `index.html`
- `vercel.json`
- `.gitignore`
- `README.md`

**Tous ces fichiers doivent être à la racine du dossier**

### Étape 2.3 : Ouvrir terminal

Ouvrir un terminal (ou PowerShell sur Windows) :

```bash
cd ~/Projects/sondage-spp-pats
```

Ou naviguez manuellement puis "Ouvrir terminal ici"

### Étape 2.4 : Initialiser git

```bash
git init
```

Cela crée un dossier `.git` (caché)

### Étape 2.5 : Ajouter le remote

```bash
git remote add origin https://github.com/VOTRENOM/sondage-spp-pats.git
```

**Remplacer `VOTRENOM` par votre username GitHub**

### Étape 2.6 : Vérifier

```bash
git remote -v
```

Doit afficher :
```
origin  https://github.com/VOTRENOM/sondage-spp-pats.git (fetch)
origin  https://github.com/VOTRENOM/sondage-spp-pats.git (push)
```

✅ Local prêt !

---

## 3️⃣ Git Push

### Étape 3.1 : Ajouter les fichiers

```bash
git add .
```

### Étape 3.2 : Vérifier

```bash
git status
```

Doit montrer tous les fichiers en vert :
```
new file:   index.html
new file:   vercel.json
new file:   .gitignore
new file:   README.md
```

### Étape 3.3 : Commit

```bash
git commit -m "Initial commit: Sondage SPP-PATS app"
```

### Étape 3.4 : Préparer la branche

```bash
git branch -M main
```

### Étape 3.5 : Push

```bash
git push -u origin main
```

**La première fois, il demande vos identifiants GitHub**

Entrer :
- Username ou email
- Token (générer depuis github.com/settings/tokens)

**Ou si vous êtes connecté, ça passe automatique**

### Étape 3.6 : Vérifier sur GitHub

Aller sur :
```
https://github.com/VOTRENOM/sondage-spp-pats
```

Vous devez voir les fichiers ! ✅

---

## 4️⃣ Déployer sur Vercel

### Étape 4.1 : Aller sur Vercel

```
https://vercel.com/new
```

### Étape 4.2 : Importer le repo

Cliquer **Import Git Repository**

### Étape 4.3 : Chercher votre repo

Dans la barre de recherche, taper :
```
sondage-spp-pats
```

Cliquer sur votre repo

### Étape 4.4 : Configurer

Vous voyez :
```
Project name: sondage-spp-pats
Framework: Other (OK, c'est du HTML pur)
Root directory: . (racine)
```

**Laisser par défaut, cliquer Deploy**

### Étape 4.5 : Attendre

```
Building your project...

✅ Deployment successful!
https://sondage-spp-pats.vercel.app
```

⏳ **Peut prendre 1-2 minutes**

### Étape 4.6 : Votre URL en ligne !

```
https://sondage-spp-pats.vercel.app/
```

Cliquer sur le lien pour tester ! 🎉

✅ App déployée !

---

## 📱 Tester l'app

Ouvrir :
```
https://sondage-spp-pats.vercel.app/
```

Vous devez voir :
- ✅ 3 cartes de collèges
- ✅ Interface responsive
- ✅ Boutons qui fonctionnent

Cliquer sur un collège → voter → succès

✅ Tout fonctionne !

---

## 🔄 Après le déploiement : Faire des changements

### Modifier l'app localement

1. Ouvrir `index.html` avec un éditeur
2. Faire vos changements
3. Sauvegarder

### Pousser les changements

```bash
git add .
git commit -m "Description du changement"
git push
```

Vercel redéploie automatiquement en 1-2 min !

---

## 🎨 Personnaliser l'app

### Changer le titre

Ouvrir `index.html` et chercher :
```html
<title>Sondage SPP-PATS 2026</title>
```

Remplacer par ce que vous voulez.

### Changer les couleurs

Chercher cette section :
```javascript
officiers: {
    name: 'Collège Officiers',
    color: '#003D82',  // ← CETTE COULEUR
```

Les 3 collèges :
- Officiers : `#003D82` (bleu)
- SPP : `#E31C23` (rouge)
- PATS : `#009B9B` (teal)

### Modifier les revendications

Chercher :
```javascript
revendications: [
    'Adéquation Grade / Emploi',
    'Missions transverses récompensées',
    // ...
]
```

Remplacer par vos textes.

### Après modification

```bash
git add .
git commit -m "Personnalisation"
git push
```

Vercel redéploie ! ✨

---

## 📊 Voir les résultats des votes

### Dans le navigateur

1. Ouvrir votre app
2. F12 (ouvrir Dev Tools)
3. Onglet **Console**
4. Taper :
   ```javascript
   JSON.parse(localStorage.getItem('sondageResults'))
   ```

Vous voyez tous les votes en JSON

### Exporter les résultats

```javascript
// Copier-coller dans console
const results = JSON.parse(localStorage.getItem('sondageResults'));
console.table(results);
```

Puis copier-coller dans Excel/Google Sheets

---

## 🔗 Ajouter Google Sheets (optionnel)

Pour collecter automatiquement dans un Google Sheet :

### Étape 1 : Créer Google Apps Script

1. Ouvrir votre Google Sheet
2. **Extensions** → **Apps Script**
3. Coller le code (voir GOOGLE-SHEETS-SETUP.md)
4. Déployer → Copier l'URL du script

### Étape 2 : Ajouter l'URL à l'app

Ouvrir `index.html` et chercher :
```javascript
const GOOGLE_APPS_SCRIPT_URL = "";
```

Remplacer par votre URL :
```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/VOTRE_URL/usercallable";
```

### Étape 3 : Pousser

```bash
git add .
git commit -m "Add Google Sheets integration"
git push
```

Vercel redéploie → Google Sheets intégré ! ✅

---

## 🔒 Sécurité

### L'app est sécurisée ?

**Oui :**
- ✅ HTTPS automatique (Vercel)
- ✅ Pas de base de données
- ✅ Données locales seulement (ou Google Sheets)
- ✅ Hosted par Vercel (infrastructure fiable)

### Qui peut accéder ?

Par défaut : **N'importe qui avec le lien**

Si vous voulez limiter :
- Partager seulement aux agents
- Pas de pub sur internet
- Domaine privé (optionnel, payant)

---

## 🚨 Troubleshooting

### "Repository not found"

**Cause :** URL GitHub incorrecte

**Solution :**
- Vérifier le username
- Vérifier le nom du repo
- Réessayer : `git remote set-url origin VOTRE_URL`

### "Permission denied" sur push

**Cause :** Authentification GitHub

**Solution :**
```bash
# Windows : utiliser GitHub Desktop
# Mac/Linux : générer token depuis github.com/settings/tokens
# Utiliser token au lieu du password
```

### Vercel dit "No deployable content"

**Cause :** `index.html` pas trouvé

**Solution :**
- Vérifier le fichier est à la racine
- Vérifier le nom : `index.html` (minuscules)
- Vérifier les fichiers sont pushés : `git log --name-status`

### App vide après déploiement

**Cause :** Chemin fichier incorrect ou erreur JS

**Solution :**
- Ouvrir Dev Tools (F12)
- Onglet Console
- Chercher les erreurs rouges
- Vérifier syntax HTML/JS

---

## 📈 Monitoring

Aller sur Vercel Dashboard :
```
https://vercel.com/dashboard
```

Vous voyez :
- ✅ Status du dernier déploiement
- 📊 Nombre de visites
- ⚡ Performance
- 🔄 Historique des pushs

---

## 🎯 Workflow complet après déploiement

```
Vous faites un changement
    ↓
git add .
git commit -m "Description"
git push
    ↓
GitHub reçoit
    ↓
Vercel détecte et redéploie automatiquement
    ↓
1-2 minutes après
    ↓
Votre app est à jour en ligne !
```

**Aucune manipulation Vercel requise après la première fois**

---

## 💡 Conseils pro

### Créer une branch avant des gros changements

```bash
# Créer une branche de développement
git checkout -b develop

# Faire vos changements
# Quand satisfait, merger dans main
git checkout main
git merge develop
git push
```

### Utiliser des commits significatifs

```bash
❌ Mauvais
git commit -m "fix"

✅ Bon
git commit -m "Change officiers color to #0056b3"
```

### Voir l'historique

```bash
git log --oneline
```

---

## 📝 Récapitulatif

### Premier déploiement
1. Créer repo GitHub (3 min)
2. Préparer local (2 min)
3. Git push (3 min)
4. Vercel deploy (5 min)
5. ✅ App online

**Total : 15-20 min**

### Changements futurs
```bash
git add .
git commit -m "Description"
git push
```

**Total : 2-3 min + 1-2 min de redéploiement Vercel**

---

## ✅ Checklist finale

- [ ] Compte GitHub créé
- [ ] Compte Vercel créé (login GitHub)
- [ ] Git installé
- [ ] Repo GitHub créé
- [ ] Fichiers copiés en local
- [ ] Git push réussi
- [ ] Fichiers visibles sur GitHub
- [ ] Vercel connecté
- [ ] Déploiement réussi
- [ ] URL ouverte et testée
- [ ] App fonctionne

---

## 🎉 Vous avez réussi !

Votre app est en ligne, accessible partout, et prête pour les votes ! 🗳️

**URL à partager :**
```
https://sondage-spp-pats.vercel.app/
```

---

## 📞 Besoin d'aide ?

**Erreur GitHub ?**
→ github.com/git/git/wiki

**Erreur Vercel ?**
→ vercel.com/docs

**Erreur app ?**
→ Ouvrir Dev Tools (F12) → Console

---

**Bon sondage ! 🚀**
