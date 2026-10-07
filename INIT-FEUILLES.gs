/**
 * SCRIPT D'INITIALISATION - Crée les 5 feuilles automatiquement
 * 
 * À EXÉCUTER UNE SEULE FOIS dans Apps Script
 * 
 * INSTRUCTIONS :
 * 1. Ouvrir Google Sheet
 * 2. Extensions > Apps Script
 * 3. Copier ce code dans l'éditeur
 * 4. Cliquer le bouton ▶ "Exécuter" (ou appuyer Ctrl+Entrée)
 * 5. Autoriser l'accès si demandé
 * 6. Les 5 feuilles sont créées ! ✅
 */

function initializeSheets() {
  const SHEET_ID = "17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q";
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Supprimer la feuille par défaut "Feuille1" si elle existe
  const defaultSheet = ss.getSheetByName("Feuille1");
  if (defaultSheet) {
    ss.deleteSheet(defaultSheet);
  }
  
  // 1. FEUILLE "Résultats" (données brutes)
  createSheetResultats(ss);
  
  // 2. FEUILLE "Officiers"
  createSheetOfficiers(ss);
  
  // 3. FEUILLE "Non-Officiers"
  createSheetNonOfficiers(ss);
  
  // 4. FEUILLE "PATS"
  createSheetPATS(ss);
  
  // 5. FEUILLE "Résumé"
  createSheetResume(ss);
  
  SpreadsheetApp.flush();
  Logger.log("✅ Toutes les feuilles créées avec succès !");
}

function createSheetResultats(ss) {
  let sheet = ss.getSheetByName("Résultats");
  if (!sheet) {
    sheet = ss.insertSheet("Résultats");
  }
  
  // Ajouter en-têtes
  sheet.appendRow([
    "Timestamp",
    "Collège",
    "Prénom",
    "Nom",
    "IP",
    "Priorité 1",
    "Priorité 2",
    "Priorité 3",
    "Priorité 4",
    "Priorité 5",
    "Priorité 6"
  ]);
  
  // Formater le header
  let headerRange = sheet.getRange("A1:K1");
  headerRange.setBackground("#003D82");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  
  Logger.log("✅ Feuille 'Résultats' créée");
}

function createSheetOfficiers(ss) {
  let sheet = ss.getSheetByName("Officiers");
  if (!sheet) {
    sheet = ss.insertSheet("Officiers");
  }
  
  // Ajouter en-têtes
  sheet.appendRow([
    "Timestamp",
    "Prénom",
    "Nom",
    "IP",
    "Priorité 1",
    "Priorité 2",
    "Priorité 3",
    "Priorité 4",
    "Priorité 5",
    "Priorité 6"
  ]);
  
  // Formater le header
  let headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#003D82");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  
  Logger.log("✅ Feuille 'Officiers' créée");
}

function createSheetNonOfficiers(ss) {
  let sheet = ss.getSheetByName("Non-Officiers");
  if (!sheet) {
    sheet = ss.insertSheet("Non-Officiers");
  }
  
  // Ajouter en-têtes
  sheet.appendRow([
    "Timestamp",
    "Prénom",
    "Nom",
    "IP",
    "Priorité 1",
    "Priorité 2",
    "Priorité 3",
    "Priorité 4",
    "Priorité 5",
    "Priorité 6"
  ]);
  
  // Formater le header
  let headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#E31C23");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  
  Logger.log("✅ Feuille 'Non-Officiers' créée");
}

function createSheetPATS(ss) {
  let sheet = ss.getSheetByName("PATS");
  if (!sheet) {
    sheet = ss.insertSheet("PATS");
  }
  
  // Ajouter en-têtes
  sheet.appendRow([
    "Timestamp",
    "Prénom",
    "Nom",
    "IP",
    "Priorité 1",
    "Priorité 2",
    "Priorité 3",
    "Priorité 4",
    "Priorité 5",
    "Priorité 6"
  ]);
  
  // Formater le header
  let headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#009B9B");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  
  Logger.log("✅ Feuille 'PATS' créée");
}

function createSheetResume(ss) {
  let sheet = ss.getSheetByName("Résumé");
  if (!sheet) {
    sheet = ss.insertSheet("Résumé");
  }
  
  // Ajouter en-têtes
  sheet.appendRow([
    "Collège",
    "Nombre de votes"
  ]);
  
  // Formater le header
  let headerRange = sheet.getRange("A1:B1");
  headerRange.setBackground("#666666");
  headerRange.setFontColor("white");
  headerRange.setFontWeight("bold");
  
  // Ajouter les collèges
  sheet.appendRow(["Officiers", 0]);
  sheet.appendRow(["Non-Officiers", 0]);
  sheet.appendRow(["PATS", 0]);
  sheet.appendRow(["TOTAL", 0]);
  
  Logger.log("✅ Feuille 'Résumé' créée");
}
