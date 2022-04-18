import {
  RECIPES_ALL,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
import { updateFiltersLists } from "../factories/FilterFactory.js";
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

  // Affiche les recettes filtrées par l'input de l'utilisateur
  if (searchText.length < 3) {
    displayAllRecipes();
  } else {
    await searchAndDisplay(searchText);
  }

  // Update filters lists
  updateFiltersLists(RECIPES_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ UPDATE RECIPES ("${searchText}") :`);
  console.log(`RECIPES :`);
  console.log(RECIPES_DISPLAYED);
  console.log(`--------------------------------`);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
