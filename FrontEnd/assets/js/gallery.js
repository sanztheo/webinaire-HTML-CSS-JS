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
	
	// TODO : boucler sur les works et créer les éléments
	gallery.innerHTML = works.map(({title, imageUrl}) => 
		`<figure>
			<img src="${imageUrl}" alt="${title}">
			<figcaption>${title}</figcaption>
		</figure>`
	).join("");
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
	btnTous.classList.add("actif");
	btnTous.addEventListener("click", () => {
		filtrerEtAfficher(null);
		 // gererClassActive(btnTous);
	});
	filtersContainer.appendChild(btnTous);
	// TODO : boucler sur les catégories pour créer les boutons
	categories.forEach(id => {
		const btn = document.createElement("button");
		btn.textContent = id.name;
		btn.addEventListener("click", () => {
			filtrerEtAfficher(id.id);
			// gererClassActive(btn);
		});
		filtersContainer.appendChild(btn);
	})
}

function filtrer(elements, categorieId) {
	if (categorieId === null) return elements;
	return elements.filter(el => el.categoryId === categorieId);
}

function filtrerEtAfficher(categorieId) {
	const resultats = filtrer(allWorks, categorieId);
	displayWorks(resultats);
}

// -------------------------------------------------------
// Initialisation au chargement de la page
// -------------------------------------------------------
fetchWorks();
fetchCategories();
