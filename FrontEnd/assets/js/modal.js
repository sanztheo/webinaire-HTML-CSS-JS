// ======================================
// Modale : galerie photo + ajout photo
// ======================================

// -- Récupération des éléments du DOM
const modal = document.getElementById("modal");
const modalGalleryView = document.getElementById("modal-gallery-view");
const modalAddView = document.getElementById("modal-add-view");
const modalGalleryGrid = document.getElementById("modal-gallery-grid");
const editWorksBtn = document.getElementById("edit-works-btn");
const addPhotoBtn = document.getElementById("modal-add-photo-btn");

// Éléments du formulaire d'ajout
const photoFile = document.getElementById("photo-file");
const photoUploadZone = document.getElementById("photo-upload-zone");
const photoPreview = document.getElementById("photo-preview");
const previewImg = document.getElementById("preview-img");
const addPhotoForm = document.getElementById("add-photo-form");
const photoTitle = document.getElementById("photo-title");
const photoCategory = document.getElementById("photo-category");
const validateBtn = document.getElementById("validate-btn");


// ============================================================
//  1. OUVERTURE / FERMETURE DE LA MODALE
// ============================================================

// -------------------------------------------------------
// Ouvrir la modale (au clic sur "modifier")
// - Afficher la modale (display: flex)
// - Afficher la vue galerie, cacher la vue ajout
// - Remplir la grille de miniatures
// -------------------------------------------------------
function openModal() {
	// TODO : afficher la modale (#modal) → display = "flex"
	// TODO : mettre aria-hidden à "false"
	// TODO : s'assurer que la vue galerie est visible et la vue ajout cachée
	// TODO : appeler displayModalGallery() pour remplir la grille
}

// -------------------------------------------------------
// Fermer la modale
// - Cacher la modale (display: none)
// - Remettre la vue galerie par défaut
// -------------------------------------------------------
function closeModal() {
	// TODO : cacher la modale (#modal) → display = "none"
	// TODO : mettre aria-hidden à "true"
	// TODO : réinitialiser la vue (revenir à la galerie, vider le formulaire)
}

// Clic sur le bouton "modifier" → ouvre la modale
if (editWorksBtn) {
	editWorksBtn.addEventListener("click", openModal);
}

// Clic sur l'overlay ou les boutons ✕ → ferme la modale
// TODO : ajouter addEventListener sur .modal-overlay → closeModal
// TODO : ajouter addEventListener sur chaque .modal-close → closeModal


// ============================================================
//  2. VUE GALERIE : afficher les miniatures + supprimer
// ============================================================

// -------------------------------------------------------
// Fonction : afficher les miniatures dans la grille de la modale
// - Vider la grille
// - Pour chaque work dans allWorks, créer :
//     <div class="modal-gallery-item">
//       <img src="work.imageUrl" alt="work.title">
//       <button class="delete-btn" data-id="work.id">
//         <i class="fa-solid fa-trash-can"></i>
//       </button>
//     </div>
// - Ajouter un event listener sur chaque bouton supprimer
// -------------------------------------------------------
function displayModalGallery() {
	// TODO : vider modalGalleryGrid
	// TODO : boucler sur allWorks (la variable est dans gallery.js)
	// TODO : créer les éléments et les ajouter à la grille
	// TODO : sur chaque bouton .delete-btn → addEventListener click → deleteWork(id)
}


// -------------------------------------------------------
// Fonction : supprimer un work
// - Faire un fetch DELETE sur /works/:id
// - Penser à envoyer le token dans le header Authorization
// - Si ok : retirer le work du DOM (modale + galerie principale)
//           ou re-fetcher les works
// -------------------------------------------------------
async function deleteWork(workId) {
	// TODO : récupérer le token depuis localStorage
	// TODO : fetch DELETE sur API_URL + "/works/" + workId
	//        avec le header : Authorization: "Bearer " + token
	// TODO : si ok → re-fetcher les works (fetchWorks) et rafraîchir la modale
}


// ============================================================
//  3. BASCULER VERS LA VUE "AJOUT PHOTO"
// ============================================================

// Clic sur "Ajouter une photo" → affiche le formulaire d'ajout
if (addPhotoBtn) {
	addPhotoBtn.addEventListener("click", function () {
		// TODO : cacher la vue galerie (modalGalleryView)
		// TODO : afficher la vue ajout (modalAddView)
		// TODO : charger les catégories dans le <select> si pas déjà fait
	});
}

// Clic sur la flèche retour → revient à la vue galerie
// TODO : addEventListener sur .modal-back → cacher modalAddView, afficher modalGalleryView


// ============================================================
//  4. FORMULAIRE D'AJOUT : upload image + titre + catégorie
// ============================================================

// -------------------------------------------------------
// Charger les catégories dans le <select>
// - Fetch GET sur /categories
// - Créer une <option> par catégorie
// -------------------------------------------------------
async function loadCategories() {
	// TODO : fetch les catégories depuis l'API
	// TODO : vider le select (sauf l'option disabled par défaut)
	// TODO : créer une <option value="cat.id">cat.name</option> pour chaque catégorie
}


// -------------------------------------------------------
// Prévisualisation de l'image sélectionnée
// - Quand l'utilisateur choisit un fichier (change sur l'input file)
// - Lire le fichier avec FileReader
// - Afficher l'aperçu et cacher la zone d'upload
// -------------------------------------------------------
if (photoFile) {
	photoFile.addEventListener("change", function () {
		// TODO : vérifier qu'un fichier a été sélectionné
		// TODO : vérifier la taille (max 4 Mo)
		// TODO : créer un FileReader, lire le fichier en dataURL
		// TODO : dans reader.onload : mettre le résultat dans previewImg.src
		// TODO : cacher la zone d'upload, afficher le preview
		// TODO : appeler checkFormValidity()
	});
}


// -------------------------------------------------------
// Vérifier si le formulaire est complet pour activer le bouton "Valider"
// - Image sélectionnée + titre rempli + catégorie choisie
// - Si tout est ok → ajouter .active au bouton et retirer disabled
// - Sinon → retirer .active et remettre disabled
// -------------------------------------------------------
function checkFormValidity() {
	// TODO : vérifier que photoFile.files[0] existe
	// TODO : vérifier que photoTitle.value n'est pas vide
	// TODO : vérifier que photoCategory.value n'est pas vide
	// TODO : si tout est ok → validateBtn.disabled = false + ajouter classe .active
	// TODO : sinon → validateBtn.disabled = true + retirer classe .active
}

// Écouter les changements sur le titre et la catégorie pour valider en temps réel
if (photoTitle) photoTitle.addEventListener("input", checkFormValidity);
if (photoCategory) photoCategory.addEventListener("change", checkFormValidity);


// -------------------------------------------------------
// Soumission du formulaire d'ajout
// - Empêcher le comportement par défaut
// - Créer un FormData avec image, title, category
// - Envoyer un POST à /works avec le token
// - Si ok : fermer la modale et re-fetcher les works
// -------------------------------------------------------
if (addPhotoForm) {
	addPhotoForm.addEventListener("submit", async function (e) {
		// TODO : empêcher le rechargement

		// TODO : créer un new FormData()
		// TODO : append("image", photoFile.files[0])
		// TODO : append("title", photoTitle.value)
		// TODO : append("category", photoCategory.value)

		// TODO : récupérer le token depuis localStorage
		// TODO : fetch POST sur API_URL + "/works"
		//        avec le header Authorization: "Bearer " + token
		//        et le body : formData (PAS de Content-Type, le navigateur le gère)

		// TODO : si ok → fermer la modale, re-fetcher les works
		//        réinitialiser le formulaire
	});
}
