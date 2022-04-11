export { getAllIngredientFilters, insertIngredientsDropdownDOM };

const INGREDIENT_FILTERS = new Array();
const APPAREIL_FILTERS = new Array();
const USTENSIL_FILTERS = new Array();

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

async function insertIngredientsDropdownDOM() {
  const ingredientsDropdownContainer = document.querySelector(
    ".ingredients-dropdown .dropdown-filters"
  );

  INGREDIENT_FILTERS.forEach((ingredientFilter) => {
    ingredientsDropdownContainer.appendChild(ingredientFilter.dropdownDOM);
  });
}
