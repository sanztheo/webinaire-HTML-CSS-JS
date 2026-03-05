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

let categoriesLoaded = false;


// ============================================================
//  1. OUVERTURE / FERMETURE DE LA MODALE
// ============================================================

function openModal() {
	modal.style.display = "flex";
	modal.setAttribute("aria-hidden", "false");
	showGalleryView();
	displayModalGallery();
}

function closeModal() {
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	showGalleryView();
	resetAddForm();
}

function showGalleryView() {
	modalGalleryView.style.display = "";
	modalAddView.style.display = "none";
}

function showAddView() {
	modalGalleryView.style.display = "none";
	modalAddView.style.display = "";
}

// Clic sur le bouton "modifier" → ouvre la modale
editWorksBtn.addEventListener("click", openModal);

// Clic sur l'overlay → ferme la modale
modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

// Clic sur les boutons × → ferme la modale
for (const btn of modal.querySelectorAll(".modal-close")) {
	btn.addEventListener("click", closeModal);
}

// Fermer avec Échap
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && modal.style.display === "flex") {
		closeModal();
	}
});


// ============================================================
//  2. VUE GALERIE : afficher les miniatures + supprimer
// ============================================================

function displayModalGallery() {
	modalGalleryGrid.textContent = "";
	const fragment = document.createDocumentFragment();

	for (const work of allWorks) {
		const item = document.createElement("div");
		item.classList.add("modal-gallery-item");

		const img = document.createElement("img");
		img.src = work.imageUrl;
		img.alt = work.title;

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-btn");
		deleteBtn.dataset.id = work.id;

		const icon = document.createElement("i");
		icon.classList.add("fa-solid", "fa-trash-can");
		deleteBtn.appendChild(icon);

		item.appendChild(img);
		item.appendChild(deleteBtn);
		fragment.appendChild(item);
	}

	modalGalleryGrid.appendChild(fragment);
}

// Délégation d'événement : un seul listener pour tous les boutons supprimer
modalGalleryGrid.addEventListener("click", function (e) {
	const deleteBtn = e.target.closest(".delete-btn");
	if (deleteBtn) deleteWork(deleteBtn.dataset.id);
});

async function deleteWork(workId) {
	const token = localStorage.getItem("token");

	const response = await fetch(API_URL + "/works/" + workId, {
		method: "DELETE",
		headers: { Authorization: "Bearer " + token },
	});

	if (response.ok) {
		await fetchWorks();
		displayModalGallery();
	}
}


// ============================================================
//  3. BASCULER VERS LA VUE "AJOUT PHOTO"
// ============================================================

addPhotoBtn.addEventListener("click", function () {
	showAddView();
	if (!categoriesLoaded) loadCategories();
});

// Clic sur la flèche retour → revient à la vue galerie
modal.querySelector(".modal-back").addEventListener("click", function () {
	showGalleryView();
	resetAddForm();
});


// ============================================================
//  4. FORMULAIRE D'AJOUT : upload image + titre + catégorie
// ============================================================

async function loadCategories() {
	const categories = await fetchData("/categories");

	// Garder uniquement l'option placeholder
	photoCategory.length = 1;

	for (const cat of categories) {
		const option = document.createElement("option");
		option.value = cat.id;
		option.textContent = cat.name;
		photoCategory.appendChild(option);
	}

	categoriesLoaded = true;
}

// Prévisualisation de l'image
photoFile.addEventListener("change", function () {
	const file = photoFile.files[0];
	if (!file) return;

	if (file.size > 4 * 1024 * 1024) {
		alert("L'image ne doit pas dépasser 4 Mo.");
		photoFile.value = "";
		return;
	}

	const reader = new FileReader();
	reader.onload = function () {
		previewImg.src = reader.result;
		photoUploadZone.style.display = "none";
		photoPreview.style.display = "";
		checkFormValidity();
	};
	reader.readAsDataURL(file);
});

// Validation en temps réel
function checkFormValidity() {
	const isValid =
		photoFile.files[0] &&
		photoTitle.value.trim() !== "" &&
		photoCategory.value !== "";

	validateBtn.disabled = !isValid;
	validateBtn.classList.toggle("active", isValid);
}

photoTitle.addEventListener("input", checkFormValidity);
photoCategory.addEventListener("change", checkFormValidity);

// Soumission du formulaire
addPhotoForm.addEventListener("submit", async function (e) {
	e.preventDefault();

	const formData = new FormData();
	formData.append("image", photoFile.files[0]);
	formData.append("title", photoTitle.value);
	formData.append("category", photoCategory.value);

	const token = localStorage.getItem("token");

	const response = await fetch(API_URL + "/works", {
		method: "POST",
		headers: { Authorization: "Bearer " + token },
		body: formData,
	});

	if (response.ok) {
		await fetchWorks();
		closeModal();
	}
});

// Réinitialiser le formulaire d'ajout
function resetAddForm() {
	addPhotoForm.reset();
	photoUploadZone.style.display = "";
	photoPreview.style.display = "none";
	previewImg.src = "";
	validateBtn.disabled = true;
	validateBtn.classList.remove("active");
}
