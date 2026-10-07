/**
 * VÉRIFICATION SA80_1880 VIA GOOGLE SHEET
 * 
 * Vérifie UNIQUEMENT via le Google Sheet avec IP + Nom + Prénom
 * 
 * Architecture :
 * Client (JavaScript) → Envoie IP + Nom + Prénom → Google Apps Script
 * Google Apps Script → Cherche dans le Sheet → Retourne OK/KO
 * Client → Affiche le résultat
 */

// ============================================================================
// 1. VÉRIFIER SI L'UTILISATEUR EXISTE DANS LE SHEET
// ============================================================================

async function verifySA80_1880InSheet(ip, firstName, lastName) {
  const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
  
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL") {
    console.error("❌ URL Google Apps Script non configurée");
    return { success: false, error: "URL non configurée" };
  }
  
  try {
    console.log(`🔍 Vérification SA80_1880 : IP=${ip}, Nom=${lastName}, Prénom=${firstName}`);
    
    const payload = {
      action: "verifySA80_1880",
      ip: ip,
      firstName: firstName,
      lastName: lastName,
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    
    // Avec mode 'no-cors', on ne peut pas lire la réponse directement
    // Il faut utiliser une alternative
    console.log("✅ Vérification envoyée au Google Sheet");
    
    return { success: true, message: "Vérification en cours" };
    
  } catch (error) {
    console.error("❌ Erreur lors de la vérification :", error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// 2. VERSION AVEC RÉPONSE (sans CORS)
// ============================================================================

async function verifySA80_1880AndGetResponse(ip, firstName, lastName) {
  const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
  
  try {
    const payload = {
      action: "verifySA80_1880",
      ip: ip,
      firstName: firstName,
      lastName: lastName
    };
    
    // Méthode alternative : utiliser un endpoint qui retourne du texte
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL + "?action=verify&ip=" + encodeURIComponent(ip) + "&firstName=" + encodeURIComponent(firstName) + "&lastName=" + encodeURIComponent(lastName));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log("📊 Résultat vérification :", data);
    
    return {
      success: data.found || false,
      message: data.message,
      exists: data.found,
      data: data
    };
    
  } catch (error) {
    console.error("❌ Erreur :", error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// 3. VÉRIFIER AVANT SOUMISSION
// ============================================================================

async function checkBeforeSA80_1880Submit(ip, firstName, lastName) {
  console.log("🔐 Vérification avant soumission SA80_1880...");
  console.log("   IP:", ip);
  console.log("   Nom:", lastName);
  console.log("   Prénom:", firstName);
  
  const result = await verifySA80_1880AndGetResponse(ip, firstName, lastName);
  
  if (result.success && result.exists) {
    console.log("✅ Utilisateur trouvé dans le Sheet");
    return { verified: true, canSubmit: true };
  } else {
    console.log("❌ Utilisateur NON trouvé - SA80_1880 rejeté");
    return { verified: false, canSubmit: false, error: "Utilisateur non trouvé" };
  }
}

// ============================================================================
// 4. ENREGISTRER LA RÉPONSE SA80_1880 DANS LE SHEET
// ============================================================================

async function recordSA80_1880ToSheet(ip, firstName, lastName, priorities) {
  const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
  
  try {
    console.log("💾 Enregistrement SA80_1880 dans le Sheet...");
    
    const payload = {
      action: "recordSA80_1880",
      ip: ip,
      firstName: firstName,
      lastName: lastName,
      priorities: priorities,
      timestamp: new Date().toISOString(),
      college: "Collège SA80_1880"
    };
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    
    console.log("✅ Réponse SA80_1880 enregistrée");
    
    return { success: true, message: "Enregistrement effectué" };
    
  } catch (error) {
    console.error("❌ Erreur enregistrement :", error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// 5. WORKFLOW COMPLET : VÉRIFIER → ENREGISTRER
// ============================================================================

async function processSA80_1880Workflow(ip, firstName, lastName, priorities) {
  console.log("\n🚀 Workflow SA80_1880 complet");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  // ÉTAPE 1 : Vérifier
  console.log("\n📍 ÉTAPE 1 : Vérification");
  const verificationResult = await checkBeforeSA80_1880Submit(ip, firstName, lastName);
  
  if (!verificationResult.verified) {
    console.log("❌ Vérification échouée - Arrêt du processus");
    return { success: false, error: "Vérification échouée" };
  }
  
  // ÉTAPE 2 : Enregistrer
  console.log("\n📍 ÉTAPE 2 : Enregistrement");
  const recordResult = await recordSA80_1880ToSheet(ip, firstName, lastName, priorities);
  
  if (!recordResult.success) {
    console.log("❌ Enregistrement échoué");
    return { success: false, error: "Enregistrement échoué" };
  }
  
  console.log("\n✅ Workflow SA80_1880 COMPLÈTE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  return { success: true, message: "Workflow complet" };
}

// ============================================================================
// 6. INTÉGRATION AVEC APP.JS
// ============================================================================

// À ajouter dans le submitSurvey() de app.js :
/*

async function submitSurvey() {
  const ip = app.userIP;
  const firstName = app.userName;
  const lastName = app.userLastName;
  const priorities = app.selectedPriorities;
  
  // ✅ VÉRIFICATION SA80_1880 VIA GOOGLE SHEET
  const verification = await checkBeforeSA80_1880Submit(ip, firstName, lastName);
  
  if (!verification.verified) {
    showError("Vérification échouée - Code SA80_1880");
    return;
  }
  
  // ✅ ENREGISTRER DANS LE SHEET
  const record = await recordSA80_1880ToSheet(ip, firstName, lastName, priorities);
  
  if (!record.success) {
    showError("Enregistrement échoué");
    return;
  }
  
  // ✅ SUCCÈS
  showSuccess("Réponse enregistrée");
}

*/
