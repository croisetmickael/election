/**
 * VÉRIFICATION SA80_1880 VIA GOOGLE SHEET
 * Script client-side pour enregistrer les votes dans Google Sheet via Google Apps Script
 */

/**
 * Enregistrer la réponse dans le Google Sheet
 * @param {string} ip - Adresse IP de l'utilisateur
 * @param {string} firstName - Prénom
 * @param {string} lastName - Nom
 * @param {array} priorities - Tableau des 6 priorités sélectionnées
 * @returns {object} {success: true/false, message: "..."}
 */
async function recordSA80_1880ToSheet(ip, firstName, lastName, priorities) {
  try {
    console.log("📤 Envoi des données au Google Sheet...");
    
    // Préparer les données
    const payload = {
      ip: ip,
      firstName: firstName,
      lastName: lastName,
      priorities: priorities,
      timestamp: new Date().toLocaleString('fr-FR')
    };
    
    console.log("📊 Données à envoyer :", payload);
    
    // Envoyer via fetch
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // IMPORTANT pour éviter CORS
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log("✅ Réponse du serveur :", response.status);
    
    // Avec no-cors, on ne peut pas lire la réponse
    // On suppose que c'est OK si pas d'erreur
    return {
      success: true,
      message: "Vote enregistré dans le Google Sheet"
    };
    
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement :", error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * FONCTION ALTERNATIVE : Utiliser une API publique (à la place du Google Apps Script)
 * Si vous ne voulez pas utiliser Google Apps Script, vous pouvez utiliser:
 * - Firebase
 * - Supabase
 * - Formspree
 * - Sheety.io
 */

// Exemple avec Sheety.io (simple, gratuit, connecte à Google Sheets)
async function recordSA80_1880ToSheetyIO(ip, firstName, lastName, priorities) {
  try {
    const payload = {
      timestamp: new Date().toLocaleString('fr-FR'),
      college: '', // À remplir par l'app
      firstName: firstName,
      lastName: lastName,
      ip: ip,
      priority1: priorities[0] || '',
      priority2: priorities[1] || '',
      priority3: priorities[2] || '',
      priority4: priorities[3] || '',
      priority5: priorities[4] || '',
      priority6: priorities[5] || ''
    };
    
    // Remplacer par votre URL Sheety.io
    const sheetyURL = "https://api.sheety.co/YOUR_KEY/YOUR_SHEET/results";
    
    const response = await fetch(sheetyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, message: "Enregistré via Sheety.io" };
    } else {
      return { success: false, error: data.errors };
    }
    
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Vérifier avant soumission (optionnel avec accès libre)
 * Cette fonction n'est plus nécessaire avec l'accès libre
 */
async function checkBeforeSA80_1880Submit(ip, firstName, lastName) {
  // Avec accès libre, pas de vérification
  return {
    verified: true,
    canSubmit: true,
    message: "Accès libre activé"
  };
}
