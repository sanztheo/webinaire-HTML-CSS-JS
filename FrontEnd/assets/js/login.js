// ======================================
// Login : gestion du formulaire de connexion
// ======================================

// -- Récupération du formulaire
const loginForm = document.getElementById("login-form");
const passwordChamp = document.getElementById("login-password");

// -------------------------------------------------------
// Écouter le submit du formulaire
// - Empêcher le comportement par défaut (event.preventDefault)
// - Récupérer les valeurs email et password
// - Envoyer un POST à /users/login avec le body JSON
// - Si la réponse est ok : stocker le token dans localStorage
//   et rediriger vers index.html
// - Si erreur : afficher un message d'erreur
// -------------------------------------------------------
loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = event.target.querySelector("[name=email]").value;
	const password = event.target.querySelector("[name=password]").value;

	const token = await envoyerLogin(email, password);

	if (token) {
		localStorage.setItem("token", token);
		window.location.href = "index.html";
	}
});

async function envoyerLogin(email, password) {
	const response = await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	});
	if (!response.ok) {
		if (response.status === 401) {
			alert("Email ou mot de passe incorrect");
		} else {
			alert("Erreur serveur");
		}
		return null;
	}

	const data = await response.json();
	return data.token;
}