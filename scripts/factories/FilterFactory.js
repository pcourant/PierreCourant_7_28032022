export {
  getAllIngredientFilters,
  insertIngredientsDropdownDOM,
  getAllAppareilFilters,
  insertAppareilsDropdownDOM,
  getAllUstensilFilters,
  insertUstensilsDropdownDOM,
};

const INGREDIENT_FILTERS = [];
const APPAREIL_FILTERS = [];
const USTENSIL_FILTERS = [];

function filterFactory(type, name) {
  let dropdownDOM = undefined;
  let filterDOM = undefined;

  function constructorDropdownDOM() {
    const p = document.createElement("p");
    p.classList.add("dropdown-item");
    p.textContent = name;

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

async function getAllIngredientFilters(recipes) {
  let counter = 0;
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (
        INGREDIENT_FILTERS.some((i) => i.name === ingredient.ingredient) ===
        false
      ) {
        const ingredientFilter = filterFactory(
          "ingredient",
          ingredient.ingredient
        );
        ingredientFilter.constructorDropdownDOM();
        ingredientFilter.constructorFilterDOM();
        INGREDIENT_FILTERS.push(ingredientFilter);
        counter++;
      }
    });
  });

  console.log("Nombre de filtres ingrédient = ", counter);
}

async function getAllAppareilFilters(recipes) {
  let counter = 0;
  recipes.forEach((recipe) => {
    // si l'appareil n'est pas déjà présent on l'insère
    if (APPAREIL_FILTERS.some((a) => a.name === recipe.appliance) === false) {
      const appareilFilter = filterFactory("appareil", recipe.appliance);
      appareilFilter.constructorDropdownDOM();
      appareilFilter.constructorFilterDOM();
      APPAREIL_FILTERS.push(appareilFilter);
      counter++;
    }
  });

  console.log("Nombre de filtres appareils = ", counter);
}

async function getAllUstensilFilters(recipes) {
  let counter = 0;
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      // si l'ingrédient n'est pas déjà présent on l'insère
      if (USTENSIL_FILTERS.some((i) => i.name === ustensil) === false) {
        const ustensilFilter = filterFactory("ustensil", ustensil);
        ustensilFilter.constructorDropdownDOM();
        ustensilFilter.constructorFilterDOM();
        USTENSIL_FILTERS.push(ustensilFilter);
        counter++;
      }
    });
  });

  console.log("Nombre de filtres ustensils = ", counter);
}

// ----------------------------------------------------------------------------------------

async function insertIngredientsDropdownDOM() {
  const ingredientsDropdownContainer = document.querySelector(
    ".ingredients-dropdown .dropdown-filters"
  );

  INGREDIENT_FILTERS.forEach((ingredientFilter) => {
    ingredientsDropdownContainer.appendChild(ingredientFilter.dropdownDOM);
  });
}

async function insertAppareilsDropdownDOM() {
  const appareilsDropdownContainer = document.querySelector(
    ".appareils-dropdown .dropdown-filters"
  );

  APPAREIL_FILTERS.forEach((appareilFilter) => {
    appareilsDropdownContainer.appendChild(appareilFilter.dropdownDOM);
  });
}

async function insertUstensilsDropdownDOM() {
  const ustensilsDropdownContainer = document.querySelector(
    ".ustensils-dropdown .dropdown-filters"
  );

  USTENSIL_FILTERS.forEach((ustensilFilter) => {
    ustensilsDropdownContainer.appendChild(ustensilFilter.dropdownDOM);
  });
}
