import { RECIPES_ALL } from "../factories/RecipeFactory.js";
export {
  FILTERS,
  initFilters,
  displayFilters,
  removeFiltersFromDOM,
  updateFiltersLists,
};

// const FILTERS_ENUM = {
//   0: INGREDIENTS,
// }

const TYPES = {
  INGREDIENT: 0,
  APPLIANCE: 1,
  USTENSIL: 2,
};
Object.freeze(TYPES);

const FILTERS = [
  {
    type: "ingredient",
    color: "secondary",
    all: [],
    displayed: [],
  },
  {
    type: "appliance",
    color: "success",
    all: [],
    displayed: [],
  },
  {
    type: "ustensil",
    color: "danger",
    all: [],
    displayed: [],
  },
];
Object.freeze(FILTERS);

function filterFactory(type, name) {
  let dropdownDOM = undefined;
  let filterDOM = undefined;

  function constructorDropdownDOM() {
    const p = document.createElement("p");
    p.classList.add("dropdown-item");
    p.setAttribute("data-type", type);
    p.textContent = name;
    p.addEventListener("click", selectFilter);

    this.dropdownDOM = p;

    return p;
  }

  function constructorFilterDOM() {}

  return {
    type,
    name,
    dropdownDOM,
    filterDOM,
    constructorDropdownDOM,
    constructorFilterDOM,
  };
}

async function constructAllFilters() {
  RECIPES_ALL.forEach((recipe) => {
    // INGREDIENT filters
    recipe.ingredients.forEach((ingredient) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (
        FILTERS[TYPES.INGREDIENT].all.some(
          (i) => i.name === ingredient.ingredient
        ) === false
      ) {
        const ingredientFilter = filterFactory(
          "ingredient",
          ingredient.ingredient
        );
        ingredientFilter.constructorDropdownDOM();
        ingredientFilter.constructorFilterDOM();
        FILTERS[TYPES.INGREDIENT].all.push(ingredientFilter);
        FILTERS[TYPES.INGREDIENT].displayed.push(ingredientFilter);
      }
    });

    // APPLIANCE filters
    if (
      FILTERS[TYPES.APPLIANCE].all.some((a) => a.name === recipe.appliance) ===
      false
    ) {
      const applianceFilter = filterFactory("appliance", recipe.appliance);
      applianceFilter.constructorDropdownDOM();
      applianceFilter.constructorFilterDOM();
      FILTERS[TYPES.APPLIANCE].all.push(applianceFilter);
      FILTERS[TYPES.APPLIANCE].displayed.push(applianceFilter);
    }

    // USTENSIL filters
    recipe.ustensils.forEach((ustensil) => {
      if (
        FILTERS[TYPES.USTENSIL].all.some((u) => u.name === ustensil) === false
      ) {
        const ustensilFilter = filterFactory("ustensil", ustensil);
        ustensilFilter.constructorDropdownDOM();
        ustensilFilter.constructorFilterDOM();
        FILTERS[TYPES.USTENSIL].all.push(ustensilFilter);
        FILTERS[TYPES.USTENSIL].displayed.push(ustensilFilter);
      }
    });
  });
}

// ----------------------------------------------------------------------------------------

async function getFiltersFromRecipes(recipes) {
  recipes.forEach((recipe) => {
    // INGREDIENT FILTERS
    recipe.ingredients.forEach((ingredient) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (
        FILTERS[TYPES.INGREDIENT].displayed.some(
          (i) => i.name === ingredient.ingredient
        ) === false
      ) {
        // Récupère le filtre
        const ingredientFilter = FILTERS[TYPES.INGREDIENT].all.find(
          (i) => i.name === ingredient.ingredient
        );
        FILTERS[TYPES.INGREDIENT].displayed.push(ingredientFilter);
      }
    });

    // APPLIANCE FILTERS
    if (
      FILTERS[TYPES.APPLIANCE].displayed.some(
        (a) => a.name === recipe.appliance
      ) === false
    ) {
      // Récupère le filtre
      const applianceFilter = FILTERS[TYPES.APPLIANCE].all.find(
        (a) => a.name === recipe.appliance
      );
      FILTERS[TYPES.APPLIANCE].displayed.push(applianceFilter);
    }

    // USTENSIL FILTERS
    recipe.ustensils.forEach((ustensil) => {
      // console.log();
      if (
        FILTERS[TYPES.USTENSIL].displayed.some((u) => u.name === ustensil) ===
        false
      ) {
        // Récupère le filtre
        const ustensilFilter = FILTERS[TYPES.USTENSIL].all.find(
          (u) => u.name === ustensil
        );
        FILTERS[TYPES.USTENSIL].displayed.push(ustensilFilter);
      }
    });
  });
}

// ----------------------------------------------------------------------------------------

async function initDropdownMenuHandlers() {
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

  displayFilters(type, filters.displayed);
}

function closeDropdownMenuHandler(e) {
  const type = e.target.dataset.type;

  removeFiltersFromDOM(type);
}

// ----------------------------------------------------------------------------------------

async function displayFilters(type, filters) {
  const dropdownContainer = document.querySelector(
    `.${type}s-dropdown .dropdown-filters`
  );

  // Insère tous les filtres dans le DOM
  filters.forEach((filter) => {
    dropdownContainer.appendChild(filter.dropdownDOM);
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

// ----------------------------------------------------------------------------------------

async function removeFiltersFromDOM(type) {
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

// Update filters lists
async function updateFiltersLists(recipes) {
  FILTERS.forEach((filters) => {
    filters.displayed.splice(0, filters.displayed.length);
  });

  getFiltersFromRecipes(recipes);
}

function displayFilterTag(type, name) {
  const buttonDOM = document.createElement("button");
  buttonDOM.classList.add("btn");
  const filters = FILTERS.find((filters) => filters.type === type);
  const color = filters.color;
  buttonDOM.classList.add(`btn-${color}`);
  buttonDOM.classList.add("text-white");
  buttonDOM.classList.add("fw-bold");
  buttonDOM.classList.add("shadow-none");
  buttonDOM.classList.add("disabled");
  buttonDOM.setAttribute("type", "button");
  buttonDOM.setAttribute("data-type", type);

  buttonDOM.textContent = name;

  const span = constructFilterTagClosureSpan();
  buttonDOM.appendChild(span);

  document.querySelector(".filters-applied-container").appendChild(buttonDOM);

  return buttonDOM;
}

function constructFilterTagClosureSpan() {
  const span = document.createElement("span");
  span.classList.add("fa-solid");
  span.classList.add("fa-xmark");
  span.classList.add("fa-xs");

  return span;
}

function removeTagFilter(e) {
  const tag = e.target.parentElement;
  const type = tag.dataset.type;
  const name = tag.textContent;

  console.log(`--------------------------------`);
  console.log(`$$$ removeTagFilter => type: ${type} / name: ${name}`);
  console.log(`--------------------------------`);

  document.querySelector(".filters-applied-container").removeChild(tag);
}

function selectFilter(e) {
  const type = e.target.dataset.type;
  const name = e.target.textContent;

  console.log(`--------------------------------`);
  console.log(`$$$ selectFilter => type: ${type} / name: ${name}`);
  console.log(`--------------------------------`);

  const tag = displayFilterTag(type, name);
  tag.querySelector("span").addEventListener("click", removeTagFilter);
}

// ----------------------------------------------------------------------------------------

async function initFilters() {
  // Construit les filters et initialise les listes de filtres
  await constructAllFilters();

  initDropdownMenuHandlers();
}
