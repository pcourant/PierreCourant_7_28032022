import {
  APPLIANCE_FILTERS_DISPLAYED,
  INGREDIENT_FILTERS_DISPLAYED,
  USTENSIL_FILTERS_DISPLAYED,
  selectFilter,
} from "../components/filtersSearch.js";
import { RECIPES_ALL } from "../factories/RecipeFactory.js";
export {
  INGREDIENT_FILTERS_ALL,
  APPLIANCE_FILTERS_ALL,
  USTENSIL_FILTERS_ALL,
  initFilters,
  getIngredientFilters,
  getApplianceFilters,
  getUstensilFilters,
  displayIngredientFilters,
  displayApplianceFilters,
  displayUstensilFilters,
  removeIngredientFilters,
  removeApplianceFilters,
  removeUstensilFilters,
};

const INGREDIENT_FILTERS_ALL = [];
const APPLIANCE_FILTERS_ALL = [];
const USTENSIL_FILTERS_ALL = [];

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

async function constructAllIngredientFilters() {
  RECIPES_ALL.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (
        INGREDIENT_FILTERS_ALL.some((i) => i.name === ingredient.ingredient) ===
        false
      ) {
        const ingredientFilter = filterFactory(
          "ingredient",
          ingredient.ingredient
        );
        ingredientFilter.constructorDropdownDOM();
        ingredientFilter.constructorFilterDOM();
        INGREDIENT_FILTERS_ALL.push(ingredientFilter);
        INGREDIENT_FILTERS_DISPLAYED.push(ingredientFilter);
      }
    });
  });
}

async function constructAllApplianceFilters() {
  RECIPES_ALL.forEach((recipe) => {
    // si l'appareil n'est pas déjà présent on l'insère
    if (
      APPLIANCE_FILTERS_ALL.some((a) => a.name === recipe.appliance) === false
    ) {
      const applianceFilter = filterFactory("appliance", recipe.appliance);
      applianceFilter.constructorDropdownDOM();
      applianceFilter.constructorFilterDOM();
      APPLIANCE_FILTERS_ALL.push(applianceFilter);
      APPLIANCE_FILTERS_DISPLAYED.push(applianceFilter);
    }
  });
}

async function constructAllUstensilFilters() {
  RECIPES_ALL.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (USTENSIL_FILTERS_ALL.some((i) => i.name === ustensil) === false) {
        const ustensilFilter = filterFactory("ustensil", ustensil);
        ustensilFilter.constructorDropdownDOM();
        ustensilFilter.constructorFilterDOM();
        USTENSIL_FILTERS_ALL.push(ustensilFilter);
        USTENSIL_FILTERS_DISPLAYED.push(ustensilFilter);
      }
    });
  });
}

// ----------------------------------------------------------------------------------------

async function getIngredientFilters(recipes, ingredientFilters) {
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (
        ingredientFilters.some((i) => i.name === ingredient.ingredient) ===
        false
      ) {
        // Récupère le filtre
        const ingredientFilter = INGREDIENT_FILTERS_ALL.find(
          (i) => i.name === ingredient.ingredient
        );
        ingredientFilters.push(ingredientFilter);
      }
    });
  });
}

async function getApplianceFilters(recipes, applianceFilters) {
  recipes.forEach((recipe) => {
    // si l'appareil n'est pas déjà présent on l'insère
    if (applianceFilters.some((a) => a.name === recipe.appliance) === false) {
      // Récupère le filtre
      const applianceFilter = APPLIANCE_FILTERS_ALL.find(
        (a) => a.name === recipe.appliance
      );
      applianceFilters.push(applianceFilter);
    }
  });
}

async function getUstensilFilters(recipes, ustensilFilters) {
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (ustensilFilters.some((i) => i.name === ustensil) === false) {
        // Récupère le filtre
        const ustensilFilter = USTENSIL_FILTERS_ALL.find(
          (i) => i.name === ustensil
        );
        ustensilFilters.push(ustensilFilter);
      }
    });
  });
}

// ----------------------------------------------------------------------------------------

async function displayIngredientFilters(ingredientFilters) {
  const ingredientsDropdownContainer = document.querySelector(
    ".ingredients-dropdown .dropdown-filters"
  );

  ingredientFilters.forEach((ingredientFilter) => {
    ingredientsDropdownContainer.appendChild(ingredientFilter.dropdownDOM);
  });
}

async function initDropdownMenuHandlers() {
  const dropdownIngredientsButton = document.getElementById(
    "dropdownIngredientsButton"
  );
  const dropdownAppliancesButton = document.getElementById(
    "dropdownAppliancesButton"
  );
  const dropdownUstensilsButton = document.getElementById(
    "dropdownUstensilsButton"
  );

  dropdownIngredientsButton.addEventListener(
    "show.bs.dropdown",
    openDropdownMenuHandler
  );
  dropdownAppliancesButton.addEventListener(
    "show.bs.dropdown",
    openDropdownMenuHandler
  );
  dropdownUstensilsButton.addEventListener(
    "show.bs.dropdown",
    openDropdownMenuHandler
  );

  dropdownIngredientsButton.addEventListener(
    "hidden.bs.dropdown",
    closeDropdownMenuHandler
  );
  dropdownAppliancesButton.addEventListener(
    "hidden.bs.dropdown",
    closeDropdownMenuHandler
  );
  dropdownUstensilsButton.addEventListener(
    "hidden.bs.dropdown",
    closeDropdownMenuHandler
  );
}

async function openDropdownMenuHandler(e) {
  const button = e.target;
  const nbOfDropdownitems =
    button.parentElement.querySelectorAll(".dropdown-item").length;
  const dropdownMenu = button.parentElement.querySelector(".dropdown-menu");

  if (nbOfDropdownitems > 20) {
    button.classList.add("margin-right-multicol3");
    dropdownMenu.classList.add("multicol3");
  } else if (nbOfDropdownitems > 10) {
    button.classList.add("margin-right-multicol2");
    dropdownMenu.classList.add("multicol2");
  } else {
    button.classList.add("margin-right-singlecol1");
    dropdownMenu.classList.add("singlecol1");
  }
}

async function closeDropdownMenuHandler(e) {
  const button = e.target;
  button.classList.remove("margin-right-multicol3");
  button.classList.remove("margin-right-multicol2");
  button.classList.remove("margin-right-singlecol1");

  const dropdownMenu = button.parentElement.querySelector(".dropdown-menu");
  dropdownMenu.classList.remove("multicol3");
  dropdownMenu.classList.remove("multicol2");
  dropdownMenu.classList.remove("singlecol1");
}

async function displayApplianceFilters(applianceFilters) {
  const appliancesDropdownContainer = document.querySelector(
    ".appliances-dropdown .dropdown-filters"
  );

  applianceFilters.forEach((applianceFilter) => {
    appliancesDropdownContainer.appendChild(applianceFilter.dropdownDOM);
  });
}

async function displayUstensilFilters(ustensilFilters) {
  const ustensilsDropdownContainer = document.querySelector(
    ".ustensils-dropdown .dropdown-filters"
  );

  ustensilFilters.forEach((ustensilFilter) => {
    ustensilsDropdownContainer.appendChild(ustensilFilter.dropdownDOM);
  });
}

// ----------------------------------------------------------------------------------------

async function removeIngredientFilters() {
  const ingredientsDropdownMenu = document.querySelector(
    ".ingredients-dropdown .dropdown-menu"
  );
  const ingredientsDropdownFilters = document.querySelector(
    ".ingredients-dropdown .dropdown-filters"
  );

  ingredientsDropdownMenu.removeChild(ingredientsDropdownFilters);

  const newIngredientsDropdownFilters = document.createElement("div");
  newIngredientsDropdownFilters.classList.add("dropdown-filters");
  newIngredientsDropdownFilters.classList.add("d-flex");
  newIngredientsDropdownFilters.classList.add("flex-column");
  newIngredientsDropdownFilters.classList.add("flex-wrap");

  ingredientsDropdownMenu.appendChild(newIngredientsDropdownFilters);
}

async function removeApplianceFilters() {
  const appliancesDropdownMenu = document.querySelector(
    ".appliances-dropdown .dropdown-menu"
  );
  const appliancesDropdownFilters = document.querySelector(
    ".appliances-dropdown .dropdown-filters"
  );

  appliancesDropdownMenu.removeChild(appliancesDropdownFilters);

  const newAppliancesDropdownFilters = document.createElement("div");
  newAppliancesDropdownFilters.classList.add("dropdown-filters");
  newAppliancesDropdownFilters.classList.add("d-flex");
  newAppliancesDropdownFilters.classList.add("flex-column");
  newAppliancesDropdownFilters.classList.add("flex-wrap");

  appliancesDropdownMenu.appendChild(newAppliancesDropdownFilters);
}

async function removeUstensilFilters() {
  const ustensilsDropdownMenu = document.querySelector(
    ".ustensils-dropdown .dropdown-menu"
  );
  const ustensilsDropdownFilters = document.querySelector(
    ".ustensils-dropdown .dropdown-filters"
  );

  ustensilsDropdownMenu.removeChild(ustensilsDropdownFilters);

  const newUstensilsDropdownFilters = document.createElement("div");
  newUstensilsDropdownFilters.classList.add("dropdown-filters");
  newUstensilsDropdownFilters.classList.add("d-flex");
  newUstensilsDropdownFilters.classList.add("flex-column");
  newUstensilsDropdownFilters.classList.add("flex-wrap");

  ustensilsDropdownMenu.appendChild(newUstensilsDropdownFilters);
}

// ----------------------------------------------------------------------------------------

async function initFilters() {
  // Construit les filtres "ingrédient"
  await constructAllIngredientFilters();
  // Insère les filtres "ingrédient" dans le menu dropdown
  displayIngredientFilters(INGREDIENT_FILTERS_DISPLAYED);
  // Construit les filtres "appareil"
  await constructAllApplianceFilters();
  // Insère les filtres "appareil" dans le menu dropdown
  displayApplianceFilters(APPLIANCE_FILTERS_DISPLAYED);
  // Construit les filtres "ustensil"
  await constructAllUstensilFilters();
  // Insère les filtres "ustensil" dans le menu dropdown
  displayUstensilFilters(USTENSIL_FILTERS_DISPLAYED);

  initDropdownMenuHandlers();
}
