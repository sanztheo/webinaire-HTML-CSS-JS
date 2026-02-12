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
	const reponse = await fetch(API_URL + "/works");
	allWorks = await reponse.json();

	console.log(allWorks);
	// TODO : appeler displayWorks(allWorks)
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
	// TODO : vider la galerie
	gallery.innerHTML = "";
	// TODO : boucler sur les works et créer les éléments
	for (let i = 0; i < works.length; i++ ) {
		// console.log(i);
		const figure = document.createElement("figure");
		const img = document.createElement("img");
		img.src = works[i].imageUrl; 
		img.alt = works[i].title; 
		const figcaption = document.createElement("figcaption");
		figcaption.textContent = works[i].title;
		figure.appendChild(img);
		figure.appendChild(figcaption);
		console.log(figure);
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
	// TODO : créer le bouton "Tous" (filtre par défaut, classe .active)
	// TODO : boucler sur les catégories pour créer les boutons
	// TODO : ajouter un addEventListener "click" sur chaque bouton
	//        → filtrer allWorks et appeler displayWorks()
	//        → gérer la classe .active sur le bouton cliqué
}


// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
fetchWorks();
fetchCategories();
