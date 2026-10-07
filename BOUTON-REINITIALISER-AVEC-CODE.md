# 🔐 BOUTON RÉINITIALISER AVEC VÉRIFICATION DE CODE

## ✅ NOUVELLE FONCTIONNALITÉ

Le bouton "🔄 Réinitialiser" affiche maintenant **une modale de vérification de code** au lieu d'une simple confirmation.

---

## 🎯 COMPORTEMENT

### Avant
```
Click Réinitialiser → Confirmation alert → OK → Réinitialise
```

### Après
```
Click Réinitialiser → Modale avec champ CODE → Entrer code → Valider → Réinitialise
```

---

## 🔑 CODE DE SÉCURITÉ

**Code par défaut :** `SA80_1880`

⚠️ **À PERSONNALISER SI BESOIN** (Ligne 1696 dans index.html)

```javascript
const RESET_CODE = "SA80_1880";  // ← Changer ici si besoin
```

---

## 📝 ÉTAPES DE RÉINITIALISATION

### 1️⃣ Click sur "🔄 Réinitialiser"
- Le bouton est en haut à droite (position fixed)
- Visible partout dans l'app

### 2️⃣ Modale s'affiche
```
┌─────────────────────────────┐
│   🔐 Vérification Sécurité   │
│                             │
│ Veuillez entrer le code de  │
│ réinitialisation pour       │
│ confirmer                   │
│                             │
│ [                         ]  │ ← Champ de code (type password)
│                             │
│  [✓ Valider] [✕ Annuler]  │
└─────────────────────────────┘
```

### 3️⃣ Entrer le code
- Tape : `SA80_1880`
- Ou appuie sur `Entrée` pour valider
- ✅ Si correct → Réinitialise
- ❌ Si incorrect → Message d'erreur

### 4️⃣ Erreur (code incorrect)
```
❌ Code incorrect. Veuillez réessayer.
```
- Le champ se vide
- Focus revient au champ
- Peut retaper le code

### 5️⃣ Succès (code correct)
```
✅ Code correct - Réinitialisation en cours...
```
- Modale ferme
- localStorage.rgpdAccepted EFFACÉ
- Toutes données supprimées
- Modale RGPD réapparaît

---

## 📊 FLUX DIAGRAMME

```
┌─────────────────────────────────┐
│ Click "🔄 Réinitialiser"        │
└────────────┬────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Modale Code s'ouvre│
    │ Focus sur input    │
    └────────┬───────────┘
             │
             ├─ Utilisateur tape le code
             │
             ▼
    ┌────────────────────┐
    │ Click "Valider" OU │
    │ Appuie Entrée      │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Code correct?           │
    └┬───────────────────────┬┘
     │                       │
    NON                      OUI
     │                       │
     ▼                       ▼
  Erreur               Réinitialise
  Message                   │
  "Code"                    ├─ localStorage CLEARED
  "incorrect"               ├─ RGPD = FALSE
  Vide champ               ├─ Modale RGPD s'ouvre
  Retry                    └─ ✅ SUCCÈS
```

---

## 🔐 SÉCURITÉ

### Avant
```
Click Réinitialiser → alert confirm → OK → Trop facile à trichez
```

### Après
```
Click Réinitialiser → Modale → Tape code secret → Beaucoup plus sûr
```

**Avantages :**
- ✅ Code secret requis
- ✅ Pas de confirmation accidentelle
- ✅ Meilleure UX
- ✅ Feedback immédiat (erreur/succès)

---

## 🎨 DESIGN

### Modal
- **Fond** : Noir semi-transparent (rgba 0.6)
- **Contenu** : Blanc, centré, ombré
- **Animation** : Slide-up + fade-in

### Champ de Code
- **Type** : Password (masque les caractères)
- **Texte** : Centré, letter-spacing pour lisibilité
- **Focus** : Bordure bleue + ombre

### Boutons
- **Valider** : Vert (#28a745)
- **Annuler** : Gris (#6c757d)
- **Hover** : Élèvent avec effet

### Messages
- **Erreur** : Rouge (#dc3545)
- **Affichage** : À côté du champ

---

## 💻 CODE IMPLÉMENTATION

### 1️⃣ CSS (Ligne 590)
```css
.reset-code-modal { /* Modal background */ }
.reset-code-modal.active { /* Visible */ }
.reset-code-content { /* Card centered */ }
.reset-code-input { /* Password field */ }
.reset-code-buttons { /* Button layout */ }
.reset-code-error { /* Error message */ }
```

### 2️⃣ HTML (Après modale RGPD)
```html
<div id="resetCodeModal" class="reset-code-modal">
    <div class="reset-code-content">
        <h2>🔐 Vérification Sécurité</h2>
        <p>Veuillez entrer le code de réinitialisation pour confirmer</p>
        <div class="reset-code-error" id="resetCodeError"></div>
        <input type="password" id="resetCodeInput" class="reset-code-input" 
               placeholder="Entrez le code" maxlength="20">
        <div class="reset-code-buttons">
            <button class="reset-code-btn reset-code-btn-confirm" 
                    onclick="app.confirmResetWithCode()">
                ✓ Valider
            </button>
            <button class="reset-code-btn reset-code-btn-cancel" 
                    onclick="app.cancelResetCode()">
                ✕ Annuler
            </button>
        </div>
    </div>
</div>
```

### 3️⃣ JavaScript
```javascript
// Afficher la modale
resetSurvey() {
    const resetCodeModal = document.getElementById('resetCodeModal');
    resetCodeModal.classList.add('active');
    // Focus sur le champ
}

// Vérifier le code
confirmResetWithCode() {
    const code = document.getElementById('resetCodeInput').value;
    const RESET_CODE = "SA80_1880";
    
    if (code !== RESET_CODE) {
        // Erreur
        return;
    }
    
    // Code correct → Réinitialise tout
    localStorage.removeItem('rgpdAccepted');
    // ... plus de nettoyage
}

// Annuler
cancelResetCode() {
    const resetCodeModal = document.getElementById('resetCodeModal');
    resetCodeModal.classList.remove('active');
}
```

### 4️⃣ Touche Entrée
```javascript
document.getElementById('resetCodeInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        app.confirmResetWithCode();
    }
});
```

---

## 🧪 TEST

### Scénario 1 : Code correct
```
1. Click "Réinitialiser"
2. Modale affiche
3. Tape : SA80_1880
4. Click "Valider" (ou Entrée)
5. ✅ Modale ferme
6. ✅ RGPD réapparaît
7. ✅ Tout est effacé
```

### Scénario 2 : Code incorrect
```
1. Click "Réinitialiser"
2. Modale affiche
3. Tape : WRONG123
4. Click "Valider"
5. ❌ Message d'erreur apparaît
6. Champ se vide
7. Focus retour au champ
8. Peut retaper
```

### Scénario 3 : Annuler
```
1. Click "Réinitialiser"
2. Modale affiche
3. Click "Annuler"
4. ✅ Modale ferme
5. ✅ Rien ne se passe
6. Retour à l'app normale
```

---

## ⚙️ CONFIGURATION

### Changer le code
**Fichier :** index.html, Ligne 1696

**Avant :**
```javascript
const RESET_CODE = "SA80_1880";
```

**Après (exemple) :**
```javascript
const RESET_CODE = "MaClé2026";  // ← Votre code
```

⚠️ **Important** : Le code doit être secret et connu des administrateurs seulement

---

## 🚀 INTÉGRATION

Tout est **déjà intégré** dans index.html. Aucune action supplémentaire requise.

### Vérifier l'intégration
```bash
# Chercher la modale
grep "resetCodeModal" index.html

# Chercher les fonctions
grep -n "confirmResetWithCode\|cancelResetCode" index.html
```

---

## 📞 FAQ

### Q : Quel est le code par défaut ?
**R :** `SA80_1880`

### Q : Je veux changer le code
**R :** Ligne 1696 : `const RESET_CODE = "VOTRE_CODE"`

### Q : Pourquoi password au lieu de text ?
**R :** Masque le code à l'écran (sécurité visuelle)

### Q : Puis-je appuyer sur Entrée ?
**R :** Oui, auto-valide le code

### Q : Que se passe-t-il si je tape mal ?
**R :** Message d'erreur, champ vide, peut retaper

### Q : Je peux annuler ?
**R :** Oui, bouton "Annuler" ferme la modale sans réinitialiser

---

## ✅ CHECKLIST

- [x] Modal HTML créée
- [x] CSS complet (animation, hover, etc.)
- [x] Fonction resetSurvey() affiche modal
- [x] Fonction confirmResetWithCode() valide code
- [x] Fonction cancelResetCode() annule
- [x] Listener Entrée sur le champ
- [x] Messages d'erreur affichés
- [x] localStorage bien effacé
- [x] RGPD réapparaît

---

## 🎯 RÉSUMÉ

**Avant :** ❌ Simple alert confirm (facile à trichez)
**Après :** ✅ Modale avec code secret (sécurisé)

**Code :** `SA80_1880` (à personnaliser)
**Statut :** ✅ Prêt à l'emploi

---

**Créé :** 7 octobre 2026
**Version :** 2.0 Avec vérification de code
**Prêt pour production :** ✅ OUI

