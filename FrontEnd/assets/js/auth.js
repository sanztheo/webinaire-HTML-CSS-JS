// ======================================
// Auth : gestion de l'état de connexion
// (bandeau édition, login/logout, bouton modifier)
// ======================================

// -------------------------------------------------------
// Fonction : vérifier si l'utilisateur est connecté
// - Regarder si un token existe dans localStorage
// - Si oui : afficher le bandeau, le bouton modifier,
//            basculer login → logout dans la nav,
//            cacher les filtres (en mode admin on n'en a pas besoin)
// - Si non : ne rien changer (tout est déjà caché par défaut)
// -------------------------------------------------------
function checkAuth() {
	const token = localStorage.getItem("token");

	if (token) {
		// TODO : afficher le bandeau mode édition (#edit-banner)
		// TODO : afficher le bouton modifier (#edit-works-btn)
		// TODO : cacher le lien "login" (#login-link)
		// TODO : afficher le lien "logout" (#logout-link)
		// TODO : (optionnel) cacher les filtres (#filters)
	}
}


// -------------------------------------------------------
// Fonction : gérer le clic sur "logout"
// - Supprimer le token du localStorage
// - Recharger la page ou rediriger vers index.html
// -------------------------------------------------------
function setupLogout() {
	const logoutLink = document.getElementById("logout-link");

	if (logoutLink) {
		logoutLink.addEventListener("click", function (e) {
			// TODO : empêcher le comportement par défaut
			// TODO : supprimer le token → localStorage.removeItem("token")
			// TODO : rediriger vers index.html ou recharger la page
		});
	}
}


// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
checkAuth();
setupLogout();
