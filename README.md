# 🗳️ Sondage SPP-PATS 2026

Application web de sondage pour les élections professionnelles SPP-PATS 2026.

**Fonctionnalités :**
- ✅ 3 collèges (Officiers, SPP, PATS)
- ✅ 6 votes par collège
- ✅ Sauvegarde automatique
- ✅ Interface responsive (mobile + desktop)
- ✅ Prêt pour Vercel

---

## 🚀 Déploiement rapide (5 min)

### 1️⃣ Créer un repo GitHub

1. Aller sur **github.com**
2. Cliquer **New repository**
3. Nommer : `sondage-spp-pats`
4. **Create repository**

### 2️⃣ Cloner et pousser en local

```bash
# Créer le dossier
mkdir sondage-spp-pats
cd sondage-spp-pats

# Initialiser git
git init
git remote add origin https://github.com/VOTRENOM/sondage-spp-pats.git

# Copier TOUS les fichiers ici
# - index.html
# - vercel.json
# - .gitignore
# - README.md

# Pousser
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

**Remplacer `VOTRENOM` par votre username GitHub**

### 3️⃣ Déployer sur Vercel

1. Aller sur **vercel.com/new**
2. Cliquer **Import Git Repository**
3. Chercher et sélectionner `sondage-spp-pats`
4. Laisser les settings par défaut
5. **Deploy**

⏳ **Attendre 1-2 minutes...**

### 4️⃣ Votre URL en ligne !

```
https://sondage-spp-pats.vercel.app/
```

✅ C'est prêt ! Partagez ce lien.

---

## 📱 Tester en local avant de déployer

```bash
# Ouvrir un terminal dans le dossier

# Python 3
python3 -m http.server 8000

# Puis ouvrir
http://localhost:8000/
```

---

## 🔄 Faire des changements après déploiement

```bash
# Éditer les fichiers localement

# Puis :
git add .
git commit -m "Description du changement"
git push

# Vercel redéploie automatiquement !
```

---

## 📊 Ajouter Google Sheets (optionnel)

Pour collecter les données dans un Google Sheet :

1. **Créer un Google Apps Script** (voir guide)
2. **Ajouter l'URL du script** en haut de `index.html`
3. **Redéployer** sur Vercel

Voir le fichier `GOOGLE-SHEETS-SETUP.md` pour les détails.

---

## 🎨 Personnaliser l'app

### Changer les couleurs

Ouvrir `index.html` et chercher cette section :

```javascript
officiers: {
    name: 'Collège Officiers',
    color: '#003D82',  // ← Changer la couleur
```

### Modifier les revendications

Dans la même section, modifier le tableau `revendications` :

```javascript
revendications: [
    'Ma revendication 1',
    'Ma revendication 2',
    // ... etc
]
```

### Changer les collèges

Dupliquer un collège entier et l'adapter.

**Après modification :**
```bash
git add .
git commit -m "Personnalisation"
git push
```

---

## 📊 Voir les résultats

### Option 1 : Console navigateur

```javascript
// F12 → Console
JSON.parse(localStorage.getItem('sondageResults'))
```

### Option 2 : Google Sheet

Si Google Sheets est configuré, les données arrivent automatiquement dans le Sheet.

---

## 🔐 Sécurité

- ✅ HTTPS automatique (Vercel)
- ✅ Pas de serveur requis
- ✅ Données locales sur le navigateur
- ✅ Optionnel : envoyer à Google Sheet

---

## 📁 Structure des fichiers

```
sondage-spp-pats/
├─ index.html ................ L'app (le plus important)
├─ vercel.json ............... Config Vercel
├─ .gitignore ................ Fichiers à ignorer
└─ README.md ................. Ce fichier
```

**C'est tout !** Zéro dépendances, zéro compilation requise.

---

## ⚡ Perf & Scalabilité

- 📦 Taille : < 30 KB
- ⚡ Chargement : < 1 sec
- 🌍 Partout dans le monde (CDN Vercel)
- 🔄 Pas de limite d'utilisateurs

---

## 🐛 Dépannage

### L'app ne charge pas

- Vérifier l'URL Vercel
- Attendre 2-3 min après le déploiement
- Vider le cache navigateur

### Git push échoue

```bash
# Vérifier la branche
git branch

# Utiliser le bon remote
git remote -v
```

### Vercel dit "No deployable content"

- Vérifier que `index.html` est à la racine
- Vérifier les fichiers sont commités
- Attendre le redéploiement

---

## 📞 Support

### Documentation Vercel
→ vercel.com/docs

### Documentation GitHub
→ github.com/git/git/wiki

---

## 🎉 Vous êtes prêt !

1. ✅ Créer repo GitHub
2. ✅ Copier les fichiers
3. ✅ Git push
4. ✅ Déployer Vercel
5. ✅ Partager l'URL

**C'est aussi simple que ça !**

---

## 📝 Licence

Libre d'utilisation. Fait pour les élections professionnelles SPP-PATS 2026.

---

**Bon sondage ! 🗳️**
