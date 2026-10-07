/**
 * GOOGLE APPS SCRIPT - VÉRIFICATION SA80_1880
 * 
 * Fonctions côté serveur pour vérifier IP + Nom + Prénom dans le Sheet
 * 
 * À ajouter dans le Apps Script du Google Sheet
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const SHEET_ID = "17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q";
const VERIFICATION_SHEET_NAME = "Résultats"; // Feuille où on cherche les données

// ============================================================================
// 1. FONCTION DE RÉCEPTION DES DONNÉES (doPost)
// ============================================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    console.log("📍 Action reçue :", action);
    console.log("📊 Données :", data);
    
    let response = {};
    
    if (action === "verifySA80_1880") {
      response = verifySA80_1880InSheetServer(data);
    } else if (action === "recordSA80_1880") {
      response = recordSA80_1880InSheet(data);
    } else {
      response = { success: false, error: "Action inconnue" };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("❌ Erreur :", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// 2. FONCTION doGet POUR VÉRIFICATION VIA URL
// ============================================================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    const ip = e.parameter.ip;
    const firstName = e.parameter.firstName;
    const lastName = e.parameter.lastName;
    
    let response = {};
    
    if (action === "verify") {
      response = verifySA80_1880InSheetServer({
        ip: ip,
        firstName: firstName,
        lastName: lastName
      });
    } else {
      response = { success: false, error: "Action inconnue" };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("❌ Erreur GET :", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// 3. VÉRIFIER DANS LE SHEET (IP + NOM + PRÉNOM)
// ============================================================================

function verifySA80_1880InSheetServer(data) {
  const ip = data.ip;
  const firstName = data.firstName;
  const lastName = data.lastName;
  
  console.log("🔍 Vérification SA80_1880 (serveur)");
  console.log("   IP:", ip);
  console.log("   Nom:", lastName);
  console.log("   Prénom:", firstName);
  
  if (!ip || !firstName || !lastName) {
    return {
      success: false,
      found: false,
      error: "IP, Nom ou Prénom manquant"
    };
  }
  
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(VERIFICATION_SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        found: false,
        error: `Feuille "${VERIFICATION_SHEET_NAME}" non trouvée`
      };
    }
    
    // Récupérer toutes les données
    const data = sheet.getDataRange().getValues();
    
    console.log("📊 Total lignes dans le sheet :", data.length);
    
    // Parcourir les lignes (commencer à 1 pour sauter le header)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Structure : [Timestamp, Collège, Prénom, Nom, IP, Pri1, Pri2, ...]
      const rowIP = row[4] ? row[4].toString().trim() : "";
      const rowFirstName = row[2] ? row[2].toString().trim() : "";
      const rowLastName = row[3] ? row[3].toString().trim() : "";
      
      // Comparaison (case-insensitive pour les noms)
      if (rowIP === ip && 
          rowFirstName.toLowerCase() === firstName.toLowerCase() &&
          rowLastName.toLowerCase() === lastName.toLowerCase()) {
        
        console.log("✅ Utilisateur trouvé à la ligne", i + 1);
        
        return {
          success: true,
          found: true,
          message: "Utilisateur trouvé",
          rowIndex: i + 1,
          userData: {
            ip: rowIP,
            firstName: rowFirstName,
            lastName: rowLastName
          }
        };
      }
    }
    
    console.log("❌ Utilisateur NON trouvé");
    
    return {
      success: true,
      found: false,
      message: "Utilisateur non trouvé",
      searchedFor: { ip, firstName, lastName }
    };
    
  } catch (error) {
    console.error("❌ Erreur vérification :", error);
    return {
      success: false,
      found: false,
      error: error.message
    };
  }
}

// ============================================================================
// 4. ENREGISTRER LA RÉPONSE SA80_1880 DANS LE SHEET
// ============================================================================

function recordSA80_1880InSheet(data) {
  const ip = data.ip;
  const firstName = data.firstName;
  const lastName = data.lastName;
  const priorities = data.priorities || [];
  const college = "Collège SA80_1880";
  const timestamp = new Date().toISOString();
  
  console.log("💾 Enregistrement SA80_1880");
  console.log("   IP:", ip);
  console.log("   Nom:", lastName);
  console.log("   Prénom:", firstName);
  
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(VERIFICATION_SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        error: `Feuille "${VERIFICATION_SHEET_NAME}" non trouvée`
      };
    }
    
    // Construire la ligne à ajouter
    // Structure : [Timestamp, Collège, Prénom, Nom, IP, Pri1, Pri2, Pri3, Pri4, Pri5, Pri6]
    const newRow = [
      timestamp,
      college,
      firstName,
      lastName,
      ip,
      priorities[0] || "",
      priorities[1] || "",
      priorities[2] || "",
      priorities[3] || "",
      priorities[4] || "",
      priorities[5] || ""
    ];
    
    // Ajouter la ligne au sheet
    sheet.appendRow(newRow);
    
    console.log("✅ Ligne enregistrée");
    
    // Mettre à jour le résumé
    updateSummaryForSA80_1880(ss);
    
    return {
      success: true,
      message: "Réponse SA80_1880 enregistrée",
      rowAdded: sheet.getLastRow(),
      data: {
        timestamp: timestamp,
        ip: ip,
        firstName: firstName,
        lastName: lastName,
        priorities: priorities
      }
    };
    
  } catch (error) {
    console.error("❌ Erreur enregistrement :", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// 5. METTRE À JOUR LE RÉSUMÉ (feuille "Résumé")
// ============================================================================

function updateSummaryForSA80_1880(ss) {
  try {
    const summarySheet = ss.getSheetByName("Résumé");
    if (!summarySheet) return;
    
    const resultsSheet = ss.getSheetByName(VERIFICATION_SHEET_NAME);
    if (!resultsSheet) return;
    
    // Compter les votes pour SA80_1880
    const data = resultsSheet.getDataRange().getValues();
    let count = 0;
    
    for (let i = 1; i < data.length; i++) {
      const college = data[i][1] ? data[i][1].toString() : "";
      if (college === "Collège SA80_1880") {
        count++;
      }
    }
    
    // Trouver et mettre à jour la ligne SA80_1880 dans le résumé
    const summaryData = summarySheet.getDataRange().getValues();
    
    for (let i = 1; i < summaryData.length; i++) {
      const collegeName = summaryData[i][0] ? summaryData[i][0].toString() : "";
      if (collegeName === "Collège SA80_1880" || collegeName === "SA80_1880") {
        summarySheet.getRange(i + 1, 2).setValue(count);
        console.log("✅ Résumé mis à jour : SA80_1880 =", count, "votes");
        break;
      }
    }
    
  } catch (error) {
    console.error("⚠️ Erreur mise à jour résumé :", error);
  }
}

// ============================================================================
// 6. FONCTION DE TEST
// ============================================================================

function testSA80_1880Verification() {
  console.log("\n🧪 TEST VÉRIFICATION SA80_1880\n");
  
  // Test 1 : Utilisateur inexistant
  console.log("Test 1 : Utilisateur inexistant");
  const result1 = verifySA80_1880InSheetServer({
    ip: "192.168.1.999",
    firstName: "TestPrenom",
    lastName: "TestNom"
  });
  console.log("Résultat :", result1);
  
  // Test 2 : Enregistrer une réponse
  console.log("\nTest 2 : Enregistrer une réponse");
  const result2 = recordSA80_1880InSheet({
    ip: "192.168.1.100",
    firstName: "Marie",
    lastName: "Dupont",
    priorities: ["Priorité 1", "Priorité 2", "Priorité 3", "Priorité 4", "Priorité 5", "Priorité 6"]
  });
  console.log("Résultat :", result2);
  
  console.log("\n✅ Tests complétés\n");
}
