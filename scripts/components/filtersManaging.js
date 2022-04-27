import {
  TYPES,
  FILTERS,
  constructAllFilters,
} from "../factories/FilterFactory.js";

export {
  initFilters,
  displayDropdownMenuFilters,
  removeDropdownMenuFilters,
  updateDropdownMenus,
};

// Fonction d'initialisation appelé au chargement de la page
async function initFilters() {
  // Construit les filters et initialise les listes de filtres
  await constructAllFilters();

  // Initialise les écouteurs d'évènement des menus dropdowns
  initDropdownMenuEventListeners();
}

// ----------------------------------------------------------------------------------------
// --------------- OUVERTURE ET FERMETURE DES DROPDOWN MENUS -------------------
// -----------------------------------------------------------------------------

async function initDropdownMenuEventListeners() {
  FILTERS.forEach((filters) => {
    const dropdownMenuButton = document.getElementById(
      `${filters.type}DropdownButton`
    );
    dropdownMenuButton.addEventListener(
      "show.bs.dropdown",
      openDropdownMenuHandler
    );
    dropdownMenuButton.addEventListener(
      "hidden.bs.dropdown",
      closeDropdownMenuHandler
    );
  });
}

function openDropdownMenuHandler(e) {
  const type = e.target.dataset.type;
  const filters = FILTERS.find((filters) => filters.type === type);

  displayDropdownMenuFilters(type, filters.dropdownMenu);
}

function closeDropdownMenuHandler(e) {
  const type = e.target.dataset.type;

  removeDropdownMenuFilters(type);
}

// Affiche les filtres dans le dropdown menu du DOM
async function displayDropdownMenuFilters(type, filters) {
  const dropdownContainer = document.querySelector(
    `.${type}s-dropdown .dropdown-filters`
  );
  const dropdownMenu = document.querySelector(
    `.${type}s-dropdown .dropdown-menu`
  );
  const dropdownMenuFilters = dropdownMenu.querySelector(`.dropdown-filters`);

  // Insère tous les filtres dans le DOM
  filters.forEach((filter) => {
    dropdownContainer.appendChild(filter.dropdownMenuDOM);
  });

  // Supprime toutes les classes CSS précédemment appliquées au dropdown menu
  const button = document.getElementById(`${type}DropdownButton`);
  dropdownMenu.classList.remove("multicol3");
  dropdownMenu.classList.remove("multicol2");
  dropdownMenu.classList.remove("singlecol1");
  button.classList.remove("margin-right-multicol3");
  button.classList.remove("margin-right-multicol2");
  button.classList.remove("margin-right-singlecol1");
  for (let i = 0; i <= 10; i++) {
    dropdownMenuFilters.classList.remove(`multiline${i}`);
  }

  // Insère les classes CSS en fonction du nouveau nombre de filtres
  const nbOfDropdownItems = filters.length;

  // Si plus de 21 filtres, affichage en 3 colonnes de 10
  if (nbOfDropdownItems > 20) {
    // if (button.classList.contains("show"))
    button.classList.add("margin-right-multicol3");
    dropdownMenu.classList.add("multicol3");
  }
  // Si entre 11 et 20 filtres, affichage en 2 colonnes de 10
  else if (nbOfDropdownItems > 10) {
    // if (button.classList.contains("show"))
    button.classList.add("margin-right-multicol2");
    dropdownMenu.classList.add("multicol2");
  }
  // Jusqu'à 10 filtres, affichage en 1 colonnes de 10
  else {
    // if (button.classList.contains("show"))
    button.classList.add("margin-right-singlecol1");
    dropdownMenu.classList.add("singlecol1");
  }

  // Gestion de l'affichage en fonction du nombre de lignes
  switch (nbOfDropdownItems) {
    case 0:
      dropdownMenuFilters.classList.add("multiline0");
      break;
    case 1:
      dropdownMenuFilters.classList.add("multiline1");
      break;
    case 2:
      dropdownMenuFilters.classList.add("multiline2");
      break;
    case 3:
      dropdownMenuFilters.classList.add("multiline3");
      break;
    case 4:
      dropdownMenuFilters.classList.add("multiline4");
      break;
    case 5:
      dropdownMenuFilters.classList.add("multiline5");
      break;
    case 6:
      dropdownMenuFilters.classList.add("multiline6");
      break;
    case 7:
      dropdownMenuFilters.classList.add("multiline7");
      break;
    case 8:
      dropdownMenuFilters.classList.add("multiline8");
      break;
    case 9:
      dropdownMenuFilters.classList.add("multiline9");
      break;
    default:
      dropdownMenuFilters.classList.add("multiline10");
  }
}

// Supprime les filtres du dropdown menu du DOM
async function removeDropdownMenuFilters(type) {
  const dropdownMenu = document.querySelector(
    `.${type}s-dropdown .dropdown-menu`
  );
  const dropdownFilters = document.querySelector(
    `.${type}s-dropdown .dropdown-filters`
  );

  // Supprime du DOM le container des filtres
  dropdownMenu.removeChild(dropdownFilters);

  // Reconstruit le container des filtres
  const newDropdownFilters = document.createElement("div");
  newDropdownFilters.classList.add("dropdown-filters");
  newDropdownFilters.classList.add("d-flex");
  newDropdownFilters.classList.add("flex-column");
  newDropdownFilters.classList.add("flex-wrap");
  newDropdownFilters.classList.add("overflow-hidden");

  // Insertion du container VIDE dans le DOM
  dropdownMenu.appendChild(newDropdownFilters);

  // Suppression des class CSS d'affichage appliquées à l'ouverture du dropdown
  const dropdownButton = document.getElementById(`${type}DropdownButton`);
  dropdownButton.classList.remove("margin-right-multicol3");
  dropdownButton.classList.remove("margin-right-multicol2");
  dropdownButton.classList.remove("margin-right-singlecol1");
  dropdownMenu.classList.remove("multicol3");
  dropdownMenu.classList.remove("multicol2");
  dropdownMenu.classList.remove("singlecol1");
}

// ---------------------------------------------------------------------------------------

// Update filters lists
async function updateDropdownMenus(recipes) {
  // Vide les listes des filtres des dropdown menus
  FILTERS.forEach((filters) => {
    filters.dropdownMenu = [];
  });

  // Remplit ces listes avec les filtres trouvés dans les recettes en argument
  getFiltersFromRecipes(recipes);
}

// Récupère tous les filtres des recettes et les insère dans les listes des dropdown menus
async function getFiltersFromRecipes(recipes) {
  // Pour chaque recette de la liste...
  recipes.forEach((recipe) => {
    // ... récupère les ingrédients
    recipe.ingredients.forEach((ingredient) => {
      // Si l'ingrédient n'est pas déjà dans la liste des filtres appliqués
      if (
        false ===
        FILTERS[TYPES.INGREDIENT].tags.some(
          (f) => f.name === ingredient.ingredient
        )
      ) {
        // ET si l'ingrédient n'est pas déjà affiché dans le dropdown menu
        if (
          false ===
          FILTERS[TYPES.INGREDIENT].dropdownMenu.some(
            (f) => f.name === ingredient.ingredient
          )
        ) {
          // Récupère le filtre
          const ingredientFilter = FILTERS[TYPES.INGREDIENT].all.find(
            (i) => i.name === ingredient.ingredient
          );
          // Et linsère le filtre dans la liste du dropdown menu
          FILTERS[TYPES.INGREDIENT].dropdownMenu.push(ingredientFilter);
        }
      }
    });

    // Idem pour les filtres "appareil"
    if (
      false ===
      FILTERS[TYPES.APPLIANCE].tags.some((f) => f.name === recipe.appliance)
    ) {
      if (
        FILTERS[TYPES.APPLIANCE].dropdownMenu.some(
          (a) => a.name === recipe.appliance
        ) === false
      ) {
        // Récupère le filtre
        const applianceFilter = FILTERS[TYPES.APPLIANCE].all.find(
          (a) => a.name === recipe.appliance
        );
        FILTERS[TYPES.APPLIANCE].dropdownMenu.push(applianceFilter);
      }
    }

    // Idem pour les filtres "ustensil"
    recipe.ustensils.forEach((ustensil) => {
      if (
        false === FILTERS[TYPES.USTENSIL].tags.some((f) => f.name === ustensil)
      ) {
        if (
          FILTERS[TYPES.USTENSIL].dropdownMenu.some(
            (u) => u.name === ustensil
          ) === false
        ) {
          // Récupère le filtre
          const ustensilFilter = FILTERS[TYPES.USTENSIL].all.find(
            (u) => u.name === ustensil
          );
          FILTERS[TYPES.USTENSIL].dropdownMenu.push(ustensilFilter);
        }
      }
    });
  });
}
