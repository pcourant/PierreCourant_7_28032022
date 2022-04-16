import {
  RECIPES_ALL,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
import {
  getIngredientFilters,
  getApplianceFilters,
  getUstensilFilters,
  displayIngredientFilters,
  displayApplianceFilters,
  displayUstensilFilters,
  removeIngredientFilters,
  removeApplianceFilters,
  removeUstensilFilters,
} from "../factories/FilterFactory.js";
import {
  INGREDIENT_FILTERS_DISPLAYED,
  APPLIANCE_FILTERS_DISPLAYED,
  USTENSIL_FILTERS_DISPLAYED,
} from "../components/filtersSearch.js";
export { RECIPES_DISPLAYED, initMainSearch };

const RECIPES_DISPLAYED = [];

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {
  for (let i = 0; i < RECIPES_ALL.length; i++) {
    const recipe = RECIPES_ALL[i];
    let isFound = false;

    // Teste si le titre contient l'input
    isFound = recipe.name.toLowerCase().includes(input.toLowerCase());

    // Teste si la description contient l'input
    if (!isFound) {
      isFound = recipe.description.toLowerCase().includes(input.toLowerCase());

      // Teste si un ingrédient contient l'input
      if (!isFound) {
        let j = 0;
        while (!isFound && j < recipe.ingredients.length) {
          isFound = recipe.ingredients[j].ingredient
            .toLowerCase()
            .includes(input.toLowerCase());
          j++;
        }
      }
    }

    // Si l'input apparaît quelque part, on affiche la recette
    if (isFound) {
      recipe.displayRecipeCard();
      RECIPES_DISPLAYED.push(recipe);
    }
  }
}

async function updateRecipes(e) {
  e.preventDefault();
  const searchText = e.target.value;

  // Efface toutes les recettes présentes
  await removeAllRecipes();
  RECIPES_DISPLAYED.splice(0, RECIPES_DISPLAYED.length);

  if (searchText.length < 3) {
    displayAllRecipes();
  } else {
    await searchAndDisplay(searchText);
  }

  // Update filters
  await removeIngredientFilters();
  await removeApplianceFilters();
  await removeUstensilFilters();
  // Empty the arrays
  INGREDIENT_FILTERS_DISPLAYED.splice(0, INGREDIENT_FILTERS_DISPLAYED.length);
  APPLIANCE_FILTERS_DISPLAYED.splice(0, APPLIANCE_FILTERS_DISPLAYED.length);
  USTENSIL_FILTERS_DISPLAYED.splice(0, USTENSIL_FILTERS_DISPLAYED.length);
  await getIngredientFilters(RECIPES_DISPLAYED, INGREDIENT_FILTERS_DISPLAYED);
  await getApplianceFilters(RECIPES_DISPLAYED, APPLIANCE_FILTERS_DISPLAYED);
  await getUstensilFilters(RECIPES_DISPLAYED, USTENSIL_FILTERS_DISPLAYED);
  displayIngredientFilters(INGREDIENT_FILTERS_DISPLAYED);
  displayApplianceFilters(APPLIANCE_FILTERS_DISPLAYED);
  displayUstensilFilters(USTENSIL_FILTERS_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ UPDATE RECIPES ("${searchText}") :`);
  console.log(`RECIPES :`);
  console.log(RECIPES_DISPLAYED);
  console.log(`INGREDIENT :`);
  console.log(INGREDIENT_FILTERS_DISPLAYED);
  console.log(`APPLIANCE :`);
  console.log(APPLIANCE_FILTERS_DISPLAYED);
  console.log(`USTENSIL :`);
  console.log(USTENSIL_FILTERS_DISPLAYED);
  console.log(`--------------------------------`);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
