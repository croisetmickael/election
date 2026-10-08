# 🧪 TEST FINAL - VÉRIFIER QUE LES VOTES REMONTENT

## ✅ CONFIGURATION COMPLÈTE

**URL Google Apps Script :** Configurée ✓
**index.html :** Mis à jour ✓

---

## 🚀 TESTER MAINTENANT

### Étape 1️⃣ : Lancer le serveur local
```bash
cd /mnt/user-data/outputs
python3 -m http.server 8000
```

### Étape 2️⃣ : Ouvrir dans le navigateur
```
http://localhost:8000
```

### Étape 3️⃣ : Tester un vote

**Formulaire :**
```
1. Accepter RGPD ✓
2. Entrer identité :
   - Prénom : Jean
   - Nom : Martin
3. Choisir collège : Officiers
4. Sélectionner 6 priorités (cliquer sur 6 revendications)
5. Click "Valider mon sondage"
```

### Étape 4️⃣ : Vérifier dans Google Sheet

**Pendant le test :**
1. Ouvrir le Google Sheet : https://docs.google.com/spreadsheets/d/17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q/edit
2. Aller à la feuille "Résultats"
3. **Vous devriez voir une nouvelle ligne** avec :
   ```
   | Timestamp | Collège | Prénom | Nom | IP | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
   | 7/10 14:45| Officiers| Jean | Martin | 127.0.0.1 | [6 priorités] |
   ```

---

## 🔍 VÉRIFIER DANS LE NAVIGATEUR (F12 → Console)

**Après avoir voté, vous devriez voir :**

```
🔓 Accès libre activé - Pas de vérification SA80_1880
   IP: 127.0.0.1
   Nom: Martin
   Prénom: Jean
💾 Enregistrement de la réponse SA80_1880...
📤 Envoi des données au Google Sheet...
📊 Données à envoyer : {ip: "127.0.0.1", firstName: "Jean", ...}
✅ Réponse du serveur : 200
✅ Réponse enregistrée avec succès dans le Google Sheet
```

---

## ✅ RÉSULTAT ATTENDU

### Dans Google Sheet (feuille "Résultats")
```
Nouvelle ligne avec :
- Timestamp : Heure du vote
- Collège : Officiers / SPP / PATS
- Prénom : Votre prénom
- Nom : Votre nom
- IP : 127.0.0.1 (localhost)
- Pri1-Pri6 : Les 6 priorités que vous avez sélectionnées
```

### Dans le navigateur
```
✅ Écran "Merci pour votre participation"
✅ Affichage du classement de vos 6 priorités
✅ Bouton "Participer à un autre collège"
```

---

## 🐛 DÉPANNAGE

### Les données ne remontent pas

**Vérifier :**

1. **Google Apps Script déployé ?**
   ```
   Google Sheet → Extensions → Apps Script → Voir les déploiements
   Doit avoir au moins 1 déploiement actif
   ```

2. **URL correcte dans index.html ?**
   ```
   Ligne 983 : const GOOGLE_APPS_SCRIPT_URL = "..."
   Doit être : https://script.google.com/macros/s/AKfycbw.../usercontent
   ```

3. **Feuille "Résultats" existe ?**
   ```
   Google Sheet → Feuille "Résultats" doit exister
   Colonnes : Timestamp, Collège, Prénom, Nom, IP, Pri1-Pri6
   ```

4. **Console pour les erreurs**
   ```
   F12 → Console → Chercher les messages ❌ ou ⚠️
   ```

### Erreur : "Feuille Résultats introuvable"

```
Solution : 
1. Google Sheet
2. Click "+"
3. Créer feuille "Résultats"
4. Ajouter headers
5. Redéployer Google Apps Script
```

### Erreur CORS

```
Solution :
1. Vérifier que /usercontent est à la fin de l'URL
2. Vérifier que "Who has access" = "Anyone"
3. Redéployer si besoin
```

---

## 📊 RÉSULTAT FINAL

Si tout fonctionne :
- ✅ Vote enregistré localement
- ✅ Données envoyées au Google Sheet
- ✅ Nouvelle ligne dans la feuille "Résultats"
- ✅ Écran de succès affiché

---

## 🎯 PROCHAINES ÉTAPES

### Si le test réussit :
1. ✅ Déployer en production (Vercel)
2. ✅ Partager le lien avec les votants
3. ✅ Monitorer les votes dans Google Sheet

### Si des problèmes :
1. Voir la section "Dépannage" ci-dessus
2. Vérifier les fichiers de configuration
3. Relancer le serveur local

---

## 📞 SUPPORT

**Fichiers de référence :**
- `CONFIGURATION-FINALE.md` - Configuration complète
- `INSTALLATION-GOOGLE-APPS-SCRIPT.md` - Guide détaillé
- `TEST-ACCES-LIBRE.md` - Scénarios de test complets

---

**Status :** ✅ **PRÊT À TESTER**

Lancez le serveur et testez maintenant ! 🚀

