// ======================================
// Galerie : affichage des works + filtres
// ======================================

// -- Récupération des éléments du DOM
const gallery = document.getElementById("gallery");
const filtersContainer = document.getElementById("filters");

// Variable pour stocker tous les works récupérés depuis l'API
let allWorks = [];


// -------------------------------------------------------
// Fonction : récupérer les works depuis l'API
// - Faire un fetch GET sur /works
// - Stocker le résultat dans allWorks
// - Appeler displayWorks() pour les afficher
// -------------------------------------------------------
async function fetchWorks() {
	// On fait le fetch, puis on parse la réponse en JSON
	allWorks = await fetchData("/works");
	displayWorks(allWorks);
}


// -------------------------------------------------------
// Fonction : afficher les works dans la galerie
// - Vider le contenu de la div.gallery
// - Pour chaque work, créer une <figure> avec :
//     <img src="work.imageUrl" alt="work.title">
//     <figcaption>work.title</figcaption>
// - Ajouter chaque figure dans la galerie
// -------------------------------------------------------
function displayWorks(works) {
	
	gallery.innerHTML = "";
	// TODO : boucler sur les works et créer les éléments
	for (const work of works) {
		const figure = document.createElement("figure");
		const img = document.createElement("img");
		img.src = work.imageUrl; 
		img.alt = work.title; 
		const figcaption = document.createElement("figcaption");
		figcaption.textContent = work.title;
		figure.appendChild(img);
		figure.appendChild(figcaption);
		gallery.appendChild(figure);
	}
}


// -------------------------------------------------------
// Fonction : récupérer les catégories depuis l'API
// - Faire un fetch GET sur /categories
// - Créer un bouton "Tous" + un bouton par catégorie
// - Au clic sur un filtre, filtrer allWorks par categoryId
// -------------------------------------------------------
async function fetchCategories() {
	// TODO : fetch les catégories depuis l'API
	const categories = await fetchData("/categories");
	// TODO : créer le bouton "Tous" (filtre par défaut, classe .active)
	const btnTous = document.createElement("button");
	btnTous.textContent = "Tous";
	btnTous.classList.add("active");
	btnTous.addEventListener("click", () => {
		filtrerEtAfficher(null);
		gererClassActive(btnTous);
	});
	filtersContainer.appendChild(btnTous);
	// TODO : boucler sur les catégories pour créer les boutons
	categories.forEach(id => {
		const btn = document.createElement("button");
		btn.textContent = id.name;
		btn.addEventListener("click", () => {
			filtrerEtAfficher(id.id);
			gererClassActive(btn);
		});
		filtersContainer.appendChild(btn);
	})
}

// -------------------------------------------------------
// Fonction : filtrer les works par catégorie
// - Si categorieId est null, on retourne tous les éléments
// - Sinon, on ne garde que ceux dont le categoryId correspond
// -------------------------------------------------------
function filtrer(elements, categorieId) {
	if (categorieId === null) return elements;
	return elements.filter(el => el.categoryId === categorieId);
}

// -------------------------------------------------------
// Fonction : filtrer les works puis les afficher
// - On appelle filtrer() sur allWorks avec la catégorie choisie
// - On passe le résultat à displayWorks() pour mettre à jour la galerie
// -------------------------------------------------------
function filtrerEtAfficher(categorieId) {
	const resultats = filtrer(allWorks, categorieId);
	displayWorks(resultats);
}

// -------------------------------------------------------
// Fonction : gérer la classe active sur les boutons filtres
// - Retirer la classe "active" de TOUS les boutons
// - Ajouter la classe "active" au bouton cliqué
// -------------------------------------------------------
function gererClassActive(btn) {
	document.querySelectorAll(".filters button").forEach(btn => {
		btn.classList.remove("active");
	});
	btn.classList.add("active");
}

// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
fetchWorks();
fetchCategories();
