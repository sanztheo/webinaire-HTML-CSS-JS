// ======================================
// Login : gestion du formulaire de connexion
// ======================================

// -- Récupération du formulaire
const loginForm = document.getElementById("login-form");
const passwordChamp = document.getElementById("login-password");
const divError = document.getElementById("error");


  

// Checker Len password
function validation(email, password) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const isValidEmail = emailRegex.test(email);

	if (password.length >= 6 && isValidEmail)  {
		
		return true;
	} else {
		return false;
	}
}

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

	if (!validation(email, password)) {
		divError.textContent = "Email ou mot de passe incorrect ";
		return;
	}
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
			divError.textContent = "Erreur server " + response.status;
		return null;
	}

	const data = await response.json();
	return data.token;
}