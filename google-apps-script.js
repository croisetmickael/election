// GOOGLE APPS SCRIPT - Collecte des votes dans Google Sheet
// À copier-coller dans Google Apps Script (Extensions → Apps Script)

const SHEET_ID = "VOTRE_SHEET_ID"; // À remplacer par votre ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Créer ou récupérer la feuille "Résultats"
    let resultsSheet = sheet.getSheetByName("Résultats");
    if (!resultsSheet) {
      resultsSheet = sheet.insertSheet("Résultats");
      resultsSheet.appendRow([
        "Timestamp",
        "Collège",
        "Priorité 1",
        "Priorité 2",
        "Priorité 3",
        "Priorité 4",
        "Priorité 5",
        "Priorité 6"
      ]);
    }
    
    // Ajouter la ligne
    const row = [
      data.timestamp,
      data.college,
      data.priorities[0] || '',
      data.priorities[1] || '',
      data.priorities[2] || '',
      data.priorities[3] || '',
      data.priorities[4] || '',
      data.priorities[5] || ''
    ];
    
    resultsSheet.appendRow(row);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
