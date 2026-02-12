// ======================================
// Configuration de l'API
// URL de base pour tous les appels fetch
// ======================================

const API_URL = "http://localhost:5678/api";

async function fetchData(endpoint) {
    const reponse = await fetch(API_URL + endpoint);
    if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
    return reponse.json();
    
}

// -- Endpoints disponibles :
// GET    /works        → récupérer tous les travaux
// GET    /categories   → récupérer les catégories
// POST   /users/login  → se connecter (body: email + password)
// POST   /works        → ajouter un travail (FormData: image + title + category)
// DELETE /works/:id    → supprimer un travail
