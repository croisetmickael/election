# 🚀 START HERE | Commencez par ce fichier

**Bienvenue ! Voici votre app de sondage SPP-PATS. Ce fichier vous dit quoi faire.**

---

## 🎯 Ce que vous avez

✅ **Une app web complète** pour les élections professionnelles SPP-PATS
✅ **3 collèges** avec revendications
✅ **Prête pour Vercel** (déploiement en 20 min)
✅ **Optionnel : Google Sheets** pour collecter les votes

---

## 📋 3 fichiers importants

```
index.html .................. L'APP (à utiliser)
GUIDE-DEPLOIEMENT.md ....... Comment la mettre en ligne
GOOGLE-SHEETS.md ........... Optionnel (collecte données)
```

**Tout le reste est config / doc optionnelle**

---

## 🎬 Les 3 chemins possibles

### Chemin A : Je veux juste tester rapidement (5 min)

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`

**Résultat :** App fonctionne localement ✅

---

### Chemin B : Je veux la mettre en ligne (20 min) ⭐ RECOMMANDÉ

1. **Lire** : `GUIDE-DEPLOIEMENT.md` (20 min)
2. **Suivre** les 5 étapes (15 min)
3. **Partager** l'URL

**Résultat :** App en ligne et partageable ✅

---

### Chemin C : Je veux tout (45 min)

1. **Déployer** sur Vercel (voir Chemin B)
2. **Ajouter Google Sheets** (voir GOOGLE-SHEETS.md)
3. **Personnaliser** l'app si besoin

**Résultat :** App complète avec collecte automatique ✅

---

## 🚀 Je recommande : Chemin B (Vercel)

**Pourquoi :**
- 🌍 URL en ligne publique
- 📱 Accessible partout (mobile + desktop)
- 🔄 Auto-déploiement (git push = redéploiement)
- 💰 Gratuit pour toujours
- 🔒 HTTPS sécurisé

**Effort :** 20 minutes une seule fois
**Bénéfice :** Professionnel + moderne + scalable

---

## 📊 Étapes rapides (Chemin B)

### 1. Créer un repo GitHub (2 min)

```
github.com/new
→ Repository name: sondage-spp-pats
→ Create
```

### 2. Préparer en local (2 min)

```bash
mkdir sondage-spp-pats
cd sondage-spp-pats
git init
git remote add origin https://github.com/VOTRENOM/sondage-spp-pats.git
```

(Remplacer `VOTRENOM` par votre username)

### 3. Copier les fichiers

```
index.html
vercel.json
.gitignore
README.md
GUIDE-DEPLOIEMENT.md (documentation)
```

Tous dans le même dossier `sondage-spp-pats/`

### 4. Pousser (3 min)

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### 5. Vercel (5 min)

```
vercel.com/new
→ Import Git Repository
→ Choisir sondage-spp-pats
→ Deploy
```

### 6. ✅ App en ligne !

```
https://sondage-spp-pats.vercel.app/
```

**Partagez ce lien !** 🎉

---

## ❓ Questions fréquentes

### "Je ne connais pas git"

**Solution :** Lire `GUIDE-DEPLOIEMENT.md`

C'est un guide ultra-détaillé qui explique chaque commande.

### "Je veux juste tester"

**Solution :** Chemin A (5 min)

```bash
python3 -m http.server 8000
```

### "Je veux collecter les votes"

**Solution :** Chemin C (après Vercel)

Lire `GOOGLE-SHEETS.md` pour ajouter Google Sheets

### "Je veux changer les couleurs/revendications"

**Solution :** Éditer `index.html`

Chercher les couleurs et revendications, modifier, puis git push.

### "Ça coûte combien ?"

**Solution :** C'est gratuit !

- GitHub : gratuit
- Vercel : gratuit (plan hobby)
- Google Sheets : gratuit

Aucun coût ! 🎉

---

## 📁 Structure complète

```
sondage-spp-pats/
├─ index.html ..................... L'app (★ IMPORTANT)
├─ vercel.json .................... Config Vercel
├─ .gitignore ..................... Fichiers à ignorer
├─ README.md ...................... Info générale
├─ GUIDE-DEPLOIEMENT.md ........... Comment déployer ✅
├─ GOOGLE-SHEETS.md ............... Google Sheets (optionnel)
├─ google-apps-script.js .......... Code Google (si besoin)
└─ START-HERE.md .................. Ce fichier
```

**Vous n'avez besoin QUE de index.html + vercel.json + .gitignore**

Les autres fichiers sont :
- Documentation (guide)
- Optionnel (Google Sheets)

---

## 🎯 Votre checklist

### Avant de commencer

- [ ] Vous avez ces fichiers
- [ ] Vous avez un compte GitHub (gratuit)
- [ ] Vous avez un compte Vercel (gratuit, login GitHub)
- [ ] Git installé sur votre PC

### Pour déployer (Chemin B)

- [ ] Lire `GUIDE-DEPLOIEMENT.md` (20 min)
- [ ] Créer repo GitHub
- [ ] Pousser les fichiers
- [ ] Déployer sur Vercel
- [ ] Tester l'URL
- [ ] ✅ Partager !

### Optionnel : Google Sheets

- [ ] Lire `GOOGLE-SHEETS.md`
- [ ] Créer Google Apps Script
- [ ] Ajouter l'URL à index.html
- [ ] Redéployer
- [ ] ✅ Collecte automatique !

---

## 💡 Conseil

**Ne pas vous perdre dans les fichiers.**

**Simple :**
1. Lire ce fichier (2 min)
2. Choisir votre chemin
3. Lire le guide approprié
4. Suivre pas à pas
5. ✅ Succès

---

## 🚀 C'est parti ?

### Option 1 : Tester maintenant (Chemin A)

```bash
cd sondage-spp-pats
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

### Option 2 : Déployer maintenant (Chemin B)

Lire : **`GUIDE-DEPLOIEMENT.md`**

### Option 3 : Tout faire (Chemin C)

Lire : **`GUIDE-DEPLOIEMENT.md`** puis **`GOOGLE-SHEETS.md`**

---

## 📞 Besoin d'aide ?

**Pour déployer :**
→ `GUIDE-DEPLOIEMENT.md` (très détaillé, avec troubleshooting)

**Pour Google Sheets :**
→ `GOOGLE-SHEETS.md` (étape par étape)

**Pour personnaliser :**
→ Éditer `index.html` directement (c'est du HTML normal)

**Pour autre chose :**
→ `README.md` (informations générales)

---

## ✨ Résumé

```
Vous avez        Une app complète, prête à l'emploi
Vous faites      Les 5 étapes (GUIDE-DEPLOIEMENT.md)
Vous obtenez     Une URL partageable en ligne
Vous partagez    Le lien avec les agents
Les agents votent Via le navigateur
Vous récoltez    Les résultats (Google Sheets optionnel)
```

---

## 🎉 Allez-y !

**Option recommandée : Chemin B (Vercel)**

Ouvrir maintenant : **`GUIDE-DEPLOIEMENT.md`**

20 minutes → App en ligne professionnelle ✅

---

**Bonne chance avec votre sondage SPP-PATS 2026 ! 🗳️**
