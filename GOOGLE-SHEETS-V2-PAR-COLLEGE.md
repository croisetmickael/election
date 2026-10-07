# 📊 GOOGLE SHEETS - Récolte par Collège (V2)

**Mise à jour : 07/10/2026 - Organiser résultats par collège**

---

## 🎯 RÉSUMÉ

Structure Google Sheets **organisée par collège** :

```
Feuille 1: "Résultats" (données brutes)
Feuille 2: "Officiers" (votes Collège Officiers)
Feuille 3: "Non-Officiers" (votes Collège SPP)
Feuille 4: "PATS" (votes Collège PATS)
Feuille 5: "Résumé" (statistiques)
```

Chaque collège a sa propre feuille avec ses votes = **Analyse facile par collège** ✅

---

## 📋 STRUCTURE DES DONNÉES

### Feuille "Résultats" (BRUTE)

Toutes les données en un endroit :

```
| Timestamp      | Collège    | Prénom | Nom     | IP          | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:30 | Officiers  | Marie  | Dupont  | 192.1.1.100 | Adé  | Régime | Cohé | ... | ... | ... |
| 07/10 14:35 | Officiers  | Jean   | Martin  | 203.5.6.77  | Sim  | Post  | Activ | ... | ... | ... |
| 07/10 14:40 | Non-Off    | Pierre | Leblanc | 210.1.2.33  | Eff  | Sécu  | Tra  | ... | ... | ... |
```

---

### Feuille "Officiers" (PAR COLLÈGE)

```
| Timestamp      | Prénom | Nom     | IP          | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:30 | Marie  | Dupont  | 192.1.1.100 | Adé  | Régime | Cohé | ... | ... | ... |
| 07/10 14:35 | Jean   | Martin  | 203.5.6.77  | Sim  | Post  | Activ | ... | ... | ... |
```

**Avantage :** Seulement les votes du collège Officiers = Facile à analyser !

---

### Feuille "Non-Officiers" (PAR COLLÈGE)

```
| Timestamp      | Prénom | Nom     | IP          | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:40 | Pierre | Leblanc | 210.1.2.33  | Eff  | Sécu  | Tra  | ... | ... | ... |
```

---

### Feuille "PATS" (PAR COLLÈGE)

```
| Timestamp      | Prénom | Nom     | IP          | Pri1 | Pri2 | Pri3 | Pri4 | Pri5 | Pri6 |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:50 | Anne   | Rousseau| 198.7.8.9   | Acav | Télé | TMS  | ... | ... | ... |
```

---

### Feuille "Résumé" (STATISTIQUES)

```
| Collège      | Nombre de votes |
|---|---|
| Officiers    | 15 |
| Non-Officiers| 28 |
| PATS         | 12 |
| TOTAL        | 55 |
```

---

## 🚀 INSTALLATION ÉTAPE PAR ÉTAPE

### Étape 1 : Créer Google Sheet

```
1. Aller à https://sheets.google.com
2. Cliquer "+ Créer un nouveau classeur"
3. Nommer : "Sondage SPP-PATS 2026"
4. Noter l'ID du Sheet (URL) :
   https://docs.google.com/spreadsheets/d/[ID_ICI]/edit
   └─ Copier [ID_ICI]
```

**ID à utiliser :** Garder pour étape 3

---

### Étape 2 : Ajouter Apps Script

```
1. Dans la feuille Google Sheet
2. Menu → Extensions > Apps Script
3. Une fenêtre s'ouvre avec l'éditeur de code
4. Supprimer le code par défaut (myFunction)
5. Copier TOUT le code du fichier : google-apps-script-v2.js
6. Coller dans l'éditeur
7. Ligne 10 : Remplacer l'ID du Sheet
   const SHEET_ID = "VOTRE_ID_ICI";
       ↑ Mettre votre ID de l'étape 1
8. Enregistrer (Ctrl+S)
```

---

### Étape 3 : Déployer le Script

```
1. Menu > "Nouveau déploiement"
2. Sélectionner type : "Application Web"
3. Configurer le nouveau déploiement :
   - Exécuter en tant que : Votre compte Google
   - Qui a accès : "N'importe qui"
4. Cliquer "Déployer"
5. Copier l'URL du déploiement
   https://script.google.com/macros/d/[ID]/userwithscript
```

**URL à utiliser :** Garder pour étape 4

---

### Étape 4 : Activer dans index.html

```html
<!-- Fichier index.html, ligne ~796 -->

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/[ID]/userwithscript";
                                ↑ Mettre votre URL de l'étape 3
```

---

### Étape 5 : Initialiser les feuilles (optionnel)

Pour créer la structure automatiquement :

```
1. Retour dans Apps Script
2. Menu "Exécuter" > cliquer "initializeSheets"
3. Autoriser l'accès
4. Les feuilles sont créées
```

**Ou créer manuellement :**
```
1. Dans Google Sheet
2. Clic droit sur l'onglet "Feuille 1"
3. Ajouter feuille pour chaque collège
4. Nommer : Résultats, Officiers, Non-Officiers, PATS, Résumé
```

---

## 📊 FORMAT DES COLONNES

### Tous les collèges

```
Col A: Timestamp      (Date/Heure)
Col B: Prénom         (Texte)
Col C: Nom            (Texte)
Col D: IP             (Texte)
Col E-J: Priorité 1-6 (Texte)
```

### Feuille "Résultats" SEULEMENT

```
Col A: Timestamp
Col B: Collège        ← SUPPLÉMENTAIRE (pour identifier le collège)
Col C: Prénom
Col D: Nom
Col E: IP
Col F-K: Priorité 1-6
```

---

## 🔄 FLUX DONNÉES

```
App HTML (index.html)
    ↓
    Vote enregistré localement (localStorage)
    ↓
    Envoi POST via fetch() → Google Apps Script
    ↓
    Apps Script reçoit JSON :
    {
      timestamp: "07/10/2026 14:30:45",
      college: "Collège Officiers",
      firstName: "Marie",
      lastName: "Dupont",
      ip: "192.168.1.100",
      priorities: ["Priorité 1", "Priorité 2", ...]
    }
    ↓
    Ajouter dans "Résultats" (brut)
    Ajouter dans "Officiers" (par collège)
    Mettre à jour "Résumé" (stats)
    ↓
    Réponse JSON → OK
```

---

## 🧪 TEST LOCAL

### Sans Google Sheets

La déjà sur localhost :

```javascript
// Dans index.html, ligne 796
const GOOGLE_APPS_SCRIPT_URL = ""; // Vide = désactivé

// Voter = enregistré dans localStorage seulement
// Google Sheets N'est PAS appelé
```

### Avec Google Sheets

```javascript
// Dans index.html, ligne 796
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/...";

// Voter = enregistré dans localStorage ET Google Sheets
```

---

## 📈 EXEMPLE COMPLET

### Scénario : 3 votes (1 par collège)

**Vote 1 :**
```json
{
  "timestamp": "07/10/2026 14:30",
  "college": "Collège Officiers",
  "firstName": "Marie",
  "lastName": "Dupont",
  "ip": "192.1.1.100",
  "priorities": ["Adéquation Grade", "Régime SHR", "Cohésion", "Simplif", "Activité", "RIE"]
}
```

**Vote 2 :**
```json
{
  "timestamp": "07/10/2026 14:35",
  "college": "Collège Non-Officiers SPP",
  "firstName": "Pierre",
  "lastName": "Martin",
  "ip": "203.5.6.77",
  "priorities": ["Effectifs", "Sécurité", "Travail", "Reconnaissance", "Évolution", "Revalorisation"]
}
```

**Vote 3 :**
```json
{
  "timestamp": "07/10/2026 14:40",
  "college": "Collège PATS",
  "firstName": "Anne",
  "lastName": "Rousseau",
  "ip": "210.1.2.33",
  "priorities": ["Avancement", "Télétravail", "TMS", "Prévention", "Maladie grave", "RIFSEEP"]
}
```

### Résultat dans Google Sheets :

**Feuille "Résultats" (BRUTE)** :
```
| Timestamp         | Collège      | Prénom | Nom      | IP        | Pri1      | Pri2      | Pri3     | Pri4      | Pri5      | Pri6           |
|---|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:30       | Officiers    | Marie  | Dupont   | 192.1.1.100| Adéquation| Régime SHR| Cohésion| Simplif   | Activité  | RIE            |
| 07/10 14:35       | Non-Officiers| Pierre | Martin   | 203.5.6.77| Effectifs| Sécurité  | Travail | Reconnaiss| Évolution | Revalorisat    |
| 07/10 14:40       | PATS         | Anne   | Rousseau | 210.1.2.33| Avancemnt| Télétravl| TMS     | Prévention| Mal grave | RIFSEEP       |
```

**Feuille "Officiers"** :
```
| Timestamp         | Prénom | Nom      | IP        | Pri1      | Pri2      | Pri3     | Pri4      | Pri5      | Pri6           |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:30       | Marie  | Dupont   | 192.1.1.100| Adéquation| Régime SHR| Cohésion| Simplif   | Activité  | RIE            |
```

**Feuille "Non-Officiers"** :
```
| Timestamp         | Prénom | Nom      | IP        | Pri1      | Pri2      | Pri3     | Pri4      | Pri5      | Pri6           |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:35       | Pierre | Martin   | 203.5.6.77| Effectifs| Sécurité  | Travail | Reconnaiss| Évolution | Revalorisat    |
```

**Feuille "PATS"** :
```
| Timestamp         | Prénom | Nom      | IP        | Pri1      | Pri2      | Pri3     | Pri4      | Pri5      | Pri6           |
|---|---|---|---|---|---|---|---|---|---|
| 07/10 14:40       | Anne   | Rousseau | 210.1.2.33| Avancemnt| Télétravl| TMS     | Prévention| Mal grave | RIFSEEP       |
```

**Feuille "Résumé"** :
```
| Collège        | Nombre de votes |
|---|---|
| Officiers      | 1 |
| Non-Officiers  | 1 |
| PATS           | 1 |
| TOTAL          | 3 |
```

---

## 🔧 MODIFICATION DE LA STRUCTURE

### Ajouter colonne

Exemple : Ajouter numéro d'agent

```javascript
// Dans google-apps-script-v2.js, fonction addResultRaw

ws.appendRow([
    data.timestamp || new Date().toLocaleString('fr-FR'),
    data.college || '',
    data.agentNumber || '',  // ← NOUVEAU
    data.firstName || '',
    ...
]);

// Dans index.html, submitSurvey()
const surveyData = {
    college: college.name,
    agentNumber: document.getElementById('agentNumber').value,  // ← NOUVEAU
    ...
};
```

---

### Supprimer colonne

Exemple : Supprimer la colonne "IP"

```javascript
// Dans google-apps-script-v2.js, supprimer la ligne IP

ws.appendRow([
    data.timestamp,
    data.college,
    data.firstName,  // ← sans l'IP
    data.lastName,
    data.priorities[0],
    ...
]);
```

---

## 📋 UTILISER LES DONNÉES

### Analyser par collège

```
1. Ouvrir Google Sheet
2. Cliquer sur onglet "Officiers"
3. Voir tous les votes du collège Officiers
4. Utiliser fonction "Tri" ou "Filtre"
5. Créer graphique / pivot
```

### Créer Graphique

```
1. Sélectionner données colonne "Priorité 1"
2. Menu > Insérer > Graphique
3. Choisir type (histogramme / pie)
4. "Priorité 1" en X, compteur en Y
5. Voir résultats visuellement
```

### Créer Tableau Croisé

```
1. Menu > Données > Tableau croisé dynamique
2. Ajouter :
   - Lignes : Priorité 1
   - Valeurs : Compteur
3. Voir classement des priorités par collège
```

---

## ⚠️ ERREURS COURANTES

### Erreur : "Appel de service Apps Script échoué"

```
Cause : GOOGLE_APPS_SCRIPT_URL est mauvaise
Solution :
  1. Copier URL de déploiement exactement
  2. Vérifier pas d'espaces
  3. Vérifier HTTPS (pas HTTP)
  4. Redéployer si besoin
```

### Erreur : "Permission refusée"

```
Cause : Apps Script pas autorisé à accéder au Sheet
Solution :
  1. Retour dans Apps Script
  2. Cliquer "Exécuter" sur doPost
  3. Autoriser l'accès
  4. Accepter les permissions
```

### Erreur : "La feuille 'Résultats' n'existe pas"

```
Cause : Structure non créée
Solution :
  1. Exécuter initializeSheets() (voir Étape 5)
  2. Ou créer manuellement les feuilles
```

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Google Sheet créé
- [ ] ID du Sheet copié
- [ ] Apps Script déployé
- [ ] URL de déploiement copiée
- [ ] index.html mis à jour avec URL
- [ ] Feuilles créées (ou initializeSheets exécuté)
- [ ] Test local : voter → Google Sheet mise à jour ✓
- [ ] Test sur Vercel : voter → Google Sheet mise à jour ✓
- [ ] Colonnes vérifiées
- [ ] Résumé automatique se met à jour

---

## 📞 SUPPORT

**Question ?** Vérifier :
- Code erreur exact dans console (F12)
- ID du Sheet est-il correct ?
- URL de déploiement est-elle complète ?
- Les feuilles existent-elles ?

---

## 🎁 BONUS : Formules Google Sheets utiles

### Compter votes par priorité

```
=COUNTIF(Officiers!E:E,"Adéquation Grade")
```

### Classer priorités

```
Créer tableau avec priorités + compteurs
Utiliser SORT() pour trier décroissant
```

### Pourcentage par collège

```
=Officiers!A:A) / COUNTA(Résultats!A:A) * 100
```

---

**Version 2.0 - Par Collège - Production Ready ✅**
