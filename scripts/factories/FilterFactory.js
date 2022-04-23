import { RECIPES } from "../factories/RecipeFactory.js";
import {
  updateRecipesWithNewTag,
  updateRecipesWithRemovedTag,
} from "../components/filtersSearch.js";
export {
  TYPES,
  FILTERS,
  initFilters,
  displayDropdownMenuFilters,
  removeDropdownMenuFilters,
  updateDropdownMenus,
};

// Énumération des types de filtres
const TYPES = {
  INGREDIENT: 0,
  APPLIANCE: 1,
  USTENSIL: 2,
};
Object.freeze(TYPES);

// Objet contenant les différents types de filtres et leurs listes respectives
const FILTERS = [
  {
    type: "ingredient",
    color: "secondary",
    all: [],
    dropdownMenu: [],
    tags: [],
  },
  {
    type: "appliance",
    color: "success",
    all: [],
    dropdownMenu: [],
    tags: [],
  },
  {
    type: "ustensil",
    color: "danger",
    all: [],
    dropdownMenu: [],
    tags: [],
  },
];
Object.freeze(FILTERS);

// ----------------------------------------------------------------------------------------

// Fonction d'initialisation appelé au chargement de la page
async function initFilters() {
  // Construit les filters et initialise les listes de filtres
  await constructAllFilters();

  // Initialise les écouteurs d'évènement des menus dropdowns
  initDropdownMenuEventListeners();
}

// ----------------------------------------------------------------------------------------

// Construction de l'objet "filtre"
function filterFactory(type, name) {
  let dropdownMenuDOM = undefined;
  let tagDOM = undefined;

  // Récupération de la couleur Bootstrap en fonction du type
  const color = FILTERS.find((filters) => filters.type === type).color;

  // Construit l'élément filtre à insérer dans le dropdown menu
  function constructorDropdownMenuDOM() {
    const p = document.createElement("p");
    p.classList.add("dropdown-item");
    p.setAttribute("data-type", type);
    p.textContent = name;
    p.addEventListener("click", addNewTag);

    this.dropdownMenuDOM = p;
  }

  // Construit l'élément filtre à insérer dans la partie des filtres appliqués
  function constructorTagDOM() {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add(`btn-${this.color}`);
    button.classList.add("text-white");
    button.classList.add("fw-bold");
    button.classList.add("shadow-none");
    button.classList.add("disabled");
    button.setAttribute("type", "button");
    button.setAttribute("data-type", type);

    button.textContent = name;

    const span = constructTagRemovingCross();
    button.appendChild(span);

    this.tagDOM = button;
  }

  return {
    type,
    name,
    color,
    dropdownMenuDOM,
    tagDOM,
    constructorDropdownMenuDOM,
    constructorTagDOM,
  };
}

// Construit la petite croix entourée qui permet de supprimer l'application du filtre
function constructTagRemovingCross() {
  const span = document.createElement("span");
  span.classList.add("fa-solid");
  span.classList.add("fa-xmark");
  span.classList.add("fa-xs");

  span.addEventListener("click", removeTag);

  return span;
}

// ----------------------------------------------------------------------------------------

// Construit tous les objets "filtres" à partir de la liste des recettes
async function constructAllFilters() {
  // Pour chaque recette...
  RECIPES.ALL.forEach((recipe) => {
    // ... récupère tous les nouveaux ingrédients
    recipe.ingredients.forEach((ingredient) => {
      if (
        false ===
        FILTERS[TYPES.INGREDIENT].all.some(
          (f) => f.name === ingredient.ingredient
        )
      ) {
        const ingredientFilter = filterFactory(
          FILTERS[TYPES.INGREDIENT].type,
          ingredient.ingredient
        );
        ingredientFilter.constructorDropdownMenuDOM();
        ingredientFilter.constructorTagDOM();
        FILTERS[TYPES.INGREDIENT].all.push(ingredientFilter);
        // Lors de l"initialisation, tous les filtres (de toutes les recettes) sont affichés dans les menus dropdown
        FILTERS[TYPES.INGREDIENT].dropdownMenu.push(ingredientFilter);
      }
    });

    // ... récupère tous les nouveaux appareils
    if (
      FILTERS[TYPES.APPLIANCE].all.some((f) => f.name === recipe.appliance) ===
      false
    ) {
      const applianceFilter = filterFactory(
        FILTERS[TYPES.APPLIANCE].type,
        recipe.appliance
      );
      applianceFilter.constructorDropdownMenuDOM();
      applianceFilter.constructorTagDOM();
      FILTERS[TYPES.APPLIANCE].all.push(applianceFilter);
      // Lors de l"initialisation, tous les filtres (de toutes les recettes) sont affichés dans les menus dropdown
      FILTERS[TYPES.APPLIANCE].dropdownMenu.push(applianceFilter);
    }

    // ... récupère tous les nouveaux ustensiles
    recipe.ustensils.forEach((ustensil) => {
      if (
        FILTERS[TYPES.USTENSIL].all.some((f) => f.name === ustensil) === false
      ) {
        const ustensilFilter = filterFactory(
          FILTERS[TYPES.USTENSIL].type,
          ustensil
        );
        ustensilFilter.constructorDropdownMenuDOM();
        ustensilFilter.constructorTagDOM();
        FILTERS[TYPES.USTENSIL].all.push(ustensilFilter);
        // Lors de l"initialisation, tous les filtres (de toutes les recettes) sont affichés dans les menus dropdown
        FILTERS[TYPES.USTENSIL].dropdownMenu.push(ustensilFilter);
      }
    });
  });
}

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

  // Insère tous les filtres dans le DOM
  filters.forEach((filter) => {
    dropdownContainer.appendChild(filter.dropdownMenuDOM);
  });

  // Supprime toutes les classes CSS précédemment appliquées au dropdown menu
  const dropdownMenu = document.querySelector(
    `.${type}s-dropdown .dropdown-menu`
  );
  const button = document.getElementById(`${type}DropdownButton`);
  dropdownMenu.classList.remove("multicol3");
  dropdownMenu.classList.remove("multicol2");
  dropdownMenu.classList.remove("singlecol1");
  button.classList.remove("margin-right-multicol3");
  button.classList.remove("margin-right-multicol2");
  button.classList.remove("margin-right-singlecol1");

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

// ----------------------------------------------------------------------------------------

function addNewTag(e) {
  const type = e.target.dataset.type;
  const name = e.target.textContent;

  // Récupère le filtre sélectionné dans le dropdownmenu
  const dropdownMenuFilters = FILTERS.find(
    (filters) => filters.type === type
  ).dropdownMenu;
  const filter = dropdownMenuFilters.find((filters) => filters.name === name);

  console.log(`----------------------------------------------------------`);
  console.log(`$$$ addNewTag => type: ${type} / name: ${name}`, filter);

  console.log(`filter.dropdownMenuDOM : `, filter.dropdownMenuDOM);
  console.log(`filter.tagDOM : `, filter.tagDOM);

  // Affiche le tag dans le DOM
  document.querySelector(".tags-container").appendChild(filter.tagDOM);

  // Insère dans le tag dans la liste des tags
  const tags = FILTERS.find((filters) => filters.type === type).tags;
  tags.push(filter);

  // Met à jour la liste des recettes affichées avec le nouveau tag
  updateRecipesWithNewTag(filter);
}

function removeTag(e) {
  const tagDOM = e.target.parentElement;
  const type = tagDOM.dataset.type;
  const name = tagDOM.textContent;

  // Récupère le filtre sélectionné dans les tags
  const tags = FILTERS.find((filtersLists) => filtersLists.type === type).tags;
  const filter = tags.find((filters) => filters.name === name);

  console.log(`----------------------------------------------------------`);
  console.log(`$$$ removeTag => type: ${type} / name: ${name}`, filter);

  // Supprime le tag du DOM
  document.querySelector(".tags-container").removeChild(tagDOM);

  // Met à jour la liste des recettes affichées sans le tag supprimé
  updateRecipesWithRemovedTag(filter, tags);
}
