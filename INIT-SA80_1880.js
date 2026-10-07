/**
 * INITIALISATION DU CODE : SA80_1880
 * 
 * Ajoute la possibilité de réponse "SA80_1880" au système
 * 
 * Utilisation :
 * - Inclure ce script dans index.html
 * - Ou exécuter les fonctions dans la console
 */

// ============================================================================
// 1. INITIALISER LA CLÉ DANS localStorage
// ============================================================================

function initializeSA80_1880() {
  const responseKey = "SA80_1880";
  
  // Vérifier si la clé existe déjà
  if (localStorage.getItem(responseKey)) {
    console.log(`✅ Clé "${responseKey}" déjà initialisée`);
    return;
  }
  
  // Initialiser avec une valeur par défaut
  const initialValue = {
    code: "SA80_1880",
    enabled: true,
    created: new Date().toISOString(),
    activated: false
  };
  
  localStorage.setItem(responseKey, JSON.stringify(initialValue));
  console.log(`✅ Clé "${responseKey}" initialisée avec succès`);
  console.log("Valeur :", initialValue);
}

// ============================================================================
// 2. ACTIVER/DÉSACTIVER SA80_1880
// ============================================================================

function activateSA80_1880() {
  const responseKey = "SA80_1880";
  const current = JSON.parse(localStorage.getItem(responseKey) || '{}');
  
  current.activated = true;
  current.activatedAt = new Date().toISOString();
  
  localStorage.setItem(responseKey, JSON.stringify(current));
  console.log(`✅ Clé "${responseKey}" activée`);
}

function deactivateSA80_1880() {
  const responseKey = "SA80_1880";
  const current = JSON.parse(localStorage.getItem(responseKey) || '{}');
  
  current.activated = false;
  current.deactivatedAt = new Date().toISOString();
  
  localStorage.setItem(responseKey, JSON.stringify(current));
  console.log(`✅ Clé "${responseKey}" désactivée`);
}

// ============================================================================
// 3. VÉRIFIER LE STATUT
// ============================================================================

function checkSA80_1880Status() {
  const responseKey = "SA80_1880";
  const value = localStorage.getItem(responseKey);
  
  if (!value) {
    console.log(`❌ Clé "${responseKey}" non initialisée`);
    return null;
  }
  
  const data = JSON.parse(value);
  console.log(`📊 Statut de "${responseKey}":`, data);
  return data;
}

// ============================================================================
// 4. AJOUTER SA80_1880 AUX RÉPONSES VALIDES
// ============================================================================

function addSA80_1880ToValidResponses() {
  let validResponses = JSON.parse(localStorage.getItem('validResponses') || '[]');
  
  if (!validResponses.includes("SA80_1880")) {
    validResponses.push("SA80_1880");
    localStorage.setItem('validResponses', JSON.stringify(validResponses));
    console.log(`✅ SA80_1880 ajouté à validResponses`);
    console.log("Réponses valides :", validResponses);
  } else {
    console.log(`⚠️ SA80_1880 est déjà dans validResponses`);
  }
}

// ============================================================================
// 5. AJOUTER À LA LISTE DES RÉPONSES ENREGISTRÉES
// ============================================================================

function recordSA80_1880Response(data) {
  const responseData = {
    code: "SA80_1880",
    timestamp: new Date().toISOString(),
    ...data
  };
  
  let responses = JSON.parse(localStorage.getItem('SA80_1880_responses') || '[]');
  responses.push(responseData);
  localStorage.setItem('SA80_1880_responses', JSON.stringify(responses));
  
  console.log(`✅ Réponse SA80_1880 enregistrée`);
  console.log("Réponse :", responseData);
}

// ============================================================================
// 6. EXÉCUTER TOUTE L'INITIALISATION
// ============================================================================

function initializeAllSA80_1880() {
  console.log("🚀 Initialisation de SA80_1880...\n");
  
  initializeSA80_1880();
  console.log("");
  
  addSA80_1880ToValidResponses();
  console.log("");
  
  checkSA80_1880Status();
  console.log("");
  
  console.log("✅ Initialisation complète !");
}

// ============================================================================
// AUTO-INIT AU CHARGEMENT (si inclus dans index.html)
// ============================================================================

if (typeof window !== 'undefined') {
  // Initialiser automatiquement au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeSA80_1880();
      addSA80_1880ToValidResponses();
    });
  } else {
    // DOM déjà chargé
    initializeSA80_1880();
    addSA80_1880ToValidResponses();
  }
}

// ============================================================================
// EXPORT POUR UTILISATION EN MODULE
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeSA80_1880,
    activateSA80_1880,
    deactivateSA80_1880,
    checkSA80_1880Status,
    addSA80_1880ToValidResponses,
    recordSA80_1880Response,
    initializeAllSA80_1880
  };
}
