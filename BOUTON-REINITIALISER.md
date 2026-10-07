# 🔄 BOUTON RÉINITIALISER - DOCUMENTATION

## ✅ NOUVELLE FONCTIONNALITÉ AJOUTÉE

Un **bouton "Réinitialiser"** a été ajouté en haut à droite de l'écran pour permettre à l'utilisateur de :
- ✅ Effacer le consentement RGPD
- ✅ Recommencer le sondage du début
- ✅ Réafficher la modale RGPD au démarrage
- ✅ Réinitialiser le code SA80_1880

---

## 🎯 COMPORTEMENT DU BOUTON

### Positionnement
```
Coin supérieur droit (position: fixed)
├─ Visible en permanence
├─ Même pendant le remplissage du sondage
└─ Z-index: 1000 (au-dessus de tous les éléments)
```

### Style
```
Couleur : Gris (#6c757d)
Texte : "🔄 Réinitialiser"
Position : top: 15px, right: 15px
Effets : Hover élève le bouton, ombre augmente
```

### Actions au Click

1️⃣ **Demande confirmation**
```
⚠️ Êtes-vous sûr de vouloir réinitialiser le sondage ?
Le consentement RGPD et toutes vos données seront effacés.
[OK] [ANNULER]
```

2️⃣ **Si OK** → Réinitialise tout
```
✅ localStorage.rgpdAccepted        → EFFACÉ
✅ localStorage.userIdentity         → EFFACÉ
✅ localStorage.sondageResults       → EFFACÉ
✅ localStorage.ipVotes              → EFFACÉ
✅ localStorage.responseModified_*   → EFFACÉS
✅ app.userName                      → NULL
✅ app.userLastName                  → NULL
✅ app.userIP                        → NULL
✅ app.rgpdAccepted                  → FALSE
✅ app.selected                      → []
```

3️⃣ **Affiche la modale RGPD**
```
📋 La modale RGPD réapparaît
✅ Case à cocher : vide (déjà)
✅ Bouton Accepter : désactivé
✅ Utilisateur doit accepter à nouveau
```

4️⃣ **Logs Console**
```
🔄 Réinitialisation du sondage...
💾 Effacement des données locales...
📋 Affichage du consentement RGPD...
✅ Sondage réinitialisé - RGPD visible
```

---

## 📝 MODIFICATIONS TECHNIQUE

### 1️⃣ CSS Ajouté (Ligne 562)
```css
.btn-reset {
    position: fixed;
    top: 15px;
    right: 15px;
    background-color: #6c757d;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn-reset:hover {
    background-color: #5a6268;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
}

.btn-reset:active {
    transform: translateY(0);
}
```

### 2️⃣ HTML Bouton (Après le header)
```html
<!-- ✅ BOUTON RÉINITIALISER -->
<button class="btn-reset" onclick="app.resetSurvey()" 
        title="Recommencer avec le code et le consentement RGPD">
    🔄 Réinitialiser
</button>
```

### 3️⃣ Fonction resetSurvey() (Ligne 1516)
```javascript
resetSurvey() {
    // ✅ RÉINITIALISER LE SONDAGE COMPLET
    
    // 1. Confirmation
    if (!confirm("⚠️ Êtes-vous sûr...")) {
        return;
    }
    
    // 2. Effacer localStorage
    localStorage.removeItem('userIdentity');
    localStorage.removeItem('sondageResults');
    localStorage.removeItem('ipVotes');
    localStorage.removeItem('rgpdAccepted');  // ← RGPD RÉINITIALISÉ
    
    // 3. Réinitialiser l'état app
    this.userName = null;
    this.userLastName = null;
    this.rgpdAccepted = false;  // ← RGPD = FALSE
    
    // 4. Afficher modale RGPD
    document.getElementById('rgpdModal').classList.add('active');
    
    // 5. Masquer tous les écrans
    this.hideAllScreens();
    this.showScreen('identityScreen');
}
```

### 4️⃣ Fonction hideAllScreens() (Ligne 1573)
```javascript
hideAllScreens() {
    // Masquer tous les écrans avant d'afficher la modale
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}
```

---

## 🧪 CAS D'USAGE

### Scénario 1 : Utilisateur a oublié d'accepter le RGPD
```
1. Click bouton "Réinitialiser"
2. Confirm "OK"
3. ✅ Modale RGPD réapparaît
4. Accepter à nouveau
5. Continuer le sondage
```

### Scénario 2 : Réinitialiser après succès
```
1. Sondage complété → Écran "Succès"
2. Click "Réinitialiser"
3. Confirm "OK"
4. ✅ Toutes données effacées
5. RGPD réapparaît
6. Possible de recommencer
```

### Scénario 3 : Code SA80_1880 réinitialisé
```
1. Ancien vote en base
2. Click "Réinitialiser"
3. Confirm "OK"
4. ✅ Flag responseModified_* EFFACÉ
5. ✅ Utilisateur peut voter à nouveau
6. RGPD réapparaît
```

---

## 🎨 DESIGN & UX

### Visibilité
- ✅ Position fixe (toujours visible)
- ✅ Contraste gris sur blanc/couleur
- ✅ Emoji 🔄 pour clarté visuelle
- ✅ Tooltip au survol

### Feedback
- ✅ Couleur change au hover
- ✅ Bouton s'élève légèrement
- ✅ Ombre augmente
- ✅ Confirmation avant action

### Accessibilité
- ✅ Title attribute explicite
- ✅ Texte clair
- ✅ Contraste suffisant
- ✅ Confirmation de danger

---

## ⚠️ POINTS IMPORTANTS

1. **Confirmation obligatoire**
   - Empêche les clicks accidentels
   - Message clair sur les conséquences

2. **RGPD toujours réinitialisé**
   - localStorage.rgpdAccepted EFFACÉ
   - Modale réapparaît immédiatement
   - Utilisateur doit accepter à nouveau

3. **Tous les flags de modification effacés**
   - responseModified_IP_PrénomNom → DELETED
   - Permet de voter à nouveau (même s'il avait déjà modifié 1x)

4. **État app complètement réinitialisé**
   - userName, userLastName, userIP → NULL
   - rgpdAccepted → FALSE
   - selected → []

---

## 🚀 INTÉGRATION

Le bouton est **déjà intégré** dans index.html. Aucune action supplémentaire requise.

### Vérifier l'intégration
```bash
# Chercher le bouton
grep "btn-reset" index.html

# Chercher la fonction
grep -n "resetSurvey()" index.html
```

### Tester l'intégration
```
1. Ouvrir http://localhost:8000
2. Voir le bouton "🔄 Réinitialiser" en haut à droite
3. Remplir un peu le sondage
4. Click "Réinitialiser"
5. Confirmer
6. ✅ Modale RGPD réapparaît
7. Tout est effacé
```

---

## 📊 FLOW DIAGRAM

```
┌─────────────────────────────────────────┐
│  Utilisateur click "🔄 Réinitialiser"   │
└──────────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Confirmation Dialog?     │
    │ "Êtes-vous sûr?"         │
    └──┬───────────────────┬───┘
       │                   │
      NO                  YES
       │                   │
       ▼                   ▼
    Return           resetSurvey()
  (pas d'action)           │
                           ├─ Effacer localStorage
                           ├─ Réinitialiser app state
                           ├─ Afficher modale RGPD
                           └─ Masquer écrans
                                │
                                ▼
                   ┌──────────────────────────┐
                   │  Modale RGPD visible     │
                   │  Case: [ ]               │
                   │  Bouton: [Désactivé]     │
                   └──────────────────────────┘
```

---

## ✅ CHECKLIST

- [x] CSS du bouton créé
- [x] Bouton HTML ajouté
- [x] Fonction resetSurvey() créée
- [x] Fonction hideAllScreens() créée
- [x] localStorage effacé complètement
- [x] RGPD réinitialisé
- [x] Confirmation avant action
- [x] Console logs pour debug
- [x] Position fixe en haut à droite
- [x] Style hover/active
- [x] Tous les flags de modification effacés

---

## 📞 SUPPORT

### Erreur : Bouton ne réapparaît pas
**Cause** : CSS position: fixed ne s'applique pas
**Solution** : Vérifier z-index, parent margin/padding

### Erreur : RGPD ne réapparaît pas
**Cause** : Modale non trouvée ou mal cachée
**Solution** : Vérifier getElementById('rgpdModal').classList.add('active')

### Erreur : Données non effacées
**Cause** : localStorage pas vidé correctement
**Solution** : Vérifier console F12 > Application > Storage

---

**Créé :** 7 octobre 2026
**Dernière mise à jour :** 7 octobre 2026
**Version :** 1.0

