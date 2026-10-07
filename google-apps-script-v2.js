/**
 * SCRIPT GOOGLE APPS - Sondage SPP-PATS 2026
 * Collecte les résultats et les organise PAR COLLÈGE
 * 
 * Installation :
 * 1. Créer Google Sheet (ou utiliser existant)
 * 2. Extensions > Apps Script
 * 3. Copier ce code
 * 4. Déployer comme "Déploiement nouveau" → "Type: Application Web"
 * 5. Accorder permissions
 * 6. Copier URL du déploiement
 * 7. Dans index.html, ligne 796: GOOGLE_APPS_SCRIPT_URL = "URL_ICI"
 * 
 * Format des onglets créés :
 * - Résultats (bruts)
 * - Officiers (par collège)
 * - Non-Officiers
 * - PATS
 * - Résumé (statistiques)
 */

// ID du Google Sheet (Créé 07/10/2026)
const SHEET_ID = "17tnj8SS68OLEO_2JqXfvjO9nSzXYLuvPgVX8AgxyT3Q";

// Fonction reçoit les données du sondage
function doPost(e) {
    try {
        // Parser les données JSON du POST
        const data = JSON.parse(e.postData.contents);
        
        // Ouvrir le Sheet
        const sheet = SpreadsheetApp.openById(SHEET_ID);
        
        // Enregistrer dans "Résultats" (brut)
        addResultRaw(sheet, data);
        
        // Enregistrer dans feuille par collège
        addResultByCollege(sheet, data);
        
        // Mettre à jour le résumé
        updateSummary(sheet);
        
        return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Résultat enregistré"
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Ajouter résultat brut dans "Résultats"
 */
function addResultRaw(sheet, data) {
    let ws = sheet.getSheetByName("Résultats");
    
    // Créer feuille si n'existe pas
    if (!ws) {
        ws = sheet.insertSheet("Résultats");
        // En-têtes
        ws.appendRow([
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
    }
    
    // Ajouter ligne de données
    ws.appendRow([
        data.timestamp || new Date().toLocaleString('fr-FR'),
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
    ]);
}

/**
 * Ajouter résultat dans feuille du collège
 */
function addResultByCollege(sheet, data) {
    // Mapper nom collège
    const collegeMap = {
        'Collège Officiers': 'Officiers',
        'Collège Non-Officiers SPP': 'Non-Officiers',
        'Collège PATS': 'PATS'
    };
    
    const collegeName = collegeMap[data.college] || data.college;
    
    // Créer/récupérer feuille du collège
    let ws = sheet.getSheetByName(collegeName);
    if (!ws) {
        ws = sheet.insertSheet(collegeName);
        
        // En-têtes
        ws.appendRow([
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
    }
    
    // Ajouter ligne
    ws.appendRow([
        data.timestamp || new Date().toLocaleString('fr-FR'),
        data.firstName || '',
        data.lastName || '',
        data.ip || '',
        data.priorities[0] || '',
        data.priorities[1] || '',
        data.priorities[2] || '',
        data.priorities[3] || '',
        data.priorities[4] || '',
        data.priorities[5] || ''
    ]);
}

/**
 * Mettre à jour feuille "Résumé" avec statistiques
 */
function updateSummary(sheet) {
    let ws = sheet.getSheetByName("Résumé");
    if (!ws) {
        ws = sheet.insertSheet("Résumé");
    }
    
    // Récupérer données brutes
    const rawSheet = sheet.getSheetByName("Résultats");
    if (!rawSheet) return;
    
    const data = rawSheet.getDataRange().getValues();
    if (data.length <= 1) return; // Seulement en-têtes
    
    // Compter par collège
    const counts = {};
    for (let i = 1; i < data.length; i++) {
        const college = data[i][1];
        if (college) {
            counts[college] = (counts[college] || 0) + 1;
        }
    }
    
    // Mettre à jour Résumé
    ws.clear();
    ws.appendRow(["Collège", "Nombre de votes"]);
    
    for (const [college, count] of Object.entries(counts)) {
        ws.appendRow([college, count]);
    }
    
    // Ajouter total
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    ws.appendRow(["TOTAL", total]);
}

/**
 * Fonction pour créer structure vide au démarrage
 * (À appeler manuellement 1x depuis console)
 */
function initializeSheets() {
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Créer feuilles
    const sheets = ['Résultats', 'Officiers', 'Non-Officiers', 'PATS', 'Résumé'];
    
    for (const sheetName of sheets) {
        if (!sheet.getSheetByName(sheetName)) {
            sheet.insertSheet(sheetName);
        }
    }
    
    // En-têtes "Résultats"
    const results = sheet.getSheetByName('Résultats');
    results.appendRow([
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
}
