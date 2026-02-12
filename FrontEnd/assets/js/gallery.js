// ======================================
// Galerie : affichage des works + filtres
// ======================================

// -- Récupération des éléments du DOM
const gallery = document.getElementById("gallery");
const filtersContainer = document.getElementById("filters");

// -- Cache des données : un seul appel API, réutilisé par les filtres
let allWorks = [];
let allCategories = [];
let activeFilter = null;


// -------------------------------------------------------
// Fonction : récupérer les works depuis l'API (une seule fois)
// - Fait un fetch GET sur /works
// - Stocke le résultat dans allWorks (cache local)
// - Appelle renderGallery() pour afficher les works
// -------------------------------------------------------
async function fetchWorks() {
	allWorks = await fetchData("/works");
	renderGallery();
}


// -------------------------------------------------------
// Fonction : afficher les works dans la galerie
// - Vide la galerie existante
// - Filtre les works selon la catégorie active (en mémoire, pas d'appel API)
// - Utilise un DocumentFragment pour insérer tout d'un coup (performance)
// -------------------------------------------------------
function renderGallery() {
	gallery.innerHTML = "";

	const worksToDisplay = activeFilter === null
		? allWorks
		: allWorks.filter((work) => work.categoryId === activeFilter);

	const fragment = document.createDocumentFragment();

	for (const work of worksToDisplay) {
		const figure = document.createElement("figure");
		figure.dataset.id = work.id;

		const img = document.createElement("img");
		img.src = work.imageUrl;
		img.alt = work.title;

		const figcaption = document.createElement("figcaption");
		figcaption.textContent = work.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
		fragment.appendChild(figure);
	}

	gallery.appendChild(fragment);
}


// -------------------------------------------------------
// Fonction : récupérer les catégories depuis l'API (une seule fois)
// - Fait un fetch GET sur /categories
// - Stocke le résultat dans allCategories (cache local)
// - Appelle renderFilters() pour créer les boutons
// -------------------------------------------------------
async function fetchCategories() {
	allCategories = await fetchData("/categories");
	renderFilters();
}


// -------------------------------------------------------
// Fonction : créer tous les boutons de filtre
// - Bouton "Tous" (filtre par défaut, classe .active)
// - Un bouton par catégorie
// -------------------------------------------------------
function renderFilters() {
	filtersContainer.innerHTML = "";

	// Bouton "Tous" → affiche toutes les catégories
	const btnTous = createFilterButton("Tous", null);
	btnTous.classList.add("active");
	filtersContainer.appendChild(btnTous);

	// Un bouton par catégorie récupérée depuis l'API
	for (const category of allCategories) {
		filtersContainer.appendChild(
			createFilterButton(category.name, category.id)
		);
	}
}


// -------------------------------------------------------
// Fonction : créer un bouton de filtre individuel
// - Au clic : met à jour activeFilter + re-render la galerie
// - Aucun appel API → on filtre le cache allWorks en mémoire
// -------------------------------------------------------
function createFilterButton(label, categoryId) {
	const btn = document.createElement("button");
	btn.textContent = label;

	btn.addEventListener("click", () => {
		activeFilter = categoryId;
		setActiveButton(btn);
		renderGallery();
	});

	return btn;
}


// -------------------------------------------------------
// Fonction : gérer la classe active sur les boutons filtres
// - Retire la classe "active" de TOUS les boutons
// - Ajoute la classe "active" au bouton cliqué
// -------------------------------------------------------
function setActiveButton(activeBtn) {
	const buttons = filtersContainer.querySelectorAll("button");
	for (const btn of buttons) {
		btn.classList.toggle("active", btn === activeBtn);
	}
}


// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
fetchWorks();
fetchCategories();
