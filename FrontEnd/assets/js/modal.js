// ======================================
// Modale : galerie photo + ajout photo
// ======================================

// -- DOM
const modal = document.getElementById("modal");
const modalGalleryView = document.getElementById("modal-gallery-view");
const modalAddView = document.getElementById("modal-add-view");
const modalGalleryGrid = document.getElementById("modal-gallery-grid");
const editWorksBtn = document.getElementById("edit-works-btn");
const addPhotoBtn = document.getElementById("modal-add-photo-btn");

const photoFile = document.getElementById("photo-file");
const photoUploadZone = document.getElementById("photo-upload-zone");
const photoPreview = document.getElementById("photo-preview");
const previewImg = document.getElementById("preview-img");
const addPhotoForm = document.getElementById("add-photo-form");
const photoTitle = document.getElementById("photo-title");
const photoCategory = document.getElementById("photo-category");
const validateBtn = document.getElementById("validate-btn");

// -- Constantes
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// -- État
let categoriesLoaded = false;
let previousFocus = null;
let hasValidFile = false;


// ============================================================
//  1. OUVERTURE / FERMETURE DE LA MODALE
// ============================================================

function openModal() {
	previousFocus = document.activeElement;
	modal.style.display = "flex";
	modal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
	showGalleryView();
	displayModalGallery();
	modal.querySelector(".modal-close").focus();
}

function closeModal() {
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";
	showGalleryView();
	resetAddForm();
	if (previousFocus) previousFocus.focus();
}

function showGalleryView() {
	modalGalleryView.style.display = "";
	modalAddView.style.display = "none";
}

function showAddView() {
	modalGalleryView.style.display = "none";
	modalAddView.style.display = "";
}

// -- Listeners d'ouverture / fermeture
editWorksBtn.addEventListener("click", openModal);
modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

for (const btn of modal.querySelectorAll(".modal-close")) {
	btn.addEventListener("click", closeModal);
}

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
		closeModal();
	}
});


// ============================================================
//  2. VUE GALERIE : miniatures + suppression
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
		deleteBtn.setAttribute("aria-label", "Supprimer " + work.title);

		const icon = document.createElement("i");
		icon.classList.add("fa-solid", "fa-trash-can");
		deleteBtn.appendChild(icon);

		item.appendChild(img);
		item.appendChild(deleteBtn);
		fragment.appendChild(item);
	}

	modalGalleryGrid.appendChild(fragment);
}

// Délégation d'événement + confirmation avant suppression
modalGalleryGrid.addEventListener("click", function (e) {
	const deleteBtn = e.target.closest(".delete-btn");
	if (!deleteBtn) return;
	if (!confirm("Supprimer cette photo ?")) return;
	deleteWork(deleteBtn.dataset.id);
});

async function deleteWork(workId) {
	const token = localStorage.getItem("token");

	let response;
	try {
		response = await fetch(API_URL + "/works/" + workId, {
			method: "DELETE",
			headers: { Authorization: "Bearer " + token },
		});
	} catch {
		alert("Le serveur est inaccessible");
		return;
	}

	if (!response.ok) {
		alert("Impossible de supprimer : Erreur " + response.status);
		return;
	}

	await fetchWorks();
	displayModalGallery();
}


// ============================================================
//  3. BASCULER VERS LA VUE "AJOUT PHOTO"
// ============================================================

addPhotoBtn.addEventListener("click", function () {
	resetAddForm();
	showAddView();
	if (!categoriesLoaded) loadCategories();
});

modal.querySelector(".modal-back").addEventListener("click", function () {
	showGalleryView();
	resetAddForm();
});


// ============================================================
//  4. FORMULAIRE D'AJOUT
// ============================================================

async function loadCategories() {
	try {
		const categories = await fetchData("/categories");
		photoCategory.length = 1;

		for (const cat of categories) {
			const option = document.createElement("option");
			option.value = cat.id;
			option.textContent = cat.name;
			photoCategory.appendChild(option);
		}

		categoriesLoaded = true;
	} catch (error) {
		alert("Impossible de charger les catégories.");
	}
}

// Prévisualisation de l'image
photoFile.addEventListener("change", function () {
	const file = photoFile.files[0];
	if (!file) return;

	if (file.size > MAX_FILE_SIZE) {
		alert("L'image ne doit pas dépasser 4 Mo.");
		photoFile.value = "";
		return;
	}

	hasValidFile = true;

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
		hasValidFile &&
		photoTitle.value.trim() !== "" &&
		photoCategory.value !== "";

	validateBtn.disabled = !isValid;
	validateBtn.classList.toggle("active", isValid);
}

photoTitle.addEventListener("input", checkFormValidity);
photoCategory.addEventListener("change", checkFormValidity);

// Soumission avec protection double-clic
addPhotoForm.addEventListener("submit", async function (e) {
	e.preventDefault();

	if (!photoFile.files[0] || !photoTitle.value.trim() || !photoCategory.value) {
		return;
	}

	validateBtn.disabled = true;

	const formData = new FormData();
	formData.append("image", photoFile.files[0]);
	formData.append("title", photoTitle.value);
	formData.append("category", photoCategory.value);

	const token = localStorage.getItem("token");

	let response;
	try {
		response = await fetch(API_URL + "/works", {
			method: "POST",
			headers: { Authorization: "Bearer " + token },
			body: formData,
		});
	} catch {
		alert("Le serveur est inaccessible");
		validateBtn.disabled = false;
		return;
	}

	if (!response.ok) {
		alert("Impossible d'ajouter la photo : Erreur " + response.status);
		validateBtn.disabled = false;
		return;
	}

	await fetchWorks();
	closeModal();
});

// Réinitialiser le formulaire
function resetAddForm() {
	addPhotoForm.reset();
	photoFile.value = "";
	hasValidFile = false;
	photoUploadZone.style.display = "";
	photoPreview.style.display = "none";
	previewImg.src = "";
	validateBtn.disabled = true;
	validateBtn.classList.remove("active");
}
