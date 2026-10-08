# 🔍 DIAGNOSTIQUE - POURQUOI LES VOTES NE REMONTENT PAS

## ❌ PROBLÈMES POSSIBLES

### 1️⃣ URL Google Apps Script INCORRECTE

**L'URL que vous avez donnée :**
```
https://script.google.com/macros/s/AKfycbw.../exec
```

**Problème :** Finit par `/exec`

**Solution :** Doit finir par `/usercontent`
```
https://script.google.com/macros/s/AKfycbw.../usercontent
```

---

### 2️⃣ Feuille "Résultats" n'existe pas

**Vérifier :**
1. Ouvrir Google Sheet
2. Chercher onglet "Résultats"
3. Si absent → Le créer

**Créer la feuille :**
1. Click **"+"** (ajouter feuille)
2. Nommer : **"Résultats"**
3. Ajouter colonnes :
   ```
   A: Timestamp
   B: Collège
   C: Prénom
   D: Nom
   E: IP
   F: Pri1
   G: Pri2
   H: Pri3
   I: Pri4
   J: Pri5
   K: Pri6
   ```

---

### 3️⃣ Google Apps Script pas correctement déployé

**Vérifier le déploiement :**
1. Google Sheet → **Extensions → Apps Script**
2. Voir les déploiements (bouton dans le haut)
3. Doit avoir au minimum 1 déploiement

**Si pas de déploiement :**
1. Copier le code de `GOOGLE-APPS-SCRIPT-COMPLET.gs`
2. Coller dans Apps Script (remplacer `myFunction`)
3. **Sauvegarder** (Ctrl+S)
4. **Déployer** → **Nouveau déploiement**
5. Type : **Application Web**
6. Execute as : **[Votre compte]**
7. Who has access : **Anyone**
8. **Déployer**
9. **Copier l'URL** qui s'affiche

---

### 4️⃣ index.html pas à jour

**Vérifier ligne 983 :**
```javascript
const GOOGLE_APPS_SCRIPT_URL = "...";
```

Doit être :
```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw83F_XKi9vEexIPvQWad8JFGz3x4pTxADWx3Ns1N8VZcnquh8KPu2jrSy0FpXImQC9RA/usercontent";
```

**Solutions :**
1. Vérifier l'URL
2. **Recharger la page** (F5 ou Ctrl+Shift+R)
3. Tester à nouveau

---

## 🧪 TEST COMPLET

### Step 1: Vérifier Google Apps Script fonctionne

**Ouvrir :**
```
Google Sheet → Extensions → Apps Script
```

**Exécuter le test :**
1. Select `testScript` (ou `doPost`)
2. Click **Exécuter** (bouton ▶)
3. Voir la console pour les logs

**Résultat attendu :**
```
✅ Toutes les feuilles créées/vérifiées
✅ Statistiques actuelles
✅ Votes par priorité
```

### Step 2: Tester manuellement

**Console Google Apps Script :**
```javascript
// Exécuter cette fonction
function testDoPost() {
  const mockData = {
    ip: "192.168.1.1",
    firstName: "Jean",
    lastName: "Martin",
    priorities: ["Pri1", "Pri2", "Pri3", "Pri4", "Pri5", "Pri6"]
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(mockData)
    }
  });
  
  Logger.log(result);
}
```

### Step 3: Vérifier Google Sheet

**Après exécution :**
1. Aller à feuille "Résultats"
2. Vérifier qu'une nouvelle ligne a été ajoutée
3. ✅ Si oui → Apps Script fonctionne

### Step 4: Vérifier index.html envoie bien

**F12 → Console (navigateur) :**
```
Voter puis regarder les logs
```

**Devrait afficher :**
```
📤 Envoi des données au Google Sheet...
📊 Données à envoyer : {...}
✅ Réponse du serveur : 200
```

**Si vous ne voyez pas ces logs :**
- L'URL n'est pas bonne
- index.html n'est pas à jour
- Le navigateur a caché la page

---

## 🔧 SOLUTION RAPIDE (ESSAYER CECI)

### 1️⃣ Modifier l'URL dans index.html

**Essayer avec `/exec` à la place de `/usercontent` :**

```javascript
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw83F_XKi9vEexIPvQWad8JFGz3x4pTxADWx3Ns1N8VZcnquh8KPu2jrSy0FpXImQC9RA/exec";
```

### 2️⃣ Recharger la page
```
F5 ou Ctrl+Shift+R (vider le cache)
```

### 3️⃣ Tester à nouveau
```
Voter → Vérifier console (F12)
```

### 4️⃣ Si ça marche pas
```
Essayer avec /usercontent à nouveau
```

---

## 📋 CHECKLIST DE DÉPANNAGE

- [ ] Feuille "Résultats" existe ?
- [ ] Google Apps Script est déployé ?
- [ ] URL commence par `https://script.google.com/macros/s/` ?
- [ ] URL finit par `/usercontent` ou `/exec` ?
- [ ] `Who has access` = `Anyone` ?
- [ ] index.html reloaded (F5) ?
- [ ] Console affiche logs ?

---

## 💻 LOG ATTENDU COMPLET

**Si tout fonctionne, vous devriez voir :**

```javascript
// Dans F12 → Console
🔓 Accès libre activé
📤 Envoi des données au Google Sheet...
📊 Données à envoyer : {
  ip: "127.0.0.1",
  firstName: "Jean",
  lastName: "Martin",
  priorities: [6 items],
  timestamp: "7/10/2026 15:30"
}
✅ Réponse du serveur : 200
✅ Réponse enregistrée avec succès dans le Google Sheet
```

**Et dans Google Sheet :**
```
Feuille "Résultats" → Nouvelle ligne avec vos données
```

---

## 🚨 ERREURS COURANTES

### Erreur : "Feuille Résultats introuvable"
```
Cause : La feuille n'existe pas
Solution : La créer dans Google Sheet
```

### Erreur : "Cannot read properties of undefined"
```
Cause : GOOGLE_APPS_SCRIPT_URL n'est pas définie
Solution : Vérifier ligne 983 de index.html
```

### Rien en console (pas de logs)
```
Cause : 
1. index.html pas reloadé
2. URL mal configurée
3. Page en cache

Solution :
1. F5 ou Ctrl+Shift+R
2. Vérifier ligne 983
3. Relancer serveur
```

---

## 📞 ACTIONS À FAIRE MAINTENANT

1. **Vérifier que feuille "Résultats" existe** ← PRIORITÉ 1
2. **Vérifier que Google Apps Script est déployé** ← PRIORITÉ 2
3. **Essayer avec /exec au lieu de /usercontent** ← PRIORITÉ 3
4. **Recharger la page** ← PRIORITÉ 4
5. **Tester un vote et vérifier logs** ← PRIORITÉ 5

---

**Modifié :** 7 octobre 2026
**Status :** 🔍 À DIAGNOSTIQUER

