// ======================================
// Login : gestion du formulaire de connexion
// ======================================

// -- Récupération du formulaire
const loginForm = document.getElementById("login-form");


// -------------------------------------------------------
// Écouter le submit du formulaire
// - Empêcher le comportement par défaut (e.preventDefault)
// - Récupérer les valeurs email et password
// - Envoyer un POST à /users/login avec le body JSON
// - Si la réponse est ok : stocker le token dans localStorage
//   et rediriger vers index.html
// - Si erreur : afficher un message d'erreur
// -------------------------------------------------------
loginForm.addEventListener("submit", async function (e) {
	// TODO : empêcher le rechargement de la page

	// TODO : récupérer l'email et le mot de passe saisis

	// TODO : faire un fetch POST sur API_URL + "/users/login"
	//        avec le Content-Type "application/json"
	//        et le body : { email, password }

	// TODO : vérifier si la réponse est ok
	//        → si oui : récupérer le token dans la réponse JSON
	//                    le stocker avec localStorage.setItem("token", token)
	//                    rediriger avec window.location.href = "index.html"
	//        → si non : afficher un message d'erreur (ex: "Email ou mot de passe incorrect")
});
