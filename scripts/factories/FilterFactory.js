import { RECIPES } from "../factories/RecipeFactory.js";
import {
  updateRecipesWithNewTag,
  updateRecipesWithRemovedTag,
} from "../components/filtersSearch.js";
export { TYPES, FILTERS, constructAllFilters };

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

// ----------------------------------------------------------------------------------------

function addNewTag(e) {
  const type = e.target.dataset.type;
  const name = e.target.textContent;
  const tagsContainer = document.querySelector(".tags-container");

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
  tagsContainer.appendChild(filter.tagDOM);
  // Ajoute une marge au-dessus du container non vide
  tagsContainer.classList.add("mt-4");
  // Enlève la marge en-dessous les bouttons de dropdown menus
  document.querySelector(".filters-search-container").classList.remove("mb-6");

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
  const tagsContainer = document.querySelector(".tags-container");

  // Récupère le filtre sélectionné dans les tags
  const tags = FILTERS.find((filtersLists) => filtersLists.type === type).tags;
  const filter = tags.find((filters) => filters.name === name);

  console.log(`----------------------------------------------------------`);
  console.log(`$$$ removeTag => type: ${type} / name: ${name}`, filter);

  // Supprime le tag du DOM
  tagsContainer.removeChild(tagDOM);

  if (tagsContainer.querySelectorAll("button").length === 0) {
    // Enlève la marge au container vide
    tagsContainer.classList.remove("mt-4");
    // Remet la marge en-dessous les bouttons de dropdown menus
    document.querySelector(".filters-search-container").classList.add("mb-6");
  }

  // Met à jour la liste des recettes affichées sans le tag supprimé
  updateRecipesWithRemovedTag(filter, tags);
}
