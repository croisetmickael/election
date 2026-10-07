/**
 * GOOGLE APPS SCRIPT - SONDAGE SPP-PATS 2026
 * Script à copier-coller dans Google Apps Script
 * 
 * Étapes :
 * 1. Ouvrir Google Sheet
 * 2. Extensions → Apps Script
 * 3. Copier-coller ce code entièrement
 * 4. Sauvegarder
 * 5. Déployer → Nouveau déploiement → Application Web
 * 6. Copier l'URL du déploiement
 * 7. Coller dans index.html ligne 983
 */

// ============================================================================
// FONCTION PRINCIPALE - RECEVOIR LES VOTES
// ============================================================================

function doPost(e) {
  try {
    // Récupérer les données envoyées
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir la feuille "Résultats"
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Résultats");
    
    // Vérifier que la feuille existe
    if (!sheet) {
      return createErrorResponse("Erreur : Feuille 'Résultats' introuvable");
    }
    
    // Préparer les données
    const timestamp = new Date().toLocaleString('fr-FR');
    const row = [
      timestamp,
      data.college || '',
      data.firstName || '',
      data.lastName || '',
      data.ip || '',
      data.priorities[0] || '',
      data.priorities[1] || '',
      data.priorities[2] || '',
      data.priorities[3] || '',
      data.priorities[4] || '',
      data.priorities[5] || ''
    ];
    
    // Ajouter la ligne au sheet
    sheet.appendRow(row);
    
    // Log pour debug
    console.log('✅ Vote enregistré :', data.firstName + ' ' + data.lastName);
    
    // Retourner succès
    return createSuccessResponse("Vote enregistré avec succès");
    
  } catch (error) {
    console.error('❌ Erreur :', error);
    return createErrorResponse("Erreur serveur : " + error.toString());
  }
}

// ============================================================================
// FONCTION - CRÉER LES FEUILLES SI N'EXISTENT PAS
// ============================================================================

function createAllSheets() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Créer feuille "Résultats" si elle n'existe pas
    createSheetIfNotExists(spreadsheet, "Résultats", [
      ["Timestamp", "Collège", "Prénom", "Nom", "IP", "Pri1", "Pri2", "Pri3", "Pri4", "Pri5", "Pri6"]
    ]);
    
    // 2. Créer feuille "Officiers"
    createSheetIfNotExists(spreadsheet, "Officiers", [
      ["Revendication", "Nombre de votes"]
    ]);
    
    // 3. Créer feuille "Non-Officiers"
    createSheetIfNotExists(spreadsheet, "Non-Officiers", [
      ["Revendication", "Nombre de votes"]
    ]);
    
    // 4. Créer feuille "PATS"
    createSheetIfNotExists(spreadsheet, "PATS", [
      ["Revendication", "Nombre de votes"]
    ]);
    
    // 5. Créer feuille "Résumé"
    createSheetIfNotExists(spreadsheet, "Résumé", [
      ["Collège", "Nombre de votes", "TOTAL"]
    ]);
    
    console.log("✅ Toutes les feuilles créées/vérifiées");
    
  } catch (error) {
    console.error("❌ Erreur création feuilles :", error);
  }
}

// ============================================================================
// FONCTION HELPER - CRÉER FEUILLE
// ============================================================================

function createSheetIfNotExists(spreadsheet, sheetName, headerRow) {
  try {
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      console.log("📝 Feuille créée : " + sheetName);
    } else {
      console.log("✓ Feuille existe : " + sheetName);
    }
    
    // Ajouter header si la feuille est vide
    if (sheet.getLastRow() === 0 && headerRow && headerRow.length > 0) {
      sheet.appendRow(headerRow[0]);
      
      // Formatter le header (couleur bleue)
      const headerRange = sheet.getRange(1, 1, 1, headerRow[0].length);
      headerRange.setBackground("#003D82");
      headerRange.setFontColor("white");
      headerRange.setFontWeight("bold");
      
      console.log("🎨 Header formaté : " + sheetName);
    }
    
    return sheet;
    
  } catch (error) {
    console.error("❌ Erreur création feuille '" + sheetName + "':", error);
    return null;
  }
}

// ============================================================================
// FONCTION HELPER - RÉPONSE SUCCÈS
// ============================================================================

function createSuccessResponse(message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: message,
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// FONCTION HELPER - RÉPONSE ERREUR
// ============================================================================

function createErrorResponse(message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// FONCTION - COMPTER LES VOTES PAR REVENDICATION
// ============================================================================

function countVotesByPriority() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const resultsSheet = spreadsheet.getSheetByName("Résultats");
    
    if (!resultsSheet) {
      console.log("❌ Feuille Résultats non trouvée");
      return;
    }
    
    // Récupérer toutes les données
    const data = resultsSheet.getDataRange().getValues();
    
    // Initialiser compteurs
    const priorityCounts = {};
    
    // Boucler sur les données (en partant de la ligne 2, passer le header)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Colonnes 5-10 = Pri1-Pri6 (index 5-10)
      for (let j = 5; j <= 10; j++) {
        const priority = row[j];
        if (priority && priority.trim() !== '') {
          priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
        }
      }
    }
    
    // Afficher les résultats
    console.log("📊 Votes par priorité :");
    for (const [priority, count] of Object.entries(priorityCounts)) {
      console.log(`  ${priority}: ${count} votes`);
    }
    
    return priorityCounts;
    
  } catch (error) {
    console.error("❌ Erreur comptage :", error);
  }
}

// ============================================================================
// FONCTION - OBTENIR LES STATS (NOMBRE DE VOTES PAR COLLÈGE)
// ============================================================================

function getStatistics() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const resultsSheet = spreadsheet.getSheetByName("Résultats");
    
    if (!resultsSheet) {
      console.log("❌ Feuille Résultats non trouvée");
      return null;
    }
    
    const data = resultsSheet.getDataRange().getValues();
    
    // Compter par collège
    const collegeCounts = {};
    
    for (let i = 1; i < data.length; i++) {
      const college = data[i][1]; // Colonne B = Collège
      if (college && college.trim() !== '') {
        collegeCounts[college] = (collegeCounts[college] || 0) + 1;
      }
    }
    
    console.log("📊 Votes par collège :");
    let totalVotes = 0;
    for (const [college, count] of Object.entries(collegeCounts)) {
      console.log(`  ${college}: ${count} votes`);
      totalVotes += count;
    }
    console.log(`  TOTAL: ${totalVotes} votes`);
    
    return {
      byCollege: collegeCounts,
      total: totalVotes
    };
    
  } catch (error) {
    console.error("❌ Erreur stats :", error);
    return null;
  }
}

// ============================================================================
// FONCTION - TESTER LE SCRIPT (Exécuter dans l'éditeur)
// ============================================================================

function testScript() {
  console.log("🧪 Test du script Google Apps Script...");
  
  // Créer les feuilles
  console.log("\n1️⃣ Création des feuilles...");
  createAllSheets();
  
  // Obtenir les stats
  console.log("\n2️⃣ Statistiques actuelles...");
  getStatistics();
  
  // Compter par priorité
  console.log("\n3️⃣ Votes par priorité...");
  countVotesByPriority();
  
  console.log("\n✅ Test terminé - Voir la console pour les résultats");
}

