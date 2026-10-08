# 🚀 ACTION IMMÉDIATE - FAIRE REMONTER LES VOTES

## ⚠️ PROBLÈME IDENTIFIÉ

L'URL Google Apps Script utilisait probablement le mauvais suffixe.

**Corrigé :** Changé de `/usercontent` à `/exec`

---

## 📋 CHECKLIST RAPIDE - À FAIRE MAINTENANT

### 1️⃣ VÉRIFIER FEUILLE "RÉSULTATS" EXISTE

```
Google Sheet → Chercher l'onglet "Résultats"
```

**Si absent :**
1. Click **"+"** (ajouter feuille)
2. Nommer : **"Résultats"**
3. Ajouter header row :
   ```
   A: Timestamp | B: Collège | C: Prénom | D: Nom | E: IP | F-K: Pri1-Pri6
   ```

**Si présent :** ✅ Continuer

---

### 2️⃣ VÉRIFIER GOOGLE APPS SCRIPT DÉPLOYÉ

```
Google Sheet → Extensions → Apps Script
```

**Chercher :** Bouton "Déploiements" en haut

**Si vide :**
1. Copier le code de `GOOGLE-APPS-SCRIPT-COMPLET.gs`
2. Coller dans Apps Script
3. Sauvegarder (Ctrl+S)
4. Déployer → New deployment → Web app → Déployer
5. Copier l'URL

**Si présent :** ✅ Continuer

---

### 3️⃣ RELANCER SERVEUR LOCAL

```bash
# Arrêter le serveur existant (Ctrl+C)

# Relancer
cd /mnt/user-data/outputs
python3 -m http.server 8000
```

---

### 4️⃣ TESTER UN VOTE

```
http://localhost:8000
```

**Rapide :**
1. Accepter RGPD ✓
2. Prénom: Test, Nom: User
3. Collège: Officiers
4. Sélectionner 6 priorités
5. Click "Valider"

---

### 5️⃣ VÉRIFIER LOGS NAVIGATEUR (F12)

**Appuyer sur F12 → Console**

**Chercher les logs :**
```
✅ Réponse enregistrée avec succès
```

**Ou erreurs :**
```
❌ Erreur
⚠️ Warning
```

---

### 6️⃣ VÉRIFIER GOOGLE SHEET

**Feuille "Résultats" :**
```
Nouvelle ligne devrait apparaître avec :
- Timestamp
- Collège
- Prénom
- Nom
- IP
- 6 Priorités
```

---

## 🎯 RÉSUMÉ DES CHANGEMENTS

| Avant | Après |
|-------|-------|
| `/usercontent` | `/exec` ✅ |
| Pas de remontée | Devrait marcher maintenant ✅ |

---

## ✅ SI ÇA MARCHE

Parfait ! Les votes remonteront maintenant. Prochaine étape : **Déploiement production**.

## ❌ SI ÇA NE MARCHE TOUJOURS PAS

Voir `DIAGNOSTIQUE-REMONTEE-VOTES.md` pour dépannage complet.

---

**Status :** 🧪 À TESTER IMMÉDIATEMENT

