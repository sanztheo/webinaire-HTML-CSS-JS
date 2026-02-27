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

function setElementVisibilite(id, visible) {
	const element = document.getElementById(id);
	if (!element) return;
	element.style.display = visible ? "" : 'none';
} 

function checkAuth() {
	const token = localStorage.getItem("token");
	if (!token) return;
	setElementVisibilite("edit-banner", true);
	setElementVisibilite("edit-works-btn", true);
	setElementVisibilite("login-link", false);
	setElementVisibilite("logout-link", true);
	setElementVisibilite("filters", false);
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
			e.preventDefault();
			// TODO : supprimer le token → localStorage.removeItem("token")
			localStorage.removeItem("token");
			// TODO : rediriger vers index.html ou recharger la page
			setElementVisibilite("edit-banner", false);
			setElementVisibilite("edit-works-btn", false);
			setElementVisibilite("login-link", true);
			setElementVisibilite("logout-link", false);
			setElementVisibilite("filters", true);
		});
	}
}


// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
checkAuth();
setupLogout();
